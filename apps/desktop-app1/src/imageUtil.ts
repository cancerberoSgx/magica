import { readFileSync } from 'fs'
import { Image, SizeF } from 'gui'
import { File, mainSync, magickLoaded, Result } from 'magica'
import { basename } from 'path'
import { getState } from './store';
import { showModal } from './guiUtil';
import { State } from './state';

export async function buildBuffers(image: string, content?: ArrayBufferView, scaleFactor=1) {
    //         if (dialog.runForWindow(this.win)) {
    //            setState({
    //   working: 'Processing...',
    // })
    // await sleep(2)
    //      setState({working: undefined})
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
  return {
    ...s,
    magicaBuffer: result.outputFiles[0].content,
    working: undefined,
    // imageSize: result.verbose && result.verbose.length ? (result.verbose[0].outputSize||result.verbose[0].inputSize) :( getImageSize(s.imageBuffer) ||getState().imageSize || { width: 400, height: 400 })
    imageSize: getImageSize(result, scaleFactor) 
    }
}

export function getImageSize(imageBufferOrResult: ArrayBufferView|Result, scaleFactor=1){
  let  imageSize : SizeF
  if(!ArrayBuffer.isView(imageBufferOrResult) && imageBufferOrResult.verbose && imageBufferOrResult.verbose.length &&imageBufferOrResult.verbose[0].outputSize && imageBufferOrResult.verbose[0].outputSize.height && imageBufferOrResult.verbose[0].outputSize.width) {
    imageSize= {width: imageBufferOrResult.verbose[0].outputSize.width, height: imageBufferOrResult.verbose[0].outputSize.height}
      imageSize= {width: imageSize.width*scaleFactor, height: imageSize.height*scaleFactor}
  }
  else {
  const b = ArrayBuffer.isView(imageBufferOrResult) ? imageBufferOrResult : imageBufferOrResult.outputFiles[0].content
  const i = Image.createFromBuffer(b, scaleFactor);
   const iz = i && i.getSize()
   if((iz && iz.width && iz.height)){
     imageSize = iz
   }else {
     imageSize = getState().imageSize || { width: 400, height: 400 }
    imageSize= {width: imageSize.width*scaleFactor, height: imageSize.height*scaleFactor}
   }
  }
  return  imageSize
}

export async function loadLibraries( ) {
  try {
    await magickLoaded
  } catch (error) {
    console.error(error)
  }
}

export function checkError(result:Result, state: State) {
  if(!result.outputFiles.length||result.error) {
    showModal({title: 'Error', body: 'Error in ImageMagick command. '+result.error+'\n'+result.stderr.join('\n'), state})
  return true
  }
}