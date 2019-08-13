import { getParametersFromUrl, inBrowser } from 'misc-utils-of-mine-generic'

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
