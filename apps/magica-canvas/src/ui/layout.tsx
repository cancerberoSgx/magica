import * as React from 'react'
import { commands } from '../app/commands'
import { dispatchCommandSelected } from '../app/dispatch'
import { About } from './about'
import { AbstractComponent } from './component'
import { Fields } from './fields'
import { Input } from './input'
import { TimeMemory } from './timeMemory'

export class Layout extends AbstractComponent {

  render() {
    return <>
      <About />
      <select onChange={e => dispatchCommandSelected(e.currentTarget.value)}>{commands.map(c =>
        <option selected={c.name === this.state.command.name} key={c.name} value={c.name}>{c.name}</option>)}
      </select>
      <div id="command">{this.state.commandString}</div>

      <Fields />

      <Input /><br />
      <TimeMemory />

      <div >{this.state.stderr.map(s => <span>{s}</span>)}</div>
      <br />


    </>
  }
}
