import { getStderr, getStdout, resetStderr, resetStdout } from './magickLoaded'

export function createMain(Module: any): NativeMain {
  return function main(...args: any[]) {
    resetStdout()
    resetStderr()
    let returnValue: any, error: Error | undefined
    try {
      returnValue = Module.callMain(...args)
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
