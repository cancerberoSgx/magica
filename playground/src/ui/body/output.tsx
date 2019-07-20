import FileSaver from 'file-saver'
import { toDataUrl } from 'magica'
import * as React from 'react'
import { Header, Segment, TextArea } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'

export class Output extends AbstractComponent {
  render() {
    return <Segment>
      {this.state.result.outputFiles ? this.state.result.outputFiles.map(f =>
        <> <a href="" onClick={e => {
          var blob = new Blob([f.content])
          FileSaver.saveAs(blob, f.name)
        }}>{f.name}
          <img src={toDataUrl(f)} />
        </a>
        </>) : []}
      <div><Header as="h4">stdout</Header>
        <TextArea value={this.state.result.stdout.join('\n')}></TextArea>
      </div>
      <div><Header as="h4">stderr</Header>
        <TextArea value={this.state.result.stderr.join('\n')}></TextArea>
      </div>
    </Segment>
  }
}
