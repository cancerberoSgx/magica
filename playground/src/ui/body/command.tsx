import * as React from 'react'
import { Button, Header, Segment, TextArea } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { callRun } from '../../app/workerAccess';

export class Command extends AbstractComponent {


  render() {
    return <Segment>
      <Header>{this.state.example.name}</Header>
      <TextArea value={this.state.script} onChange={e => this.setState({ ...this.state, script:e.currentTarget.value})}></TextArea>
      <br />
      <Button onClick={e => {
        callRun({...this.state.example, ...this.state})
      }}>Execute</Button>
    </Segment>
  }

}
