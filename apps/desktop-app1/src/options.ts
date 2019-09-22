import * as gui from 'gui'
import { arrayToObject, throttle, enumKeys } from 'misc-utils-of-mine-generic'
import { CommonProps, StateComponent } from "./abstractComponent"
import { ImageHandler } from './imageHandler'
import { State } from './state'
import { darkTheme, lightTheme } from './styles'
import { imList } from 'magica'

type RP = 'imageRotate' | 'imageSize' | 'command' | 'fields'|'theme'|'autoApply'

export class Options extends StateComponent<CommonProps> {

  protected view: gui.Browser = null as any;
  protected handler: ImageHandler = null as any
  relevantProperties: RP[] = ['imageRotate', 'imageSize', 'command', 'fields', 'theme', 'theme']

  render() {
    this.handler = new ImageHandler(this.props.win)
    this.view = gui.Browser.create({ devtools: true })
    this.view.setStyle({ width: '100%', height: '100%', flex: 1 })
    this.view.setBindingName('app1')
    this.view.addBinding('handleRotate', value => this.handler.handleRotate(value))
    // this.view.addBinding('handleOpen', () => this.handler.handleOpen())
    // this.view.addBinding('handleSave', () => this.handler.handleSave())
    this.view.addBinding('handleApply', () => this.handler.handleApply())
    this.view.addBinding('handleResize', (width, height) => this.handler.handleResize(width, height))
    this.view.addBinding('handleOnMouseMove', value => this.handler.handleOnMouseMove(value))
    this.view.addBinding('handleCommandChange', value => this.handleCommandChange(value))
    this.view.addBinding('handleFieldChange', (id, value) => this.handleFieldChange(id, value))
    // this.view.addBinding('handleSelectDarkTheme', v => this.handleSelectDarkTheme(v ))
    this.view.addBinding('setState', s => this.setState(s))
    this.view.addBinding('log', s => this.handleLog(s))
    this.renderOptions()
    return this.view
  }

//  protected handleSelectDarkTheme(v:boolean){
//     this.setState({ theme: v ? darkTheme : lightTheme})
//   }

 protected handleFieldChange(id: string, value: string): any {
    this.setState({ fields: [...this.state.fields.filter(f => f.id !== id), { ... this.state.fields.find(f => f.id === id)!, value: value }] })
  }

  protected handleLog(s: string) {
    console.log('Browser log', s);
  }

  protected handleCommandChange(value: string) {
    this.setState({ 
      command: value, 
      fields: this.state.commands.find(c => c.name === value)!.fields 
    })
  }

