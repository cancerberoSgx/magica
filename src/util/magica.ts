import { getGlobal, getParametersFromUrl, inBrowser } from 'misc-utils-of-mine-generic';

let params: ReturnType<typeof getParametersFromUrl> | undefined

let src: string | undefined

/** 
 * This function and module needs to be loaded before of everything from index,  If in the browser get this script src attribute (it's one of the way of configuring magick.wasm location). 
 */
export function getThisBrowserScriptTagSrc() {
  if (!src && inBrowser()) {
    var script = document.currentScript || document.querySelector('script[src*="myscript.js"]') as any
    src = script ? script.src : undefined
    if (src) {
      params = getParametersFromUrl(src)
    }
  }
  return script
}

export function getThisBrowserScriptTagSrcParams() {
  getThisBrowserScriptTagSrc()
  return params
}


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



function _getMagica() {
  return {
    File, toDataUrl, imageBuiltIn, imageCompare, magickLoaded, imageInfo,
    imagePixelColor, registerCommandPreprocessor, main, cliToArray,
    run, protectFile, isProtectedFile, getProtectedFile, addTemplateHelper,
    getOptions, setOptions
  };
}

export type Magica = ReturnType<typeof _getMagica>;

export function getMagica(): Magica {
  return _getMagica();
}

export function installMagica() {
  getGlobal().Magica = _getMagica()
  if (typeof getGlobal().Magica === 'undefined') {
    getThisBrowserScriptTagSrc()
  }
}