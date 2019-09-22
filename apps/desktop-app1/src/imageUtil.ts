import { readFileSync } from 'fs'
import { Image } from 'gui'
import { File, mainSync, magickLoaded, Result } from 'magica'
import { basename } from 'path'
import { Fn } from 'misc-utils-of-mine-generic';
import { getState } from './store';

export function buildBuffers(image: string, content?: ArrayBufferView) {
  const buffer = typeof content === 'undefined' ? new Uint8ClampedArray(readFileSync(image)) : new Uint8ClampedArray(content.buffer)
  const s = {
    image,
    currentBuffer: buffer,
    imageBuffer:  buffer
  };
  const result = mainSync({
    verbose: true,
    command: `convert '${basename(image)}' output.miff`,
    inputFiles: [new File(basename(image), s.imageBuffer)]
  });
  // console.log(result.verbose);
  
  return {
    ...s,
    magicaBuffer: result.outputFiles[0].content,
    working: undefined,
    // imageSize: result.verbose && result.verbose.length ? (result.verbose[0].outputSize||result.verbose[0].inputSize) :( getImageSize(s.imageBuffer) ||getState().imageSize || { width: 400, height: 400 })
    imageSize: getImageSize(result) 
    }
}

export function getImageSize(imageBufferOrResult: ArrayBufferView|Result){
  if(!ArrayBuffer.isView(imageBufferOrResult) && imageBufferOrResult.verbose && imageBufferOrResult.verbose.length &&imageBufferOrResult.verbose[0].outputSize && imageBufferOrResult.verbose[0].outputSize.height && imageBufferOrResult.verbose[0].outputSize.width) {
    return imageBufferOrResult.verbose[0].outputSize
  }
  const b = ArrayBuffer.isView(imageBufferOrResult) ? imageBufferOrResult : imageBufferOrResult.outputFiles[0].content
  const i = Image.createFromBuffer(b, 1);
  let  imageSize = i && i.getSize()
  imageSize = (imageSize && imageSize.width && imageSize.height)  ? imageSize : getState().imageSize || { width: 400, height: 400 }
  return imageSize
}

export async function loadLibraries( ) {
  try {
    await magickLoaded
  } catch (error) {
    console.error(error)
  }
}
