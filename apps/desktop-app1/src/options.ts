import { writeFileSync } from 'fs'
import * as gui from 'gui'
import { File, knownSupportedReadWriteImageFormats, mainSync } from 'magica'
import { int } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { StateComponent, CommonProps } from "./abstractComponent"
import { buildBuffers } from "./imageUtil"
import { showModal } from './guiUtil'
import { ImageHandler } from './imageHandler'

export class Options extends StateComponent<CommonProps> {
  protected view: gui.Browser = null as any;
  protected handler : ImageHandler = null as any
  
  render() {
    this.handler = new ImageHandler(this.props.win)
    this.view = gui.Browser.create({})
    this.view.setStyle({ width: '100%', height: '100%', flex: 1 })
    this.view.setBindingName('app1')
    this.view.addBinding('handleRotate', value => this.handler.handleRotate(value))
    this.view.addBinding('handleOpen', () => this.handler.handleOpen())
    this.view.addBinding('handleSave', () => this.handler.handleSave())
    this.view.addBinding('handleApply', () => this.handler.handleApply())
    this.view.addBinding('handleResize', (width, height) => this.handler.handleResize(width, height))
    this.view.addBinding('handleOnMouseMove', value => this.handler.handleOnMouseMove(value))
    this.renderOptions()
    return this.view
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
 
}
