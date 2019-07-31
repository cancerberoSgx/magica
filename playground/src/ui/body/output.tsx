import FileSaver from 'file-saver'
import { toDataUrl } from 'magica'
import * as React from 'react'
import { Header, Segment, TextArea } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'

export class Output extends AbstractComponent {
  render() {
    if (!this.state.result) {
      return ''
    }
    var output = this.state.showAllResultsOutput ? this.state.result.results.map(r => r.outputFiles).flat() : this.state.result.outputFiles
    return <>
      <label><input type="checkbox" checked={this.state.showAllResultsOutput} onChange={e => this.setState({ showAllResultsOutput: e.currentTarget.checked })}></input>Show all commands output files?</label>

      <Segment>

        {output.reverse().map(f =>
          <> <a href="" onClick={e => {
            var blob = new Blob([f.content])
            FileSaver.saveAs(blob, f.name)
          }}>{f.name}
            <img src={toDataUrl(f)} />
          </a>
          </>)}
        <div><Header as="h4">stdout</Header>
          <TextArea value={this.state.result.stdout.join('\n')}></TextArea>
        </div>
        <div><Header as="h4">stderr</Header>
          <TextArea value={this.state.result.stderr.join('\n')}></TextArea>
        </div>
      </Segment>
    </>
  }
}
