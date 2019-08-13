import * as React from 'react'
import { dispatchFieldChange } from '../app/dispatch'
import { AbstractComponent } from './component'

export class Fields extends AbstractComponent {
  render() {
    if (Object.values(this.state.fields).length == 0) {
      return ''
    }
    return <>
      <h3>Fields</h3>
      <ul>
        {Object.values(this.state.fields).map(f => <li key={f.id}>
          <label>{f.id}<input value={f.value} onChange={e => dispatchFieldChange({ id: f.id, value: e.currentTarget.value })}
          ></input></label>
        </li>)}
      </ul>
    </>
  }

}
