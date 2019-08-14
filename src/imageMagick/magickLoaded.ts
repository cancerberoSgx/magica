import { Deferred, dirname, isNode } from 'misc-utils-of-mine-generic'
import { FS } from '../file/emscriptenFs'
import { getOptions } from '../options'
import { getThisBrowserScriptTagSrc, getThisBrowserScriptTagSrcParams } from '../util/magicaWasm'
import { NativeMain } from './createMain'

export interface Main {
  main: NativeMain,
  FS: FS
}

const { debug } = getOptions()

let _FS: FS = null as any

export const magickLoaded = new Deferred<Main>()

magickLoaded.then(m => {
  _FS = m.FS
})

export function getFS() {
  if (!_FS) {
    throw new Error('getFS called too soon - FS object not ready yet')
  }
  return _FS
}

const stdout: string[] = []

export function pushStdout(...s: string[]) {
  debug && console.log(`>> stdout >> ${s.join(' ')}`)
  stdout.push(...s)
}

export function resetStdout() {
  stdout.length = 0
}

export function getStdout() {
  return stdout.slice()
}

const stderr: string[] = []

export function pushStderr(...s: string[]) {
  debug && console.log(`>> stderr >> ${s.join(' ')}`)
  stderr.push(...s)
}

export function resetStderr() {
  stderr.length = 0
}

export function getStderr() {
  return stderr.slice()
}

declare var MAGICA_WASM_LOCATION: any

export function moduleLocateFile(path: string, prefix: string) {
  if (typeof MAGICA_WASM_LOCATION === 'string') {
    return MAGICA_WASM_LOCATION
  } else {
    var thisScriptUrlParams = getThisBrowserScriptTagSrcParams()
    if (thisScriptUrlParams && thisScriptUrlParams.MAGICA_WASM_LOCATION) {
      return decodeURIComponent(thisScriptUrlParams.MAGICA_WASM_LOCATION)
    }
    var thisScriptUrl = getThisBrowserScriptTagSrc()
    if (typeof thisScriptUrl === 'string') {
      var d = dirname(thisScriptUrl)
      if (d) {
        return d
      }
    }
  }
  return prefix + path
}

export { getOptions, isNode }

setTimeout(function() {
  try {
    require('./compiled/nodeMagick')
  } catch (error) {
    console.error(error)
    throw error
  }
}, 0)

