import FileSaver from 'file-saver'
import { File } from 'magica'
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
      <Input type="file" label='file' placeholder='foo.jpg' onChange={async e => {
        var inputFiles = await File.fromHtmlFileInputElement(e.currentTarget)
        inputFiles = [...this.state.inputFiles, ...inputFiles.filter(f => !this.state.inputFiles.find(f2 => f2.name == f.name))].reverse()
        this.setState({ inputFiles })
      }} /><br /><br />
      <Header as="h5">Current files</Header>
      <List relaxed>
        {this.state.inputFiles.map(f =>
          <List.Item key={f.name}>
            <List.Content>
              <List.Header><a href="" onClick={e => {
                var blob = new Blob([f.content])
                FileSaver.saveAs(blob, f.name)
              }}>{f.name}</a></List.Header>
              <List.Description as='a'>{f.content.byteLength} bytes</List.Description>
            </List.Content>
          </List.Item>
        )}
      </List>
    </Segment>
  }

}
