import { dirname, notUndefined, objectKeys, RemoveProperties, tryTo } from 'misc-utils-of-mine-generic'
import Queue from 'p-queue'
import { File } from '../file/file'
import { isProtectedFile, protectFile } from '../file/protected'
import { parseConvertVerbose } from '../image/imageUtil'
import { NativeResult } from '../imageMagick/createMain'
import { getMagick, magickLoaded } from '../imageMagick/magickLoaded'
import { getOption, getOptions, setOptions } from '../options'
import { Options, Result } from '../types'
import { readFile, writeFile } from '../util/fileUtil'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { processCommand } from './command'

let queue: Queue | undefined

function getQueue() {
  if (!queue) {
    queue = new Queue({
      autoStart: true,
      concurrency: getOption('mainConcurrency'),
      interval: getOption('mainInterval')
    })
  }
  return queue
}

export function main(o: Partial<Options>): Promise<Result> {
  if (o.useNative || getOption('useNative')) {
    throw 'useNative not supported yet'
  }
  return getQueue().add(async () => {
    await magickLoaded
    return mainSync({ ...o, inputFiles: await File.resolve(o.inputFiles) })
  })
}

export type MainSyncOptions = RemoveProperties<Partial<Options>, 'inputFiles'> & { inputFiles: File[] }

export function mainSync(options: MainSyncOptions): Result {
  const t0 = Date.now()
  objectKeys(getOptions())
    .filter(k => notUndefined(options[k]))
    .forEach(k => setOptions({ [k]: options[k] }))

  const { emscriptenNodeFsRoot, debug } = getOptions()
  debug && console.log('main call given options: ', options)

  const { FS, main } = getMagick()
  FS.chdir(emscriptenNodeFsRoot)

  options.inputFiles.forEach(f => {
    const dirName = dirname(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    debug && console.log('FS.write', f.name)
    writeFile(f, FS)
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  let returnValue: NativeResult
  var processedCommand = processCommand(options.command!)
  if (options.verbose) {
    processedCommand.splice(1, 0, '-verbose')
  }
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
  var verbose = options.verbose ? tryTo(() => parseConvertVerbose(returnValue.stdout)) || [] : []

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
        if (options.protectOutputFiles) {
          protectFile(file)
        }
        return file
      })

  const removed: string[] = []
  ls(emscriptenNodeFsRoot, FS)
    .filter(f => !isProtectedFile(f))
    .forEach(f => rmRf(f, FS, f => !isProtectedFile(f), removed))

  options.debug && console.log(`Removed files: ${removed}\nProtected files: ${ls(emscriptenNodeFsRoot, FS).map(isProtectedFile)}`)

  return {
    ...returnValue,
    outputFiles,
    verbose,
    times: {
      total: Date.now() - t0
    },
  }
}


