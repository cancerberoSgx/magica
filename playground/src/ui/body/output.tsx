import * as React from 'react'
import { Button, Checkbox, List, Popup, Segment, TextArea, Header } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { toDataUrl } from 'magica'

export class Output extends AbstractComponent {
  render() {
    return <Segment>
      {this.state.result.outputFiles ? this.state.result.outputFiles.map(f =>
        <> <a href="">{f.name}
          <img src={toDataUrl(f)} />
        </a>
        </>) : []}
      <div><Header as="h4">stdout</Header>
        <TextArea value={this.state.result.stdout.join('\n')}></TextArea>
      </div>
      <div><Header as="h4">stderr</Header>
        <TextArea value={this.state.result.stderr.join('\n')}></TextArea>
      </div>
      )}
    </Segment>
  }

}
