import { arrayDifference, arrayUnion } from 'misc-utils-of-mine-generic'
import { FS } from '../file/emscriptenFs'
import { File } from '../file/file'
import { NativeResult } from '../imageMagick/createMain'
import { getStderr, getStdout, pushStderr, pushStdout, resetStderr, resetStdout } from '../imageMagick/magickLoaded'
import { getOption } from '../options'
import { IFile, Options } from '../types'
import { isDir, isFile, readFile, writeFile } from '../util/fileUtil'
import { main } from './main'
import { run } from './run'

export async function isCustomCommand(c: string[]) {
  return c.join(' ').trim().startsWith(getOption('customCommandPrefix'))
}

/**
 * In [run]'s [script] property, or in commands given to [main], lines starting with `!js:` are be evaluated as a JavaScript function that accept one parameter context which is an object containing utilities that can be used asynchronously. This interface describes such an object. The expression  `!js:` can be configured using [Options]. 
 * 
 * ```js
 * result = await run({
 *  script: `
 *    convert rose: foo.gif
 *    !js: c=>c.pushStdout(FS.readdir('.').join(', '))
 *    !js: async c=> {const f = c.File.asFile(c.files[0]) ; c.pushStdout(JSON.stringify(await f.size())) }
 *  `
 * })
 * ```
 */
export interface CustomCommandContext {
  FS: FS;
  options: Partial<Options>
  // files: File[]
  log(...s: string[]): void;
  error(...s: string[]): void;
  File: typeof File
  writeFile(f: File): void
  isFile(f: string): boolean
  readFile(f: string): File
  isDirectory(f: string): boolean
  run: typeof run
  main: typeof main
  // /** guarantees the file as outputFile. If passed a string it must exist in FS (should be protected or written forcedly) */
  // addOutputFile(f:string| IFile):void
  // /** guarantees giv+en file not to be returned as output file of any result in this script. */
  //   removeOutputFile(f:string| IFile):void
  includeOutputFiles(files: (string | IFile)[], exclude?: boolean): void
}

class CustomCommandContextImpl implements CustomCommandContext {

  main = main

  run = run

  log = pushStdout

  error = pushStderr

  File: typeof File;
  public options: Partial<Options>
  public FS: FS
  // public files: File[]
  protected outputFiles: File[]
  constructor(o: CustomCommandDispatchOptions) {
    this.options = o.options
    this.FS = o.FS
    // this.files = o.files
    this.outputFiles = o.outputFiles
    this.File = File
  }

  isFile(f: string): boolean {
    return isFile(f, this.FS)
  }

  readFile(f: string | IFile): File {
    return readFile(f, this.FS)
  }

  isDirectory(f: string): boolean {
    return isDir(f, this.FS)
  }

  writeFile(f: File) {
    writeFile(f, this.FS)
  }

  includeOutputFiles(files: (string | IFile)[], exclude = false) {

    if (exclude) {
      arrayDifference(this.outputFiles, files, File.equals, this.outputFiles)
    }
    else {
      arrayUnion(this.outputFiles, files, File.equals, this.outputFiles)
    }
    // files.forEach(f=>{
    //   var p = getFilePath(f)
    //   .filter(f=>getFilePath(f)===p).push(File.asFile(f))
    // })
  }

  // removeOutputFile(f:string| IFile){
  //   var p = getFilePath(f)
  //   const i = this.outputFiles.findIndex(f=>getFilePath(f)===p)
  //   if(i!==-1){
  //     this.outputFiles.splice(i, 1)
  //   }
  // }
}
// export function union<A>(a:A[],b:A[], predicate: (a:A,b:A)=>boolean = (a,b)=>a===b, output?:A[]) {
//   var result : A[] = []
//   for(let x of a){
//     if(pred)
//   }
//   return result
// }

export interface CustomCommandDispatchOptions {
  command: string[],
  options: Partial<Options>,
  FS: FS,
  // files: File[]
  /** can be used by custom commands to manipulate outputFiles*/
  outputFiles: File[]
}
export async function dispatchCustomCommand(o: CustomCommandDispatchOptions): Promise<NativeResult> {
  const s = o.command.slice(1).join(' ').trim()
  o.options.debug && console.log('custom command js expression: ' + s)
  var context = new CustomCommandContextImpl(o)
  var error: Error | undefined
  var returnValue: any
  resetStdout()
  resetStderr()
  try {
    var f: (context: CustomCommandContext) => Promise<any> = eval(s)
    o.options.debug && console.log('custom command js evaluated result function: ' + f)
    returnValue = await f(context)
  }
  catch (er) {
    o.options.debug && console.error('Custom command ', s, 'evaluation error: ', er)
    error = er
  }
  return {
    stdout: getStdout(),
    stderr: getStderr(),
    returnValue,
    error,
  }
}
