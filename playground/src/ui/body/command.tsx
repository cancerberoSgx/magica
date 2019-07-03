import * as React from 'react'
import { Button, Header, Segment, TextArea } from 'semantic-ui-react'
import { main } from '../../app/dispatcher'
import { AbstractComponent } from '../common/component'

export class Command extends AbstractComponent {


  render() {
    return <Segment>
      <Header>{this.state.example.name}</Header>
      <TextArea value={this.state.example.command} onChange={e => this.setState({ example: { ...this.state.example, command: e.currentTarget.value } })}></TextArea>
      <br />
      <Button onClick={e => {
        main(this.state.example)
      }}>Execute</Button>
    </Segment>
  }

}
