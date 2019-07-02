import * as React from 'react'
import { Button, Checkbox, List, Popup, Segment, TextArea, Header } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { toDataUrl } from 'magica';

export class Input extends AbstractComponent {
  render() {
    return <Segment>
       <List divided relaxed>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>Updated 10 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
        <List.Description as='a'>Updated 22 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
        <List.Description as='a'>Updated 34 mins ago</List.Description>
      </List.Content>
    </List.Item>
  </List>
      {this.state.inputFile.map(f=>
       <> <a href="">{f.name}</a>
        <img src={toDataUrl(f)}/>
        </>
      )}
    </Segment>
  }

}
