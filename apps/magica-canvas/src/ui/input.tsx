import * as React from 'react'
import { handleFileInputChange, handleSetVideoEnable } from '../app/dispatch'
import { setVideoEnable } from '../util/video'
import { AbstractComponent } from './component'

export class Input extends AbstractComponent {

  render() {
    return <>
      <h3>Settings &amp; Input</h3>
      <label className="checkbox"><input type="checkbox" checked={this.state.onMouseMove}
        onChange={e => this.setState({ onMouseMove: !this.state.onMouseMove })} />on mouse move?</label>
      <br />

      <div className="file has-name ">
        <label className="file-label">
          <input className="file-input" type="file" name="input-file" accept="image/*" onChange={e => handleFileInputChange(e.currentTarget)} />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Load Image File...
      </span>
          </span>
          <span className="file-name">
            {this.state.inputFile && this.state.inputFile.name}
          </span>
        </label>
      </div>
      <label className="checkbox"><input type="checkbox" checked={this.state.video} onChange={async e => handleSetVideoEnable(!this.state.video)} />Record Video?</label>
      <br />

      <button title="Take a single picture using the webcam" className="button small" onClick={e => setVideoEnable('takePhoto')}>Take Photo</button>
    </>
  }
}
