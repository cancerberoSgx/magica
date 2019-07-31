import * as React from 'react'
import { Button, Header, Segment, TextArea } from 'semantic-ui-react'
import { setExample } from '../../app/dispatcher'
import { AbstractComponent } from '../common/component'

export class Command extends AbstractComponent {


  render() {
    return <Segment>
      <Header>{this.state.example.name}</Header>
      <TextArea value={this.state.script} onChange={e => this.setStateSilently({ script: e.currentTarget.value })}></TextArea>
      <br />
      <Button onClick={e => {
        setExample()
      }}>Execute</Button>
    </Segment>
  }

}
