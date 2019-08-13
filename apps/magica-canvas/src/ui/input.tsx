import * as React from 'react'
import { handleFileInputChange, handleSetVideoEnable, warmUp } from '../app/dispatch'
import { setVideoEnable } from '../video'
import { AbstractComponent } from './component'

export class Input extends AbstractComponent {

  render() {
    return <>
      <label><input type="file" accept="image/*" onChange={e => handleFileInputChange(e.currentTarget)} /></label>

      <label><input type="checkbox" checked={this.state.video} onChange={async e => handleSetVideoEnable(!this.state.video)} /> video?</label>

      <button title=" " onClick={e => setVideoEnable('takePhoto')}>Take photo</button>

      <br />
      <label><input type="checkbox" checked={this.state.onMouseMove}
        onChange={e => { this.setState({ onMouseMove: !this.state.onMouseMove }) }} />on mouse move?</label>

      <button title="I've noticed that after 90 calls some operations get much faster. This button will change the image aprox. 50 times randomly with this objective." onClick={e => warmUp(50)}>Warm up</button>
    </>
  }
}
