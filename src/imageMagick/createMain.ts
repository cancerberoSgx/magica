import { getStderr, getStdout, resetStderr, resetStdout } from './magickLoaded'

export function createMain(Module: any): NativeMain {
  return function main(...args: any[]) {
    resetStdout()
    resetStderr()
    let returnValue: any, error: Error | undefined
    try {
      // Module.noExitRuntime = true // This helps stdout to be correctly flushed on some situations
      returnValue = Module.callMain(...args)
      // flush stdio so clients get stdout string that doesn't end with new lines.
      // if(Module._fflush) {
      //   Module._fflush(0)
      //   Module._fflush(1)
      //   Module._fflush(2)
      // }
    } catch (ex) {
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
