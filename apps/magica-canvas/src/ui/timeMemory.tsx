import * as React from 'react'
import { memoryReport } from '../misc'
import { AbstractComponent } from './component'

export class TimeMemory extends AbstractComponent {
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
      - Time: <span >{this.state.time} ms</span>
      - Memory: <span ref={c => this.memEl = c}></span>
      - Calls: <span >#{this.state.callCounter}</span>
    </>
  }
}
