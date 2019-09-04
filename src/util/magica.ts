import { getGlobal } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { isProtectedFile, protectFile } from '../file/protected'
import { toDataUrl } from '../image/html'
import { imageCompare } from '../image/imageCompare'
import { imageInfo } from '../image/imageInfo'
import { colorCount, imagePixelColor } from '../image/imageUtil'
import { imageBuiltIn } from '../image/support'
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
    run, protectFile, isProtectedFile, addTemplateHelper,
    getOptions, setOptions, colorCount
  }
}

export type Magica = ReturnType<typeof _getMagica>

export function getMagica(): Magica {
  return _getMagica()
}

export function installMagica() {
  getGlobal().Magica = _getMagica()
}
