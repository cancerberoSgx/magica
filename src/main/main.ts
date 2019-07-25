import { objectKeys } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { isProtectedFile, protectFile } from '../file/protected'
import { magickLoaded, pushStdout , pushStderr, resetStdout, resetStderr, getStdout, getStderr} from '../imageMagick/magickLoaded'
import { getOption, getOptions, setOptions } from '../options'
import { IFile, Options, Result } from '../types'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { processCommand } from './command'
import { NativeResult } from '../imageMagick/createMain';
import { FS } from '../file/emscriptenFs';

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
    returnValue = main(processedCommand)
  }

  const afterTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles: IFile[] = diffTree.map(f => ({
    name: f.path,
    content: FS.readFile(f.path)
  }))
    .filter(f => !isProtectedFile(f.name))

  if (o.protectOutputFiles) {
    outputFiles.forEach(protectFile)
    // outputFiles.length = 0
  }
  else {
    const removed:string[] = []
    ls(emscriptenNodeFsRoot, FS).filter(f => !isProtectedFile(f)).forEach(f => rmRf(f, FS, f => !isProtectedFile(f), removed))
    o.debug && console.log('Removed files:', removed)    
  }
  o.debug && console.log('Protected files:', ls(emscriptenNodeFsRoot, FS).map(isProtectedFile))
  return {
    ...returnValue,
    outputFiles
  }
}


async function isCustomCommand(c:string[], o: Partial<Options>) {
  return  c[0].trim().startsWith('{')
}

async function dispatchCustomCommand(c:string[], o: Partial<Options>, FS:FS): Promise<NativeResult> {

  var context = {
    ...o, FS, pushStdout, pushStderr
  }
  var error:Error|undefined
var returnValue:any;
  resetStdout()
  resetStderr()
  try {
  var f = eval(`(function(o){return (function()${c.join(' ')}).bind(o)() })`)
  returnValue = await f(context)
  }catch(er) {
    error = er
  }
  return {
      stdout: getStdout(),
      stderr: getStderr(),
      returnValue: undefined,
      error,
      ...returnValue
  }
}
