import { equal } from 'assert'
import { asArray, notUndefined } from 'misc-utils-of-mine-generic'
import { File, IFile } from '..'
import { main } from '../main/main'

/**
 * Execute `convert $IMG info.json` to extract image metadata. Returns the parsed info.json file contents
 * @param img could be a string in case you want to extract information of built in images like `rose:`
 */
export async function imageInfo(img?: IFile | string | (IFile | string)[]): Promise<ExtractInfoResult[]> {
  if (!img) {
    return Promise.resolve([])
  }
  var files = await Promise.all(asArray(img).map(async img => typeof img === 'string' ? await File.resolve(img) : [img]))

  const r = await main({
    inputFiles: files.flat().filter(notUndefined),
    command: ['convert', ...asArray(img).map(img => typeof img === 'string' ? img : img.name), 'imgInfo.json']
  })
  equal(r.outputFiles.length, 1)
  const s = File.toString(r.outputFiles[0])
  const obj = JSON.parse(s)
  return obj
}

/**
 * Execute `convert $IMG info.json` to extract image metadata. Returns the parsed image.geometry object 
 */
// export async function bounds(img: File | string): Promise<ExtractInfoResultGeometry[]> {
// var info = await imageInfo(img)
// return info.length>0 ? info[0].image.geometry : undefined
// const r = await main({
//   inputFiles: [...typeof img === 'string' ? [] : [img]],
//   command: ['convert', typeof img === 'string' ? img : img.name, 'imgInfo.json']
// })
// equal(r.outputFiles.length, 1)
// const s = File.toString(r.outputFiles[0])
// const obj = JSON.parse(s)
// return obj
// }

// the following is ExtractInfoResult json output semi automatically translated to TypeScript.

interface ExtractInfoResult {
  image: ExtractInfoResultImage
  error?: Error
}

export interface ExtractInfoResultImage {
  name?: string
  baseName?: string
  format?: string
  formatDescription?: string
  mimeType?: string
  class?: string
  geometry?: ExtractInfoResultGeometry
  resolution?: ExtractInfoResultResolution
  printSize?: ExtractInfoResultPrintSize
  units?: string
  type?: string
  baseType?: string
  endianess?: string
  colorspace?: string
  depth?: number
  baseDepth?: number
  channelDepth?: ExtractInfoResultChannelDepth
  pixels?: number
  imageStatistics?: ExtractInfoResultImageStatistics
  channelStatistics?: ExtractInfoResultChannelStatistics
  alpha?: string
  renderingIntent?: string
  gamma?: number
  chromaticity?: ExtractInfoResultChromaticity
  matteColor?: string
  backgroundColor?: string
  borderColor?: string
  transparentColor?: string
  interlace?: string
  intensity?: string
  compose?: string
  pageGeometry?: ExtractInfoResultPageGeometry
  dispose?: string
  iterations?: number
  compression?: string
  orientation?: string
  properties?: ExtractInfoResultProperties
  profiles?: ExtractInfoResultProfiles
  tainted?: boolean
  filesize?: string
  numberPixels?: string
  pixelsPerSecond?: string
  userTime?: string
  elapsedTime?: string
  version?: string
}

interface ExtractInfoResultGeometry {
  width: number
  height: number
  x: number
  y: number
}

interface ExtractInfoResultResolution {
  x: number
  y: number
}

interface ExtractInfoResultPrintSize {
  x?: number
  y?: number
}

interface ExtractInfoResultChannelDepth {
  alpha?: number
  red?: number
  green?: number
  blue?: number
}

interface ExtractInfoResultOverall {
  min?: number
  max?: number
  mean?: number
  standardDeviation?: number
  kurtosis?: number
  skewness?: number
  entropy?: number
}

interface ExtractInfoResultImageStatistics {
  Overall?: ExtractInfoResultOverall
}

interface ExtractInfoResultAlpha {
  min?: number
  max?: number
  mean?: number
  standardDeviation?: number
  kurtosis?: number
  skewness?: number
  entropy?: number
}

interface ExtractInfoResultRed {
  min?: number
  max?: number
  mean?: number
  standardDeviation?: number
  kurtosis?: number
  skewness?: number
  entropy?: number
}

interface ExtractInfoResultGreen {
  min?: number
  max?: number
  mean?: number
  standardDeviation?: number
  kurtosis?: number
  skewness?: number
  entropy?: number
}

interface ExtractInfoResultBlue {
  min?: number
  max?: number
  mean?: number
  standardDeviation?: number
  kurtosis?: number
  skewness?: number
  entropy?: number
}

interface ExtractInfoResultChannelStatistics {
  Alpha?: ExtractInfoResultAlpha
  Red?: ExtractInfoResultRed
  Green?: ExtractInfoResultGreen
  Blue?: ExtractInfoResultBlue
}

interface ExtractInfoResultRedPrimary {
  x?: number
  y?: number
}

interface ExtractInfoResultGreenPrimary {
  x?: number
  y?: number
}

interface ExtractInfoResultBluePrimary {
  x?: number
  y?: number
}

interface ExtractInfoResultWhitePrimary {
  x?: number
  y?: number
}

interface ExtractInfoResultChromaticity {
  redPrimary?: ExtractInfoResultRedPrimary
  greenPrimary?: ExtractInfoResultGreenPrimary
  bluePrimary?: ExtractInfoResultBluePrimary
  whitePrimary?: ExtractInfoResultWhitePrimary
}

interface ExtractInfoResultPageGeometry {
  width?: number
  height?: number
  x?: number
  y?: number
}

interface ExtractInfoResultProperties {
  [n: string]: any
  'date:create'?: string
  'date:modify'?: string
  signature?: string
}

// interface ExtractInfoResult8bim2 {length?: number
// }

// interface ExtractInfoResultProfiles {'8bim'?: ExtractInfoResult8bim2
// }
type ExtractInfoResultProfiles = any
