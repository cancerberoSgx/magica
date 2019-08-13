import * as React from 'react'
import { commands } from '../app/commands'
import { dispatchCommandSelected } from '../app/dispatch'
import { AbstractComponent } from './component'

export class Command extends AbstractComponent {

  render() {
    return <div>
      <h3>Command Examples</h3>

      <select className="select" onChange={e => dispatchCommandSelected(e.currentTarget.value)}>{commands.map(c =>
        <option selected={c.name === this.state.command.name} key={c.name} value={c.name}>{c.name}</option>)}
      </select>
      <div id="command">{this.state.commandString}</div>

    </div>
  }
}
