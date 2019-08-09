import { notFalsy } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { main } from '../main/main'
import { IFile, Rgba } from '../types'

/**
 * Returns given rgba image x,y pixel. If the image is not rgba the behavior is undefined.
 */
export function getRgbaPixel(f: File, x: number, y: number): Rgba {
  // if (f.name.endsWith('rgba') && f.width && f.height) {
  const i = coordsToIndex(f.width!, x, y)
  const c = f.content as Uint8ClampedArray
  return { r: c[i], g: c[i + 1], b: c[i + 2], a: c[i + 3] }
  // return `rgba(${r},${g},${b},${a})`
  // } else {
  // throw new Error('Image must be .rgba and have own height and width properties')
  // }
}
export function coordsToIndex(width: number, x: number, y: number){
  return (width! * y + x) * 4
}
export async function getPixels(f: File): Promise<Rgba[]> {
  var data = await f.asRGBAImageData()
  var pixels: Rgba[] = []
  for (let y = 0; y < data.height; y++) {
    // var row: Rgba[] = []
    // pixels.push(row)
    for (let x = 0; x < data.width; x++) {
      // const i  = (f.width! * y + x) * 4
      pixels.push(getRgbaPixel(f, x, y))
    }
  }
  return pixels
}


export async function imagePixelColor(img: IFile | undefined, x: number, y: number): Promise<string | undefined> {
  if (!img) { return }
  var f = File.asFile(img)
  if (isRgbaImage(f)) {
    const c = getRgbaPixel(f, x, y)
    return rgbaToString(c)
  } else {
    const { outputFiles } = await main({
      inputFiles: [img],
      command: `convert ${img.name} -format %[pixel:p{${x},${y}}] info:info.txt`
    })
    return await File.asString(outputFiles[0]) || undefined
  }
}

export function rgbaToString(c: Rgba): string   {
  return `rgba(${c.r},${c.g},${c.b},${c.a})`;
}

export function isRgbaImage(f: File) {
  return f.name.endsWith('rgba') && f.width && f.content instanceof Uint8ClampedArray;
}

export async function colorCount(img: IFile | undefined): Promise<number | undefined> {
  if (!img) { return }
  const { outputFiles } = await main({ inputFiles: [img], command: `convert ${img.name} -unique-colors -format %w info:info.txt` })
  var s = await File.asString(outputFiles[0])
  return parseInt(s) || undefined
}

export function parseConvertVerbose(stdout: string[]) {
  // logo:=>bbb.rgba GIF 640x480=>800x754
  var r = /([^=]+)=>([^\s]+)\s+([a-zA-Z0-9]+)\s+([^=]+)=>([^\s]+)/
  // logo:=>bbb.rgba GIF 384x288 384x288+0+0
  var r2 = /([^=]+)=>([^\s]+)\s+([a-zA-Z0-9]+)\s+([^\s]+)/

  return stdout.map(l => r.exec(l) || r2.exec(l)).filter(notFalsy).map(m => {
    var a = m[4].split('x')
    var b = m[Math.min(m.length - 1, 6)].split('x')
    return {
      inputName: m[1],
      outputName: m[2],
      inputFormat: m[3].toLowerCase(),
      inputSize: { width: parseInt(a[0]), height: parseInt(a[1]) },
      outputSize: { width: parseInt(b[0]), height: parseInt(b[1]) }
    }
  })
}