  protected renderOptions() {
    const html = `
 <section>
  <h5>General</h5>
<button onClick="app1.handleApply()" ${this.state.autoApply ? 'disabled' : ''}>Apply</button> 
  <label><input id="autoApply" type="checkbox" ${this.state.autoApply ? 'checked' : ''} onchange="app1.setState({autoApply: this.checked})">Auto Apply</label> <br/>
   <label>Virtual Pixel: <select onChange="app1.setState({virtualPixel: this.value})">${enumKeys(imList.VirtualPixel).map(g=>`<option option="${g}">${g}</option>`)}</select></label>
     <label>Rendered format:  <input type="text" value="${this.state.renderedFormat}" onchange="app1.setState({renderedFormat: this.value})" ></label><br/>
</section>

<section>
  <label>Width: 
  <input step="20" id="width" type="number" min="1" value="${this.state.imageSize.width}" onchange="app1.handleResize(this.valueAsNumber, undefined)"></label>  <br/>
  <label>Height: <input step="10" id="height" type="number" min="1" value="${this.state.imageSize.height}" onchange="app1.handleResize(undefined, this.valueAsNumber)"></label>  <br/>
  <label>Offset X: 
  <input step="20" id="offsetX" type="number" min="1" value="${this.state.imageOffset.x}" onchange="app1.handleTranslate(this.valueAsNumber, undefined)"></label>  <br/>
  <label>Offset Y: 
  <input step="10" id="offsetY" type="number" min="1" value="${this.state.imageOffset.y}" onchange="app1.handleTranslate(undefined, this.valueAsNumber)"></label>
  <label>Padding Y: 
  <input step="20" id="paddingX" type="number" min="1" value="${this.state.padding.x}" onchange="app1.handlePadding(this.valueAsNumber, undefined)"></label>  <br/>
  <label>Padding Y: 
  <input step="10" id="paddingY" type="number" min="1" value="${this.state.padding.y}" onchange="app1.handlePadding(undefined, this.valueAsNumber)"></label>

</section>

<section>
  <h5>Rotate</h5>
  <label>Rotate: <input id="rotate" type="range" value="${this.state.imageRotate}" onchange="app1.handleRotate(this.valueAsNumber)" min="0" max="360"></label><br/>
  <span id="rotateLabel">${this.state.imageRotate} </span> Degrees<br/>
  <label>Gravity: <select onChange="app1.setState({gravity: this.value})">${enumKeys(imList.Gravity).map(g=>`<option option="${g}">${g}</option>`)}</select></label><br/>
  <label><input id="rotatePreserveSize" type="checkbox" ${this.state.rotatePreserveSize ? 'checked' : ''} onchange="app1.setState({rotatePreserveSize: this.checked})">Preserve Size</label>
</section>

<section>
  <h5>Region Effects</h5>
  <label>Commands: <br/><select onchange="app1.handleCommandChange(this.value)">${this.state.commands.map(c => `<option selected="${this.state.command === c.name}" value="${c.name}">${c.name}</option>`).join('\n    ')}
  </select></label><br/>
  <label><input id="onMouseMove" type="checkbox" ${this.state.onMouseMove ? 'checked' : ''} onchange="app1.handleOnMouseMove(this.checked)">On Mouse Move</label> <br/>
  <div id="commandFields"></div>
</section>

<style>
  #commandFields ul, #commandFields li {
    margin: 0;
    padding: 0;
  }
  label, span, div, body {
    font-size: 0.8em;
  }
  h5 {
    font-size: 1em;
    padding: 0;
    margin: 0;
    margin-top:0.2em;
  }
  input[type="number"] {
    width: 70px;
    display:inline;
  }
  input {
    border-color: var(--fg);
  }
  :root {
    --bg: ${this.state.theme.bg};
    --fg: ${this.state.theme.fg};
  }
  body, body * {
    background-color: var(--bg);
    color: var(--fg);
  }
</style>
`
    this.view.loadHTML(html, 'http://localhost')
    this.stateChanged(this.relevantProperties, arrayToObject(this.relevantProperties, s => (this.state as any)[s]))
  }

  stateChanged: (names: RP[], s: Partial<State>) => void = throttle((names: RP[], s: Partial<State>) => {
    const ss = { ...s, commands: this.state.commands.map(c => ({ ...c, command: undefined })) }
    const toEval = `(${fs})(${JSON.stringify(ss)})`
    this.view.executeJavaScript(toEval, (success, result) => {
      if (result !== 'OK') {
        console.log({ success, result });
      }
    })
  }, 500, { trailing: true })
}

function f(s: State) {
  try {
    if (s.imageSize && typeof s.imageSize.width !== 'undefined') {
      document.querySelector<HTMLInputElement>('#width')!.valueAsNumber = s.imageSize.width
    }
    if (s.imageSize && typeof s.imageSize.height !== 'undefined') {
      document.querySelector<HTMLInputElement>('#height')!.valueAsNumber = s.imageSize.height
    }
    if (typeof s.imageRotate !== 'undefined') {
      document.querySelector<HTMLInputElement>('#rotate')!.valueAsNumber = s.imageRotate
      document.querySelector<HTMLInputElement>('#rotateLabel')!.innerHTML = s.imageRotate + ''
    }
    if (s.fields && s.fields.length) {
      document.querySelector<HTMLInputElement>('#commandFields')!.innerHTML = `<ul>${s.fields.map(f => `<li><label>${f.id}:<br><input type="${f.type || 'text'}" onChange="app1.handleFieldChange('${f.id}', this.value)" value="${f.value}"/></label></li>`).join('')}</ul>`
    }
    if(s.theme){
      const root = document.documentElement 
      root.style.setProperty('--bg', s.theme.bg)
      root.style.setProperty('--fg', s.theme.fg)
    }
  } catch (error) {
    (window as any).app1.log(error + '-\n')
    return error + '-\n'
  }
  return 'OK'
}
const fs = f.toString()
