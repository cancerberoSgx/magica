import * as React from 'react'
import { Header, List, ListItem, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'

export class Fields extends AbstractComponent {

  render() {
    if (this.state.fields.length == 0) {
      return ''
    }
    return <Segment>
      <Header>Fields</Header>
      <List>
        {this.state.fields.map(f => <ListItem key={f.id}>
          <label>{f.id}<input value={f.value} onChange={e => this.setState({
            fields: [
              ...this.state.fields.filter(f2 => f2.id != f.id),
              { ...this.state.fields.find(f2 => f2.id == f.id)!, value: e.currentTarget.value }
            ]
          })}
          ></input></label>
        </ListItem>)}
      </List>
    </Segment>
  }

}
