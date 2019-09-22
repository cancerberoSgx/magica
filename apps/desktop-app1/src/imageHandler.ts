import { writeFileSync, readFileSync } from 'fs'
import * as gui from 'gui'
import { File, knownSupportedReadWriteImageFormats, mainSync, Result } from 'magica'
import { int, arrayToObject, sleep } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { showModal } from './guiUtil'
import { setState, getState } from './store'
import { State, Field } from './state'
import { buildBuffers, getImageSize } from './imageUtil'

const OUTPUT_FILE_NAME = 'output.png'

export class ImageHandler {
  protected state: State
  outputFileName: string
  constructor(protected win: gui.Window) {
    this.state = getState()
  this.outputFileName = 'output.'+this.state.outputFormat
  }

async   handleApply() {
    setState(await this.buildBuffers(  this.state.currentBuffer))
  }

 async  handleOnMouseMove(onMouseMove: boolean) {
    setState({ onMouseMove, ...this.state.autoApply ? await this.buildBuffers( this.state.currentBuffer) : {} })
  }

  async buildBuffers(b: ArrayBufferView) {
   return await buildBuffers(`${OUTPUT_FILE_NAME}`, b, this.state.scaleFactor)
  }

 async  handleOpen() {
    const dialog = gui.FileOpenDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: knownSupportedReadWriteImageFormats },
    ])
            if (dialog.runForWindow(this.win)) {
      setState(await this.buildBuffers(readFileSync(dialog.getResult())))
            }
  }

async   handleSave() {
    const dialog = gui.FileSaveDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: [...knownSupportedReadWriteImageFormats, 'pdf'] },
    ])
    if (dialog.runForWindow(this.win)) {
         setState({
      working: 'Processing...',
    })
    await sleep(2)
      const result = mainSync({
        command: `convert output.miff '${basename(dialog.getResult())}'`,
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      })
      if (result.outputFiles.length) {
        writeFileSync(dialog.getResult(), result.outputFiles[0].content)
        showModal({ title: 'File Saved', closeIn: 5000 , body: 'File successfully saved at \n' + dialog.getResult() , state: this.state})
      }
      else {
        showModal({ title: 'Error', body: 'An error occurred while trying to save file \n' + dialog.getResult() + ': \n' + result.error + '\n' + result.stderr.join(', '), closeIn: 5000  , state: this.state})
      }
      setState({working: undefined})
    }
  }

 async  handleCommand(event: gui.MouseEvent) {
     setState({
      working: 'Processing...',
    })
    await sleep(2)
    const c = this.state.commands.find(c => c.name === this.state.command)
    if (!c) { return }
    const context = {
      ...event.positionInView,
      fields: arrayToObject(getState().fields.map(f => f.id), f => getState().fields.find(f2 => f2.id === f)) as { [s: string]: Field },
      inputFile: 'output.miff',
      outputFile: `${OUTPUT_FILE_NAME}`
    }
    const command = c.command(context)
    const result = mainSync({
      command,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      ...this.state.autoApply ? await this.buildBuffers( result.outputFiles[0].content) : {},
      // ...this.buildBuffers(result.outputFiles[0].content)
    })
  }

async   handleRotate(value: number) {
     setState({
      working: 'Processing...',
    }) 
    await sleep(2)
    const result = mainSync({
      command: `convert output.miff -virtual-pixel transparent -distort SRT -${value} -gravity center ${OUTPUT_FILE_NAME}`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      verbose: true
    })
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize:   getImageSize(result) ,
      ...this.state.autoApply ? await this.buildBuffers( result.outputFiles[0].content) : {},
      imageRotate: value,
    })
  }

 async  handleResize(width?: number, height?: number) {
      setState({
      working: 'Processing...',
    })
    await sleep(2)
    const result = mainSync({
      command: `convert output.miff -virtual-pixel transparent -scale !${width || this.state.imageSize.width}x${height || this.state.imageSize.height} ${OUTPUT_FILE_NAME}`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize: {
        width: width || this.state.imageSize.width,
        height: height || this.state.imageSize.height
      },
      ...this.state.autoApply ? await this.buildBuffers( result.outputFiles[0].content) : {},
    })
  }

//   async   buildBuffers(image: string=`${OUTPUT_FILE_NAME}`, content?: ArrayBufferView, scaleFactor=1) {
//                setState({
//       working: 'Processing...',
//     })
//     await sleep(2)
//   const buffer = typeof content === 'undefined' ? new Uint8ClampedArray(readFileSync(image)) : new Uint8ClampedArray(content.buffer)
//   const s = {
//     image,
//     currentBuffer: buffer,
//     imageBuffer:  buffer
//   };
//   const result = mainSync({
//     verbose: true,
//     command: `convert '${basename(image)}' output.miff`,
//     inputFiles: [new File(basename(image), s.imageBuffer)]
//   });

// const imageSize = this.getImageSize(result, scaleFactor) 
//         //  setState({working: undefined})
//   return {
//     ...s,
//     magicaBuffer: result.outputFiles[0].content,
//     working: undefined,
//     // imageSize: result.verbose && result.verbose.length ? (result.verbose[0].outputSize||result.verbose[0].inputSize) :( getImageSize(s.imageBuffer) ||getState().imageSize || { width: 400, height: 400 })
//     imageSize
//     }
// }

//  getImageSize(imageBufferOrResult: ArrayBufferView|Result, scaleFactor=1){
//   let  imageSize : gui.SizeF
//   if(!ArrayBuffer.isView(imageBufferOrResult) && imageBufferOrResult.verbose && imageBufferOrResult.verbose.length &&imageBufferOrResult.verbose[0].outputSize && imageBufferOrResult.verbose[0].outputSize.height && imageBufferOrResult.verbose[0].outputSize.width) {
//     imageSize= {width: imageBufferOrResult.verbose[0].outputSize.width, height: imageBufferOrResult.verbose[0].outputSize.height}
//       imageSize= {width: imageSize.width*scaleFactor, height: imageSize.height*scaleFactor}
//   }
//   else {
//   const b = ArrayBuffer.isView(imageBufferOrResult) ? imageBufferOrResult : imageBufferOrResult.outputFiles[0].content
//   const i = gui.Image.createFromBuffer(b, scaleFactor);
//    const iz = i && i.getSize()
//    if((iz && iz.width && iz.height)){
//      imageSize = iz
//    }else {
//      imageSize = getState().imageSize || { width: 400, height: 400 }
//     imageSize= {width: imageSize.width*scaleFactor, height: imageSize.height*scaleFactor}
//    }
//   }
//   return  imageSize
// }

}
