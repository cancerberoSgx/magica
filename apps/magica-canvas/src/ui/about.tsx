import * as React from 'react'
import './about.css'
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
          <p>Welcome to [Magica](https://github.com/cancerberoSgx/magica) real-time canvas demo. The idea is to see how fast ImageMagick in the browser can run to simulate real-time like experiences. Select one command example and move the mouse over the image. </p>
        </div>
      </div>

    </div>
  }
}
