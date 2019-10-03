import { writeFileSync, readFileSync } from 'fs'
import * as gui from 'gui'
import { File, knownSupportedReadWriteImageFormats, mainSync, Result } from 'magica'
import { int, arrayToObject, sleep } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { showModal } from "./showModal"
import { setState, getState } from './store'
import { State } from './state'
import { buildBuffers, getImageSize, checkError } from './imageUtil'
import { Command, buildCommand } from './commands'

let Webcam: any
export class ImageHandler {
  async captureCamera() {

    var NodeWebcam = require("node-webcam");
    var opts = {
      //Picture related
      width: 640,
      height: 480,
      quality: 100,
      //Delay in seconds to take shot
      //if the platform supports miliseconds
      //use a float (0.1)
      //Currently only on windows

      delay: 0,
      //Save shots in memory
      saveShots: true,
      // [jpeg, png] support varies
      // Webcam.OutputTypes
      output: "jpeg",
      //Which camera to use
      //Use Webcam.list() for results
      //false for default device

      device: false,
      // [location, buffer, base64]
      // Webcam.CallbackReturnTypes
      callbackReturn: "buffer",
      //Logging
      verbose: false
    };
    if (!Webcam) {

      Webcam = NodeWebcam.create(opts);
    }


    // function capture(): Promise<ArrayBufferView>{

    //         return new Promise(resolve=>{

    // // Webcam.capture( "", ( err:any, data:Buffer )=> {
    //   Webcam.getShot(undefined, opts, ( err:any, data:Buffer )=> {
    //     console.log('last', err, data);
    //     resolve(data)
    // } );
    //         })
    //       }
    Webcam.capture('tmp', async (err: any, data: Buffer) => {
      console.log('capture', err, data);
      setState(await this.buildBuffers(data))
      Webcam.getShot(async (err: any, data: Buffer) => {
        console.log('last', err, data);
        setState(await this.buildBuffers(data))
        //     // resolve(data)
      });


      // setState(await this.buildBuffers(await capture()))
      // await sleep(0)

      //     for (let i = 0; i <100; i++) {
      // setState(await this.buildBuffers(await capture()))
      // await sleep(0)
      // this.buildBuffers(data)
      // }

    })



  }
  protected state: State

  constructor(protected win: gui.Window) {
    this.state = getState()
  }

  protected outputFileName() {
    return 'output.' + this.state.renderedFormat
  }

  protected async buildBuffers(b: ArrayBufferView) {
    return await buildBuffers(`${this.outputFileName()}`, b, this.state.scaleFactor)
  }

  async   handleApply() {
    setState(await this.buildBuffers(this.state.currentBuffer))
  }

  async  handleOnMouseMove(onMouseMove: boolean) {
    setState({ onMouseMove, ...this.state.autoApply ? await this.buildBuffers(this.state.currentBuffer) : {} })
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
      await sleep(20)
      const result = mainSync({
        command: `convert output.miff '${basename(dialog.getResult())}'`,
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      })
      if (checkError(result, this.state)) {
        return
      }
      // if (result.outputFiles.length) {
      writeFileSync(dialog.getResult(), result.outputFiles[0].content)
      showModal({ title: 'File Saved', closeIn: 5000, body: 'File successfully saved at \n' + dialog.getResult(), state: this.state })
      // }
      // else {
      //   showModal({ title: 'Error', body: 'An error occurred while trying to save file \n' + dialog.getResult() + ': \n' + result.error + '\n' + result.stderr.join(', '), closeIn: 5000  , state: this.state})
      // }
      setState({ working: undefined })
    }
  }

  async  handleCommand(event: gui.MouseEvent) {
    if (this.state.imageSize.width > 800 || this.state.imageSize.height > 800) {
      setState({
        working: 'Processing...',
      })
      await sleep(20)
    }
    const c = this.state.commands.find(c => c.name === this.state.command)
    if (!c) { return }
    const command = buildCommand(event.positionInView, c, this.state)
    const result = mainSync({
      command,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    if (checkError(result, this.state)) {
      return
    }
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      ...this.state.autoApply ? await this.buildBuffers(result.outputFiles[0].content) : {},
      // ...this.buildBuffers(result.outputFiles[0].content)
    })
  }

  async   handleRotate(value: number) {
    if (this.state.imageSize.width > 800 || this.state.imageSize.height > 800) {
      setState({
        working: 'Processing...',
      })
      await sleep(20)
    }
    const command = `convert output.miff -virtual-pixel ${this.state.virtualPixel} ${this.state.rotatePreserveSize ? `-distort SRT -${value}` : `-rotate ${value}`} -gravity ${this.state.gravity} ${this.outputFileName()}`
    // console.log(command);
    const result = mainSync({
      command,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      verbose: true
    })
    if (checkError(result, this.state)) {
      return
    }
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize: getImageSize(result),
      ...this.state.autoApply ? await this.buildBuffers(result.outputFiles[0].content) : {},
      imageRotate: value,
    })
  }

  async  handleResize(width?: number, height?: number) {
    if (this.state.imageSize.width > 800 || this.state.imageSize.height > 800) {
      setState({
        working: 'Processing...',
      })
      await sleep(20)
    }
    const result = mainSync({
      command: `convert output.miff -virtual-pixel ${this.state.virtualPixel} -gravity ${this.state.gravity} -scale !${width || this.state.imageSize.width}x${height || this.state.imageSize.height} ${this.outputFileName()}`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    if (checkError(result, this.state)) {
      return
    }
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize: {
        width: width || this.state.imageSize.width,
        height: height || this.state.imageSize.height
      },
      ...this.state.autoApply ? await this.buildBuffers(result.outputFiles[0].content) : {},
    })
  }

}
