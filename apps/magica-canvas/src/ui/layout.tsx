import * as React from 'react'
import { About } from './about'
import { Command } from './command'
import { AbstractComponent } from './component'
import { Fields } from './fields'
import { Input } from './input'
import { TimeMemory } from './timeMemory'

export class Layout extends AbstractComponent {

  render() {
    return <div className="content">
      <About />
      <Command />
      <Fields />
      <Input /><br />
      <TimeMemory />
      <div >{this.state.stderr.map(s => <span>{s}</span>)}</div>
    </div>
  }
}
