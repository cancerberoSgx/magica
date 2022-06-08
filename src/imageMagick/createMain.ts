import { FS } from '../file/emscriptenFs'
import { getOption } from '../options'
import { getStderr, getStdout, resetStderr, resetStdout } from './magickLoaded'

export function createMain(Module: any, FS: FS): NativeMain {
  return function main(...args: any[]) {
    var debug = getOption('debug')
    resetStdout()
    resetStderr()
    let returnValue: any, error: Error | undefined
    try {
      Module.noExitRuntime = true
      debug && console.log('before Module.callMain')
      returnValue = Module.callMain(...args)
      debug && console.log('after Module.callMain', returnValue)
    } catch (ex) {
      debug && console.error('ERROR :', ex)
      error = ex
    }
    return {
      returnValue,
      stdout: getStdout(),
      stderr: getStderr(),
      error
    }
  }
}

export type NativeMain = (args: string[]) => NativeResult

export interface NativeResult {
  returnValue: any
  stdout: string[]
  stderr: string[]
  error: Error | undefined
}
