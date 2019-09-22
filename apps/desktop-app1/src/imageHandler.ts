import { writeFileSync } from 'fs'
import * as gui from 'gui'
import { File, knownSupportedReadWriteImageFormats, mainSync } from 'magica'
import { int, arrayToObject } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { StateComponent, CommonProps } from "./abstractComponent"
import { buildBuffers } from "./imageUtil"
import { showModal } from './guiUtil'
import { setState, getState } from './store'
import { State, Field } from './state'

export class ImageHandler  {
  protected state:  State

  constructor(protected win:gui.Window){
    this.state = getState()
  } 

  handleApply() {
    setState(buildBuffers('output.jpg', this.state.currentBuffer))
  }

  handleOnMouseMove(onMouseMove: boolean) {
    setState({onMouseMove})
  }

  handleOpen(): void {
    const dialog = gui.FileOpenDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: knownSupportedReadWriteImageFormats },
    ])
    if (dialog.runForWindow(this. win)) {
      setState(buildBuffers(dialog.getResult()))
    }
  }

  handleSave(): void {
    const dialog = gui.FileSaveDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: [...knownSupportedReadWriteImageFormats, 'pdf'] },
    ])
    if (dialog.runForWindow(this.win)) {
      const result = mainSync({
        command: `convert output.miff '${basename(dialog.getResult())}'`,
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      })
      if (result.outputFiles.length) {
        writeFileSync(dialog.getResult(), result.outputFiles[0].content)
        showModal({title: 'File Saved', body: 'File successfully saved at \n'+dialog.getResult()})
      }
      else {
        showModal({title: 'Error', body: 'An error occurred while trying to save file \n'+dialog.getResult()+': \n'+result.error+'\n'+result.stderr.join(', ')})
      }
    }
  }

  handleCommand(event: gui.MouseEvent) {
    const c = this.state.commands.find(c=>c.name===this.state.command)
    if(!c){return}
    const context = {...event.positionInView, fields: arrayToObject(c.fields.map(f=>f.id), f=>c.fields.find(f2=>f2.id===f )) as {[s:string]:Field}, inputFile: 'output.miff', outputFile: 'output.jpg'}
    
    const command = c.command(context)
    console.log(context, command);
    // const command = `convert output.miff -matte -virtual-pixel white -distort Barrel '${this.state.fields['a'].} 0.7 0.2 0.5 ${event.positionInView.x} ${event.positionInView.y}' output.jpg`
      const result = mainSync({
        command,
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      })
      setState({
        currentBuffer: result.outputFiles[0].content,
        working: undefined,
        time: result.times ? result.times.total : 0
      })
  }

  handleRotate(value:  number) {
    const result = mainSync({
      command: `convert output.miff -virtual-pixel white -rotate ${value} output.jpg`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    const i = gui.Image.createFromBuffer(result.outputFiles[0].content, 1);
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize: i && i.getSize() || this.state.imageSize,
      imageRotate: value,
    })
  }

  handleResize(width: number, height: number) {
    const result = mainSync({
      command: `convert output.miff -virtual-pixel white -scale !${width || this.state.imageSize.width}x${height || this.state.imageSize.height} output.jpg`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize: {
        width: width || this.state.imageSize.width,
        height: height || this.state.imageSize.height
      }
    })
  }
}
