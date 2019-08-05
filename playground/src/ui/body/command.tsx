import * as React from 'react'
import { Button, Header, Segment, TextArea } from 'semantic-ui-react'
import { setExample } from '../../app/dispatcher'
import { AbstractComponent, AbstractProps } from '../common/component'
import { State } from '../../app/state';

export class Command extends AbstractComponent {

  render() {
    return <Segment>
      <Header>{this.state.example.name}</Header>
      <Header.Content >Description: <span dangerouslySetInnerHTML={{ __html: this.state.example.description }}></span>}</Header.Content>
      <textarea value={this.state.script}
        onChange={e => this.setState({ script: e.currentTarget.value })}
      ></textarea>
      <br />
      <Button onClick={e => setExample()}>Execute</Button>
    </Segment>
  }

}
