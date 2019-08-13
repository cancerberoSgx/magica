import { getFileExtension } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { IFile } from '../types'

export async function toDataUrl(o: File, mime?: string) {
  mime = mime || await o.mimeType()
  return 'data:' + mime + ';' + o.name + ';base64,' + File.toBase64(o)
}

/**
 * Unsafe synchronous operation, please use [toDataUrl]
 */
export function toDataUrlSync(o: IFile, mime = `image/${getFileExtension(o.name)}`) {
  return `data:${mime};base64,${btoa(
    (o.content as any as number[])
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )}`
}

export async function loadHtmlImageElement(o: File, el?: HTMLImageElement, forceDataUrl = false): Promise<HTMLImageElement> {
  var img = el || new Image()
  if (!forceDataUrl && o.url) {
    img.src = o.url
  }
  else {
    img.src = await o.asDataUrl()
  }
  return img
}

export async function loadHtmlCanvasElement(f: File, ctx: CanvasRenderingContext2D, dx: number = 0, dy: number = 0, dirtyX: number | undefined = undefined, dirtyY: number | undefined = undefined, dirtyWidth: number | undefined = undefined, dirtyHeight: number | undefined = undefined) {
  var d = await f.asHTMLImageData()
  if (typeof dirtyX === 'undefined' || typeof dirtyY === 'undefined' || typeof dirtyWidth === 'undefined' || typeof dirtyHeight === 'undefined') {
    ctx.putImageData(d, dx, dy)
  } else {
    ctx.putImageData(d, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
  }
}
// interface RGBAImageData {width: number, height: number,data: Uint8ClampedArray}

// export async function toImageData(img: File): Promise<RGBAImageData> {  
//   var size = await img!.size()
//   var {outputFiles } = await run({script: `convert bluebells.png -depth 8 i.rgba`, inputFiles: [img]})
//   return {
//     data: new Uint8ClampedArray(outputFiles[0].content.buffer), width: size.width, height: size.height
//   }
// }

// export async function fromImageData(d: RGBAImageData) {  
//   var img = new File('img.rgba', d.data, undefined, undefined, d.width, d.height)
//   var {outputFiles } = await run({script: `convert -size ${d.width}x${d.height} bluebells.png -depth 8 i.rgba`, inputFiles: [img]})

//   var size = await img!.size()
//   var {outputFiles } = await run({script: `convert bluebells.png -depth 8 i.rgba`, inputFiles: [img]})
//   return {
//     data: new Uint8ClampedArray(outputFiles[0].content.buffer), width: size.width, height: size.height
//   }
// }
// export async function toCanvasImageData(img: File): Promise<RGBAImageData> {  
//   var d = await toImageData(img)
//   return new ImageData(d.data, d.width, d.height)
// }
