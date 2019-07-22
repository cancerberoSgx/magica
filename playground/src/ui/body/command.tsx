import * as React from 'react'
import { Button, Header, Segment, TextArea } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { callRun } from '../../app/workerAccess';
import { setExample } from '../../app/dispatcher';

export class Command extends AbstractComponent {


  render() {
    return <Segment>
      <Header>{this.state.example.name}</Header>
      <TextArea value={this.state.script} onChange={e => this.setState({ script:e.currentTarget.value})}></TextArea>
      <br />
      <Button onClick={e => {
        setExample()
      }}>Execute</Button>
    </Segment>
  }

}
