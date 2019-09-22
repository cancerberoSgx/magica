import { writeFileSync } from 'fs'
import * as gui from 'gui'
import { File, knownSupportedReadWriteImageFormats, mainSync } from 'magica'
import { int, objectKeys, arrayToObject } from 'misc-utils-of-mine-generic'
import { basename } from 'path'
import { StateComponent, CommonProps } from "./abstractComponent"
import { buildBuffers } from "./imageUtil"
import { showModal } from './guiUtil'
import { ImageHandler } from './imageHandler'
import { State } from './state'

type RP = 'imageRotate' | 'imageSize' | 'command'

export class Options extends StateComponent<CommonProps> {

  protected view: gui.Browser = null as any;
  protected handler: ImageHandler = null as any
  relevantProperties: RP[] = ['imageRotate', 'imageSize', 'command']

  render() {
    this.handler = new ImageHandler(this.props.win)
    this.view = gui.Browser.create({devtools: true})
    this.view.setStyle({ width: '100%', height: '100%', flex: 1 })
    this.view.setBindingName('app1')
    this.view.addBinding('handleRotate', value => this.handler.handleRotate(value))
    this.view.addBinding('handleOpen', () => this.handler.handleOpen())
    this.view.addBinding('handleSave', () => this.handler.handleSave())
    this.view.addBinding('handleApply', () => this.handler.handleApply())
    this.view.addBinding('handleResize', (width, height) => this.handler.handleResize(width, height))
    this.view.addBinding('handleOnMouseMove', value => this.handler.handleOnMouseMove(value))
    this.view.addBinding('handleCommandChange', value => this.handleCommandChange(value))
    this.view.addBinding('log', s => this.handleLog(s))
    this.renderOptions()
    return this.view
  }
  handleLog(s: string) {
    console.log('Browser log', s);
  }

  handleCommandChange(value: string) {
    console.log('handleCommandChange', value);
    this.setState({ command: value })
  }

  protected renderOptions() {
    const html = `
<button onClick="app1.handleOpen()">Open</button><br/>
<button onClick="app1.handleSave()">Save</button><br/>
<button onClick="app1.handleApply()">Apply</button><br/>

Width:<br>
<input step="20" id="width" type="number" min="1" value="${this.state.imageSize.width}" onchange="app1.handleResize(this.valueAsNumber, undefined)">

Height:<br/>
<input step="10" id="height" type="number" min="1" value="${this.state.imageSize.height}" onchange="app1.handleResize(undefined, this.valueAsNumber)">

Rotate:<br>
<label><input id="rotate" type="range" value="${this.state.imageRotate}" onchange="app1.handleRotate(this.valueAsNumber)" min="0" max="360"><br/><span id="rotateLabel">${this.state.imageRotate}</span> degrees</label><br/>

<label>Commands: <select onchange="app1.handleCommandChange(this.value)">${this.state.commands.map(c => `<option selected="${this.state.command === c.name}" value="${c.name}">${c.name}</option>`).join('\n    ')}
</select></label>

<label><input id="onMouseMove" type="checkbox" ${this.state.onMouseMove ? 'checked' : ''} onchange="app1.handleOnMouseMove(this.checked)">On Mouse Move</label>

<div id="commandFields">init iee</div>
`
    this.view.loadHTML(html, 'http://localhost')
    this.stateChanged(this.relevantProperties, arrayToObject(this.relevantProperties, s => (this.state as any)[s]))
  }

  stateChanged(names: RP[], s: Partial<State>) {
    const ss = {...s, commands: this.state.commands.map(c=>({...c, command: undefined}))}//name: c.name, fields: c.fields.map(f=>({id: f.id, value: f.value}))}))}
    // const ss = {...s, commands: this.state.commands.map(c=>({name: c.name, fields: c.fields.map(f=>({id: f.id, value: f.value}))}))}
    const toEval = `(${fs})(${JSON.stringify(ss)})`
    // const toEval = `(${fs})(${JSON.stringify(s)})`
    // console.log( toEval);
    this.view.executeJavaScript(toEval, (success, result) => { 
      console.log({success, result});      
    })
  }
}


function f(s: State) {
  try {
    //@ts-ignore
    //  app1.log(JSON.stringify(s))
    //  window.app1.log('seba')
    if( s.imageSize && typeof s.imageSize.width!== 'undefined'){
      document.querySelector<HTMLInputElement>('#width')!.valueAsNumber = s.imageSize.width
    }
     if( s.imageSize && typeof s.imageSize.height!== 'undefined'){
      document.querySelector<HTMLInputElement>('#height')!.valueAsNumber = s.imageSize.height
    }
    if( typeof s.imageRotate !== 'undefined'){
      document.querySelector<HTMLInputElement>('#rotate')!.valueAsNumber = s.imageRotate
      document.querySelector<HTMLInputElement>('#rotateLabel')!.innerHTML = s.imageRotate + ''
    }
  // s.imageSize && s.imageSize.width && (document.querySelector<HTMLInputElement>('#width')!.valueAsNumber = s.imageSize.width)
  // s.imageSize && s.imageSize.width && (document.querySelector<HTMLInputElement>('#height')!.valueAsNumber = s.imageSize.height)
  // typeof s.imageRotate !== 'undefined' && (document.querySelector<HTMLInputElement>('#rotate')!.valueAsNumber = s.imageRotate)
  // typeof s.imageRotate !== 'undefined' && (document.querySelector<HTMLInputElement>('#rotateLabel')!.innerHTML = s.imageRotate + '')
     
  
  if (s.command) {
    const c = s.commands.find(c => c.name === s.command)
    //@ts-ignore
    //  app1.log({c})
    if (c) {
      document.querySelector<HTMLInputElement>('#commandFields')!.innerHTML = `<ul>${c.fields.map(f => `<li><label>${f.id}<input type="text" value="${f.value}"/></label></li>`).join('')}</ul>`
    } else {
      // document.querySelector<HTMLInputElement>('#commandFields')!.innerHTML = `empty1`
    }
  } else {
    // document.querySelector<HTMLInputElement>('#commandFields')!.innerHTML = `empty2`
  }
  } catch (error) {
    //@ts-ignore
  window.app1.log(error +'-\n' )
    return error +'-\n' 
  }
  return 'OK'
}
const fs = f.toString()
