import * as React from 'react'
import { AbstractComponent } from './component'

export class About extends AbstractComponent {

  render() {
    return <div>
      <button onClick={e => document.querySelector('.modal-window')!.classList.remove('hidden')}>About</button>

      <div id="open-modal" className="modal-window hidden">
        <div>
          <button title="Close" className="modal-close"
            onClick={e => document.querySelector('.modal-window')!.classList.add('hidden')}>Close</button>
          <h3>Magica real-time canvas demo</h3>
          <p>Select one command example and click the image. See how fast ImageMagick can be...</p>
        </div>
      </div>

    </div>
  }
}
