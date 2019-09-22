import { writeFileSync } from 'fs'
import * as gui from 'gui'
import { File, knownSupportedReadWriteImageFormats, mainSync } from 'magica'
import { int } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { StateComponent, CommonProps } from "./abstractComponent"
import { buildBuffers } from "./imageUtil"
import { showModal } from './guiUtil'

export class Options extends StateComponent<CommonProps> {
  protected view: gui.Browser = null as any;

  render() {
    this.view = gui.Browser.create({})
    this.view.setStyle({ width: '100%', height: '100%', flex: 1 })
    this.view.setBindingName('app1')
    this.view.addBinding('handleRotate', value => this.handleRotate(value))
    this.view.addBinding('handleOpen', () => this.handleOpen())
    this.view.addBinding('handleSave', () => this.handleSave())
    this.view.addBinding('handleApply', () => this.handleApply())
    this.view.addBinding('handleResize', (width, height) => this.handleResize(width, height))
    this.view.addBinding('handleOnMouseMove', value => this.handleOnMouseMove(value))
    this.renderOptions()
    return this.view
  }

  protected handleApply() {
    
    // const result = mainSync({
    //   command: `convert output.jpg output.miff`,
    //   inputFiles: [new File('output.jpg', this.state.currentBuffer)],
    // })
    // const i = gui.Image.createFromBuffer(this.state.currentBuffer, 1)
    this.setState(buildBuffers('output.jpg', this.state.currentBuffer))
      // ...buildBuffers('output.jpg', this.state.currentBuffer)
      // imageBuffer: this.state.currentBuffer,
      // currentBuffer: this.state.currentBuffer,
      // working: undefined,
      // imageSize: i.getSize(),
      // time: result.times ? result.times.total : 0,
      // magicaBuffer: result.outputFiles[0].content
    // })
  }

  protected handleOnMouseMove(onMouseMove: boolean) {
    // console.log('handleOnMouseMove', onMouseMove)
    this.setState({ options: { ...this.state.options, onMouseMove } })
  }

  protected handleOpen(): void {
    const dialog = gui.FileOpenDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: knownSupportedReadWriteImageFormats },
    ])
    if (dialog.runForWindow(this.props.win)) {
      this.setState(buildBuffers(dialog.getResult()))
    }
  }

  protected handleSave(): void {
    const dialog = gui.FileSaveDialog.create()
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setFilters([
      { description: 'Images', extensions: knownSupportedReadWriteImageFormats },
    ])
    if (dialog.runForWindow(this.props.win)) {
      const result = mainSync({
        command: `convert output.miff '${basename(dialog.getResult())}'`,
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      })
      if (result.outputFiles.length) {
        writeFileSync(dialog.getResult(), result.outputFiles[0].content)
        // this.setState({
        //   working: undefined,
        //   time: result.times ? result.times.total : 0
        // })
        showModal({title: 'File Saved', body: 'File successfully saved at \n'+dialog.getResult()})
      }
      else {
        //  this.setState({
        //   working: undefined,
        // })
        showModal({title: 'Error', body: 'An error occurred while trying to save file \n'+dialog.getResult()+': \n'+result.error+'\n'+result.stderr.join(', ')})
      }
    }
  }

  protected renderOptions() {
    const html = `
<button onClick="app1.handleOpen()">Open</button><br/>
<button onClick="app1.handleSave()">Save</button><br/>
<button onClick="app1.handleApply()">Apply</button><br/>
Rotate:<br>
<input type="range" value="0" onchange="app1.handleRotate(this.value)" min="0" max="360">
Width:<br>
<input step="20" type="number" value="${this.state.imageSize.width}" onchange="app1.handleResize(this.value, undefined)">
Height:<br/>
<input step="10" type="number" value="${this.state.imageSize.height}" onchange="app1.handleResize(undefined, this.value)">
<label>Commands: <select>${this.state.options.commands.map(c => `<option selected="${this.state.options.command === c.name}" value="${c.name}">${c.name}</option>`).join('\n    ')}
</select></label>
<label><input type="checkbox" ${this.state.options.onMouseMove ? 'checked' : ''} onchange="app1.handleOnMouseMove(this.checked)">On Mouse Move</label>
`
    this.view.loadHTML(html, 'http://localhost')
  }

  protected handleRotate(value = int(0, 360)) {
    const result = mainSync({
      command: `convert output.miff -virtual-pixel white -rotate ${value} output.jpg`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    const i = gui.Image.createFromBuffer(result.outputFiles[0].content, 1);
    this.setState({
      currentBuffer: result.outputFiles[0].content,
      working: undefined,
      time: result.times ? result.times.total : 0,
      imageSize: i && i.getSize() || this.state.imageSize
    })
  }

  protected handleResize(width: number, height: number) {
    const result = mainSync({
      command: `convert output.miff -virtual-pixel white -scale !${width || this.state.imageSize.width}x${height || this.state.imageSize.height} output.jpg`,
      inputFiles: [new File('output.miff', this.state.magicaBuffer)],
    })
    this.setState({
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
