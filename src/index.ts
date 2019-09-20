import { flat } from 'misc-utils-of-mine-generic'
if (typeof Array.prototype.flat === 'undefined') {
  Array.prototype.flat = function(this: any[]) {
    return flat(this)
  }
}

require('./util/magicaWasm').getThisBrowserScriptTagSrc()
require('./util/magica').installMagica() // HEADS UP needs to be called before everything else.

export { FS } from "./file/emscriptenFs"
export { File } from './file/file'
export { isProtectedFile, protectFile } from './file/protected'
export * from './image/html'
export { imageCompare } from './image/imageCompare'
export { imageInfo } from './image/imageInfo'
export * from './image/imageUtil'
export { imageBuiltIn } from './image/support'
export { magickLoaded } from './imageMagick/magickLoaded'
export { cliToArray } from './main/command'
export { registerCommandPreprocessor } from './main/executeCommandPreprocessor'
export * from './main/main'
export { run } from './main/run'
export { addTemplateHelper, TemplateHelper } from './main/template/template'
export { getOptions, setOptions } from './options'
export * from './types'
export * from './util'

