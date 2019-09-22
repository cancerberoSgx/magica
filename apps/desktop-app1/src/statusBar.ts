import * as gui from 'gui'
import { printMs } from 'misc-utils-of-mine-generic'
import { StateComponent } from './abstractComponent'
import { State } from './state'

type RP = 'working' | 'time'

export class StatusBar extends StateComponent {
  protected view: gui.Container = null as any;
  protected relevantProperties: RP[] = ['working', 'time']
  protected working: gui.Label = null as any;
  protected time: gui.Label = null as any;
  protected memory: gui.Label = null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({ width: '100%', minHeight: 44, flex: 1, alignContent: 'baseline', flexDirection: 'row' })
    this.working = gui.Label.create(this.state.working || '')
    this.working.setStyle({ flexDirection: 'column' })
    this.view.addChildView(this.working)
    this.time = gui.Label.create(printMs(this.state.time) || '')
    this.time.setStyle({ flexDirection: 'column' })
    this.view.addChildView(this.time)
    this.memory = gui.Label.create((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' mb')
    this.memory.setStyle({ flexDirection: 'column' })
    this.view.addChildView(this.memory)
    this.stateChanged([], {})
    return this.view
  }

  protected stateChanged(names: RP[], s: Partial<State>) {
    s.working && this.working.setBackgroundColor('#ed2266')
    !s.working && this.working.setBackgroundColor('#ededed')
    this.working.setText(s.working || 'Idle')
    this.working.setText(printMs(this.state.time) || '')
    this.memory.setText((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' mb')
  }
}
