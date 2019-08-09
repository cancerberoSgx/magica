require('./util/magicaWasm').getThisBrowserScriptTagSrc()
require('./util/magica').installMagica() // HEADS UP needs to be called before everything else.

export { FS } from "./file/emscriptenFs"
export { File } from './file/file'
export { getProtectedFile, isProtectedFile, protectFile } from './file/protected'
export * from './image/html'
export { toDataUrl } from './image/html'
export { imageBuiltIn } from './image/imageBuiltIn'
export { imageCompare } from './image/imageCompare'
export { imageInfo } from './image/imageInfo'
export * from './image/imageUtil'
export { magickLoaded } from './imageMagick/magickLoaded'
export { cliToArray } from './main/command'
export { registerCommandPreprocessor } from './main/executeCommandPreprocessor'
export { main } from './main/main'
export { run } from './main/run'
export { addTemplateHelper, TemplateHelper } from './main/template/template'
export { getOptions, setOptions } from './options'
export * from './types'
export { getMagica, Magica } from './util/magica'

