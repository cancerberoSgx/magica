import FileSaver from 'file-saver'
import * as React from 'react'
import { Header, Segment, TextArea } from 'semantic-ui-react'
import { State } from '../../app/state'
import { AbstractComponent } from '../common/component'
import { asDataUrl } from '../common/util'

export class Output extends AbstractComponent {
  // shouldComponentUpdate(nextProps: AbstractProps, nextState: State, nextContext: any) {
  // var output =
  // return this.state.script!=nextState.script || this.state.showAllResultsOutput != nextState.showAllResultsOutput || JSON.stringify(this.getOutput(this.state).map(f => f.name)) != JSON.stringify(this.getOutput(nextState).map(f => f.name))
  // }

  render() {
    if (!this.state.result) {
      return ''
    }
    var output = this.getOutput(this.state)
    return <Segment className="outputSegment">
      <Header as="h3">Output</Header>

      <label><input type="checkbox" checked={this.state.showAllResultsOutput} onChange={e => this.setState({ showAllResultsOutput: e.currentTarget.checked })}></input>Show all commands output files?</label>

      <Segment >
        {output.reverse().map(f =>
          <a key={f.name} href="" onClick={e => {
            var blob = new Blob([f.content])
            FileSaver.saveAs(blob, f.name)
          }}>{f.name}
            <img src={asDataUrl(f)} />
          </a>
        )}
        <div><Header as="h4">stdout</Header>
          <TextArea value={this.state.result.stdout.join('\n')}></TextArea>
        </div>
        <div><Header as="h4">stderr</Header>
          <TextArea value={this.state.result.stderr.join('\n')}></TextArea>
        </div>
      </Segment>
    </Segment>
  }

  private getOutput(s: State) {
    if (!s.result) { return [] }
    return s.showAllResultsOutput ? s.result.results.map(r => r.outputFiles).flat() : s.result.outputFiles
  }
}
