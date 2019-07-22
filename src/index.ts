import { getGlobal } from 'misc-utils-of-mine-generic'
import { File } from './file/file'
import { getProtectedFile, isProtectedFile, protectFile } from './file/protected'
import { toDataUrl } from './image/html'
import { imageBuiltIn } from './image/imageBuiltIn'
import { imageCompare } from './image/imageCompare'
import { imageInfo } from './image/imageInfo'
import { imagePixelColor } from './image/pixel'
import { magickLoaded } from './imageMagick/magickLoaded'
import { cliToArray } from './main/command'
import { registerCommandPreprocessor } from './main/executeCommandPreprocessor'
import { addTemplatePreprocessorContextMutator } from './main/templatePreprocessor'
import { main } from './main/main'
import { run } from './main/run'

export { File } from './file/file'
export { getProtectedFile, isProtectedFile, protectFile } from './file/protected'
export { addTemplatePreprocessorContextMutator } from './main/templatePreprocessor'
export { toDataUrl } from './image/html'
export { imageBuiltIn } from './image/imageBuiltIn'
export { imageCompare } from './image/imageCompare'
export { imageInfo } from './image/imageInfo'
export { imagePixelColor } from './image/pixel'
export { magickLoaded } from './imageMagick/magickLoaded' 
export { cliToArray } from './main/command'
export { registerCommandPreprocessor } from './main/executeCommandPreprocessor'
export { main } from './main/main'
export { run } from './main/run'
export * from './types'



if (typeof getGlobal().Magica == 'undefined') {
  getGlobal().Magica = {
    File, toDataUrl, imageBuiltIn, imageCompare, magickLoaded, imageInfo, imagePixelColor, registerCommandPreprocessor, main, cliToArray, run, protectFile, isProtectedFile, getProtectedFile, addTemplatePreprocessorContextMutator
  }
}
