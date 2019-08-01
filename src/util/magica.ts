import { getGlobal } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { getProtectedFile, isProtectedFile, protectFile } from '../file/protected'
import { toDataUrl } from '../image/html'
import { imageBuiltIn } from '../image/imageBuiltIn'
import { imageCompare } from '../image/imageCompare'
import { imageInfo } from '../image/imageInfo'
import { imagePixelColor } from '../image/pixel'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { cliToArray } from '../main/command'
import { registerCommandPreprocessor } from '../main/executeCommandPreprocessor'
import { main } from '../main/main'
import { run } from '../main/run'
import { addTemplateHelper } from "../main/template/template"
import { getOptions, setOptions } from '../options'
import { getThisBrowserScriptTagSrc } from './magicaWasm';


function _getMagica() {
  return {
    File, toDataUrl, imageBuiltIn, imageCompare, magickLoaded, imageInfo,
    imagePixelColor, registerCommandPreprocessor, main, cliToArray,
    run, protectFile, isProtectedFile, getProtectedFile, addTemplateHelper,
    getOptions, setOptions
  }
}

export type Magica = ReturnType<typeof _getMagica>

export function getMagica(): Magica {
  return _getMagica()
}

export function installMagica() {
  getGlobal().Magica = _getMagica()
  // magickLoaded.then(()=>{
  //   getGlobal().Magica.magicaReady = true
  // })
}
