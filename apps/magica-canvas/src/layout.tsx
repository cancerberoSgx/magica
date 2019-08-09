import * as React from 'react'
import { commands } from './commands';
import { change } from './change';
import { AbstractComponent } from './component';
import { getStore } from './store';

export class Layout extends AbstractComponent {
  render() {
    return <>
      <p>Select one command example and click the image. See how fast ImageMagick can be...</p>
      <select onChange={e => { this.setState({ command: commands.find(c => c.name === e.currentTarget.value)! }) }}>
        {commands.map(c => 
        <option selected={c.name===this.state.command.name} key={c.name} value={c.name}>{c.name}</option>
        )}
      </select>
      <span id="time">{this.state.time}</span><span id="command">{this.state.commandString}</span>
      <br />
      <label><input type="checkbox" checked={this.state.onMouseMove} 
        onChange={e => { this.setState({ onMouseMove: !this.state.onMouseMove }) }}/>on mouse move</label>
    </>
  }
}

export const Canvas = () => <canvas id="canvas" width="600" height="600" 
onMouseMove={e=>dispatchCanvasMouseMove(e.nativeEvent. layerX, e.nativeEvent.layerY)}
  onClick={e => change(e.nativeEvent. layerX, e.nativeEvent.layerY)}></canvas>

function dispatchCanvasMouseMove(x:number,y:number){
  var s = getStore().getState()
  if(!s.working && s.onMouseMove){
    change(x,y)
  }
}