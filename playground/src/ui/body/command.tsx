import * as React from 'react'
import { Button, Checkbox, List, Popup, Segment, TextArea, Header } from 'semantic-ui-react'
import { State } from '../../app/state'
import { Space } from '../common/uiUtil'
import { AbstractComponent } from '../component'
import { main } from '../../app/dispatcher';

export class Command extends AbstractComponent {


  render() {
    return <Segment>
      <Header>{this.state.example.name}</Header>
      <TextArea value={this.state.example.command} onChange={e=>this.setState({example: {...this.state.example, command: e.currentTarget.value}})}></TextArea>
      <Button onClick={e=>{
        main(this.state.example)
      }}>Execute</Button>
    </Segment>
  }

}
