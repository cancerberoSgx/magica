import * as React from 'react'
import { commands, Command } from './commands'
import { AbstractComponent } from './component'
import { Fields } from './fields';
import { memoryReport } from './misc';
import { dispatchCommandSelected, dispatchCanvasMouseMove, handleFileInputChange } from './dispatch';
import { setVideoEnable } from './video';

export class Layout extends AbstractComponent {
  timer: NodeJS.Timeout | undefined

  componentDidMount() {
    this.timer = setInterval(() => this.updateMem(), 1000)
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  updateMem(): void {
    if (this.memEl) {
      this.memEl.innerHTML = memoryReport().usedMb + ' ' + memoryReport().percent
    }
  }

  memEl: HTMLElement | null = null;

  render() {
    return <> 
        <p>Select one command example and click the image. See how fast ImageMagick can be...</p>
      <select onChange={e => dispatchCommandSelected(e.currentTarget.value)}>
        {commands.map(c =>
          <option selected={c.name === this.state.command.name} key={c.name} value={c.name}>{c.name}</option>
        )}
      </select>
      <label><input type="file" onChange={e=>handleFileInputChange(e.currentTarget)}></input></label>
      <label><input type="checkbox" checked={this.state.video} onChange={async e=>{
        await setVideoEnable(!this.state.video)
        this.setState({video: !this.state.video})
      }}></input> video</label>
      - Time: <span id="time">{this.state.time}</span> - Memory: <span ref={c => this.memEl = c}></span>
      <div >{this.state.commandString}</div>
      <div >{this.state.stderr.map(s => <span>{s}</span>)}</div>
      <br />
      <label><input type="checkbox" checked={this.state.onMouseMove}
        onChange={e => { this.setState({ onMouseMove: !this.state.onMouseMove }) }} />on mouse move</label>
      <Fields />
    <br/>
    </>
  }
}