import { FS } from '../file/emscriptenFs'
import { File } from '../file/file'
import { NativeResult } from '../imageMagick/createMain'
import { getStderr, getStdout, pushStderr, pushStdout, resetStderr, resetStdout } from '../imageMagick/magickLoaded'
import { getOption } from '../options'
import { Options } from '../types'
import { main } from './main'
import { run } from './run'

export async function isCustomCommand(c: string[], o: Partial<Options>) {
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
  files: File[]
  pushStdout(s: string): void;
  pushStderr(s: string): void;
  File: typeof File
  writeFile(f: File): void
  fileExists(f: string): boolean
  readFile(f: string): File
  isDirectory(f: string): boolean
  run: typeof run
  main: typeof main
}

class CustomCommandContextImpl implements CustomCommandContext {
  pushStdout: (s: string) => void;

  pushStderr: (s: string) => void;

  File: typeof File;

  constructor(public options: Partial<Options>, public FS: FS, public files: File[]) {
    this.pushStdout = pushStdout
    this.pushStderr = pushStderr
    this.File = File
  }

  fileExists(f: string): boolean {
    throw new Error('Method not implemented.')
  }

  readFile(f: string): File {
    throw new Error('Method not implemented.')
  }

  isDirectory(f: string): boolean {
    throw new Error('Method not implemented.')
  }

  writeFile(f: File) {
    this.FS.writeFile(f.name, f.content)
  }

  main = main

  run = run
}

export async function dispatchCustomCommand(c: string[], o: Partial<Options>, FS: FS, files: File[]): Promise<NativeResult> {
  const s = c.slice(1).join(' ').trim()
  o.debug && console.log('custom command js expression: ' + s)
  var context = new CustomCommandContextImpl(o, FS, files)
  var error: Error | undefined
  var returnValue: any
  resetStdout()
  resetStderr()
  try {
    var f: (context: CustomCommandContext) => Promise<any> = eval(s)
    o.debug && console.log('custom command js evaluated result function: ' + f)
    returnValue = await f(context)
  }
  catch (er) {
    o.debug && console.error('Custom command ', s, 'evaluation error: ', er)
    error = er
  }
  return {
    stdout: getStdout(),
    stderr: getStderr(),
    returnValue,
    error,
  }
}
