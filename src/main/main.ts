import { objectKeys, pathJoin } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { isProtectedFile, protectFile } from '../file/protected'
import { magickLoaded, pushStdout , pushStderr} from '../imageMagick/magickLoaded'
import { getOption, getOptions, setOptions } from '../options'
import { IFile, Options, Result, NativeOptions } from '../types'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { processCommand } from './command'
import { NativeResult } from '../imageMagick/createMain';
import { isCustomCommand, dispatchCustomCommand } from './customCommand';

export async function main(o: Partial<Options>): Promise<Result> {
  if (o.useNative || getOption('useNative')) {
    throw 'useNative not supported yet'
  }
  return mainWasm(o)
}

async function mainWasm(o: Partial<Options>): Promise<Result> {
  // set global options that user might given
  objectKeys(getOptions())
    .filter(k => !!o[k])
    .forEach(k => setOptions({ [k]: o[k] }))

  const { emscriptenNodeFsRoot, debug } = getOptions()
  const { FS, main } = await magickLoaded
  debug && console.log('main call given options: ', o)
  const files = await File.resolve(o.inputFiles)
  FS.chdir(emscriptenNodeFsRoot)
  files.forEach(f => {
    if(!f.name.startsWith(emscriptenNodeFsRoot)) {
      f.name = pathJoin(emscriptenNodeFsRoot, f.name)
    }
    const dirName = getFileDir(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    FS.writeFile(f.name, f.content)
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  let returnValue : NativeResult
  var processedCommand = processCommand(o.command!);
  if(await isCustomCommand(processedCommand, o)){
    returnValue=await dispatchCustomCommand(processedCommand, o, FS)
  }else {
    debug && console.log('main processed command:',processedCommand)
    try {
      
      returnValue = main(processedCommand)
    } catch (error) {
      console.log('MAIN error', error);
      returnValue= {
        stderr: [], stdout: [], error: error, returnValue: undefined
      }
    }
  }

  const afterTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles: IFile[] = diffTree
  // .map(f=>f.path.startsWith(emscriptenNodeFsRoot) ? f : {...f, path: pathJoin(emscriptenNodeFsRoot, f.path)})
  .map(f => new File(
    f.path,  FS.readFile(f.path)
  ))
    .filter(f => !isProtectedFile(f.name))

  if (o.protectOutputFiles) {
    outputFiles.forEach(protectFile)
    // outputFiles.length = 0
  }
  else {
    const removed:string[] = []
  //   ls(emscriptenNodeFsRoot, FS).filter(f => !isProtectedFile(f))
  // .map(f=>f.startsWith(emscriptenNodeFsRoot) ? f : pathJoin(emscriptenNodeFsRoot, f ))  
  //   .forEach(f => rmRf(f, FS, f => !isProtectedFile(f), removed))
    o.debug && console.log('Removed files:', removed)    
  }
  o.debug && console.log('Protected files:', ls(emscriptenNodeFsRoot, FS).map(isProtectedFile))
  return {
    ...returnValue,
    outputFiles
  }
}



