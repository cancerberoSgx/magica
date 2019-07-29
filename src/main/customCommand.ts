import { FS } from '../file/emscriptenFs'
import { File } from '../file/file'
import { NativeResult } from '../imageMagick/createMain'
import { getStderr, getStdout, pushStderr, pushStdout, resetStderr, resetStdout } from '../imageMagick/magickLoaded'
import { Options } from '../types'

export async function isCustomCommand(c: string[], o: Partial<Options>) {
  return c[0].trim().startsWith('{')
}

interface CustomCommandContext {
  FS: FS;
  options: Partial<Options>
  pushStdout(s: string): void;
  pushStderr(s: string): void;
  File: typeof File
  writeFile(f: File): void
  fileExists(f: string): boolean
  readFile(f: string): File
  isDirectory(f: string): boolean
}

class CustomCommandContextImpl implements CustomCommandContext {

  pushStdout: (s: string) => void;
  pushStderr: (s: string) => void;
  File: typeof File;
  constructor(public command: string[], public options: Partial<Options>, public FS: FS) {
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

}

export async function dispatchCustomCommand(c: string[], o: Partial<Options>, FS: FS): Promise<NativeResult> {
  var context = new CustomCommandContextImpl(c, o, FS)
  var error: Error | undefined
  var returnValue: any
  resetStdout()
  resetStderr()
  try {
    var f = eval(`(function(o){return (function()${c.join(' ')}).bind(o)() })`)
    returnValue = await f(context)
  }
  catch (er) {
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
