import { Deferred } from 'misc-utils-of-mine-generic'
import { FS } from '../file/emscriptenFs'
import { getOptions } from '../options'
import { NativeMain } from './createMain'

export interface Main {
  main: NativeMain,
  FS: FS
}
const { nodeFsLocalRoot, emscriptenNodeFsRoot, debug, disableNodeFs } = getOptions()

export const magickLoaded = new Deferred<Main>()

const stdout: string[] = []
export function pushStdout(s: string) {
  debug && console.log(`>> stdout >> ${scrollbars}`)
  stdout.push(s)
}
export function resetStdout() {
  stdout.length = 0
}
export function getStdout() {
  return stdout.slice()
}

const stderr: string[] = []
export function pushStderr(s: string) {
  debug && console.log(`>> stderr >> ${s}`)
  stderr.push(s)
}
export function resetStderr() {
  stderr.length = 0
}
export function getStderr() {
  return stderr.slice()
}

setTimeout(function() {
  (global as any).nodeMagickOptions = getOptions()
  try {
    require('./compiled/nodeMagick')
  } catch (error) {
    console.error(error)
    throw error
  }
}, 0)

export { getOptions } from '../options'
