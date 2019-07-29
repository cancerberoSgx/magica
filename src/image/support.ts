import { notFalsy } from 'misc-utils-of-mine-generic'
import { main } from '../main/main'

export async function getConfigureFolders(): Promise<string[]> {
  const result = await main({ command: `convert -debug configure rose: info:` })
  const contains = `Searching for configure file:`
  const folders = result.stderr
    .filter(line => line.includes(contains))
    .map(line => line.substring(line.indexOf(contains) + contains.length, line.length))
    .map(s => s.replace(/\/\//g, '/'))
    .map(s => s.substring(0, s.lastIndexOf('/')))
    .map(s => s.replace(/"/g, '').trim())
  return folders
}


interface ListConfigure {
  /** lower case delegates names like bzlib freetype heic jng jp2 jpeg lcms ltdl lzma openexr png tiff webp xml zlib */
  delegates: string[]
  /** lower case feature names like Cipher DPC HDRI Modules OpenMP(3.1) */
  features: string[]
}
let listConfigure_:ListConfigure|undefined
/** returns the output of part of the information returned in `convert -list configure`, parsed. */
export async function listConfigure(): Promise<ListConfigure>{
  if(!listConfigure_){
    const result = await main({ command: `convert -list configure` })
    const delegatesS = result.stderr.find(l=>l.trim().toLowerCase().startsWith('delegates'))
  const delegates = delegatesS ? delegatesS.split(/\s+/).splice(1): []
  const featuresS = result.stderr.find(l=>l.trim().toLowerCase().startsWith('features'))
  const features = featuresS ? featuresS.split(/\s+/).splice(1): []
  listConfigure_= {delegates, features};
  }
  return listConfigure_
}


interface Format {
  name: string
  flags: string
  description: string
}

export async function listFormat(): Promise<Format[]> {
  if (!formats) {
    const result = await main({ command: `convert -list format` })
    var r = /^\s*([^\s]+)\s+([^\s]+)\s+(.+)$/g
    formats = result.stdout.slice(2).map(s => r.exec(s)).filter(notFalsy).filter(r => r[1] !== 'See').map(r => ({
      name: r![1],
      flags: r![2],
      description: r![3],
    }))
  }
  return formats
}
let formats: Format[]

/**
 * List of image formats that are known to be supported by wasm-imagemagick both for read and write. See `spec/formatSpec.ts`.
 * 
 * has some heuristic information regarding features (not) supported by wasm-imagemagick, for example, image formats
 */
export const knownSupportedReadWriteImageFormats = [
  'jpg', 'png',
  'psd',
  // 'webp',// should be working but it's not : ImageMagick/coders/webp.c
  'tiff', 'xcf', 'gif', 'bmp', 'tga', 'miff', 'ico', 'dcm', 'xpm', 'pcx',
  'fits',
  'ppm',
  'pgm',
  'pfm',
  'mng',
  'hdr',
  'dds', // generated using convert -define "dds:compression={dxt1, dxt5, none}" to_rotate.png  to_rotate.dds
  'otb', // generated using convert to_rotate.png  to_rotate.otb

  'txt', // generated using convert to_rotate.png  to_rotate.txt
  'psb',

  // 'rgb', // fails because  MustSpecifyImageSize `to_rotate.rgb'
]

/**
 * List of image formats that are known to be supported by wasm-imagemagick but only for write operation. See `spec/formatSpec.ts`
 */
export const knownSupportedWriteOnlyImageFormats = [
  'ps', 'pdf',
  'epdf', // generated using convert to_rotate.png  to_rotate.epdf
  'svg',
  'djvu', // converted from png using online tool
]

/**
 * list of image formats that are known to be supported by wasm-imagemagick but only for read operation. See `spec/formatSpec.ts`
 */
export const knownSupportedReadOnlyImageFormats = [
  // 'pix',
  'mat',
]
