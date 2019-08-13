import * as React from 'react'
import { memoryReport } from '../util/misc'
import { AbstractComponent } from './component'
import { warmUp } from '../app/dispatch';

export class TimeMemory extends AbstractComponent {
  timer: NodeJS.Timeout | undefined
  warmupInputEl: HTMLInputElement | null=null

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
      - Time: <span >{this.state.time}</span><br/>
      - Memory: <span ref={c => this.memEl = c}></span><br/>
      - Calls: <span >#{this.state.callCounter}</span><br/>
      <div className="field has-addons small">
  <div className="control">
    <input className="input" type="number" value={this.state.warmUpIterations} ref={c=>this.warmupInputEl = c} onChange={e=>this.setState({warmUpIterations: e.currentTarget.valueAsNumber})}/>
  </div>
  <div className="control">
    <a className="button is-info"title="I've noticed that after 90 calls some operations get much faster. This button will change the image aprox. 50 times randomly with this objective." onClick={e => warmUp(this.warmupInputEl!.valueAsNumber)}>Warm up
    </a>
    < >{this.state.warmUpTime ? <div>Time (mean): {this.state.warmUpTime}</div>: ''}</>
  </div>
  
</div>

      {/* <button title="I've noticed that after 90 calls some operations get much faster. This button will change the image aprox. 50 times randomly with this objective." onClick={e => warmUp(50)}>Warm up</button> */}
    </>
  }
}
