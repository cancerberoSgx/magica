import { objectKeys } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { isProtectedFile, protectFile } from '../file/protected'
import { NativeResult } from '../imageMagick/createMain'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOption, getOptions, setOptions } from '../options'
import { IFile, Options, Result } from '../types'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { processCommand } from './command'
import { dispatchCustomCommand, isCustomCommand } from './customCommand'

export function main(o: Partial<Options>): Promise<Result> {
  if (o.useNative || getOption('useNative')) {
    throw 'useNative not supported yet'
  }
  return mainWasm(o)
}

async function mainWasm(o: Partial<Options>): Promise<Result> {
  const t0 = Date.now()
  // set global options that user might given
  objectKeys(getOptions())
    .filter(k => !!o[k])
    .forEach(k => setOptions({ [k]: o[k] }))

  const { emscriptenNodeFsRoot, debug } = getOptions()
  const { FS, main } = await magickLoaded
  debug && console.log('main call given options: ', o)
  FS.chdir(emscriptenNodeFsRoot)
  const files = await File.resolve(o.inputFiles)
  // console.log('Buffer.from(f.content.buffer).toString()', Buffer.from(files[0].content.buffer).toString());
  // console.log('Buffer.from(f.content.buffer).toString()', Buffer.from(files[0].content as any).toString());
  files.forEach(f => {
    const dirName = getFileDir(f.name)
    // FS.chdir(emscriptenNodeFsRoot)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    // console.log(dirName, f.name,  f.content);
    // FS.chdir(emscriptenNodeFsRoot)
    
    FS.writeFile(f.name, f.content )

    // FS.writeFile(f.name, f.content, { encoding: 'binary', flags: 'w+' })
    // console.log(Buffer.from(FS.readFile(f.name)).toString());
    
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  let returnValue: NativeResult
  var processedCommand = processCommand(o.command!)
  if (await isCustomCommand(processedCommand, o)) {
    returnValue = await dispatchCustomCommand(processedCommand, o, FS)
  } else {
    debug && console.log('main processed command:', processedCommand)
    try {
      returnValue = main(processedCommand)
    } catch (error) {
      console.log('MAIN error', error)
      returnValue = {
        stderr: [], stdout: [], error: error, returnValue: undefined
      }
    }
  }

  const afterTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles: IFile[] = diffTree
    .map(f => new File(
      f.path, FS.readFile(f.path)
    ))
    .filter(f => !isProtectedFile(f.name))

  if (o.protectOutputFiles) {
    outputFiles.forEach(protectFile)
    outputFiles.length = 0
  }
  else {
    const removed: string[] = []
    ls(emscriptenNodeFsRoot, FS).filter(f => !isProtectedFile(f))
      .forEach(f => rmRf(f, FS, f => !isProtectedFile(f), removed))
    o.debug && console.log('Removed files:', removed)
  }
  o.debug && console.log('Protected files:', ls(emscriptenNodeFsRoot, FS).map(isProtectedFile))
  return {
    ...returnValue,
    outputFiles,
      times: {
        total: Date.now() - t0
      },
  }
}



