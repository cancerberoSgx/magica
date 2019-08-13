import { dirname, objectKeys, tryTo, notUndefined } from 'misc-utils-of-mine-generic'
import Queue from 'p-queue'
import { File } from '../file/file'
import { isProtectedFile, protectFile } from '../file/protected'
import { parseConvertVerbose } from '../image/imageUtil'
import { NativeResult } from '../imageMagick/createMain'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOption, getOptions, setOptions } from '../options'
import { Options, Result } from '../types'
import { listFilesRecursively, ls, lsR } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { processCommand } from './command'
import { dispatchCustomCommand, isCustomCommand } from './customCommand'
import { FS } from '../file/emscriptenFs';
import { readFile, writeFile } from '../util/util';

let queue: Queue | undefined

function getQueue() {
  if (!queue) {
    queue = new Queue({ autoStart: true, concurrency: getOption('mainConcurrency'), interval: getOption('mainInterval') })
  }
  return queue
}

export function main(o: Partial<Options>): Promise<Result> {
  if (o.useNative || getOption('useNative')) {
    throw 'useNative not supported yet'
  }
  return getQueue().add(() => mainWasm(o))
}

async function mainWasm(o: Partial<Options>): Promise<Result> {
  const t0 = Date.now()
  objectKeys(getOptions())
    .filter(k => notUndefined(o[k]))
    .forEach(k => setOptions({ [k]: o[k] }))

  const { emscriptenNodeFsRoot, debug } = getOptions()
  const { FS, main } = await magickLoaded
  debug && console.log('main call given options: ', o)

  FS.chdir(emscriptenNodeFsRoot)
  const files = await File.resolve(o.inputFiles)
  
  files.forEach(f => {
    const dirName = dirname(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    debug && console.log('FS.write', f.name)
    writeFile(f, FS)
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  let returnValue: NativeResult
  var processedCommand = processCommand(o.command!)
  if (o.verbose) {
    processedCommand.splice(1, 0, '-verbose')
  }
  if (await isCustomCommand(processedCommand )) {
    returnValue = await dispatchCustomCommand(processedCommand, o, FS, files)
  } else {
    debug && console.log('main processed command:', processedCommand)
    try {
      returnValue = main(processedCommand)
    } catch (error) {
      debug && console.error('MAIN error', error)
      returnValue = {
        stderr: [], 
        stdout: [], 
        error, 
        returnValue: undefined
      }
    }
  }
  var verbose = o.verbose ? tryTo(() => parseConvertVerbose(returnValue.stdout)) || [] : []

  const outputFiles = 
    listFilesRecursively(emscriptenNodeFsRoot, FS)  
    .filter(f => !beforeTree.find(b => b.path === f.path)) // tree diff
    .map(f => {
        const file = readFile(f.path, FS)
      var v = verbose.find(v => file.name.endsWith(v.outputName))
      if (v) {
        file.width = v.outputSize.width
        file.height = v.outputSize.height
      }
      if (o.protectOutputFiles) {
        protectFile(file)
      }
      return file
    })
    
    const removed: string[] = []
    ls(emscriptenNodeFsRoot, FS)
    .filter(f => !isProtectedFile(f))
    .forEach(f => rmRf(f, FS, f => !isProtectedFile(f), removed))
    
  o.debug && console.log(`Removed files: ${removed}\nProtected files: ${ls(emscriptenNodeFsRoot, FS).map(isProtectedFile)}`)
  
  return {
    ...returnValue,
    outputFiles,
    verbose,
    times: {
      total: Date.now() - t0
    },
  }
}


