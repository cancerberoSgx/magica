import * as React from 'react'
import { AbstractComponent } from './component'

export class About extends AbstractComponent {

  render() {
    return (
      <div>
        <button className="button" onClick={e => document.querySelector('.modal')!.classList.add('is-active')}>About</button>
     

        <div className="modal">
  <div className="modal-background" onClick={this.hide}></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Magica - ImageMagick - real-time browser demo</p>
      <button className="delete button" aria-label="close" onClick={this.hide}></button>
    </header>
    <section className="modal-card-body">
      <p>Welcome to <a href="https://github.com/cancerberoSgx/magica">Magica</a> real-time canvas demo. The idea is to see how fast ImageMagick in the browser can run to simulate real-time like experiences. Select one command example and move the mouse over the image. </p>
      <p>Current Image Magick <code>convert -version</code> output is:</p>
      <pre>{this.state.imageMagickVersion}</pre>
    </section>
    <footer className="modal-card-foot">
      <button className="button"onClick={this.hide}>Close</button>
    </footer>
  </div>
</div>


      
      {/* <div id="open-modal" className="modal-window hidden">
      <div>
      <button title="Close" className="modal-close"
      onClick={e => document.querySelector('.modal-window')!.classList.add('hidden')}>Close</button>
      <h3>Magica real-time canvas demo</h3>
      <p>Welcome to [Magica](https://github.com/cancerberoSgx/magica) real-time canvas demo. The idea is to see how fast ImageMagick in the browser can run to simulate real-time like experiences. Select one command example and move the mouse over the image. </p>
      </div>
      </div>   */}
      
      {/* <div className="modal">
      <button className="modal-close is-large" aria-label="close" onClick={this.hide}></button>
      <div className="modal-background" onClick={this.hide}></div>
      <div className="modal-content content">
      <h3 className="title">Magica real-time canvas demo</h3>
      <p>Welcome to [Magica](https://github.com/cancerberoSgx/magica) real-time canvas demo. The idea is to see how fast ImageMagick in the browser can run to simulate real-time like experiences. Select one command example and move the mouse over the image. </p>
      </div>
      </div> */}
      </div>

    )
  }

  private hide(): void {
    return document.querySelector('.modal')!.classList.remove('is-active');
  }
}
