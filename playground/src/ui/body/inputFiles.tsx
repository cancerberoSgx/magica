import * as React from 'react'
import { Header, Input, List, Segment } from 'semantic-ui-react'
import { loadImageFromUrl } from '../../app/dispatcher'
import { AbstractComponent } from '../common/component'

export class InputFiles extends AbstractComponent {
  render() {
    return <Segment>
      <Header as="h3">Input Images</Header>
      <div>Load or declare images from local file system and URLs here:</div><br />
      <Input label='URL' onChange={e => loadImageFromUrl(e.currentTarget.value)} placeholder='https://i.imgur.com/FVKBIJ7.png' /><br /><br />
      <Input type="file" label='file' placeholder='foo.jpg' /><br /><br />
      <Header as="h5">Current files</Header>
      <List divided relaxed>
        {this.state.inputFiles.map(f =>
          <List.Item>
            <List.Content>
              <List.Header as='a'>{f.name}</List.Header>
              <List.Description as='a'>{f.content.byteLength} bytes</List.Description>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  }

}
