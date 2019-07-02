import * as React from 'react'
import { Button, Checkbox, List, Popup, Segment, TextArea, Header } from 'semantic-ui-react'
import { State } from '../../app/state'
import { Space, toDataUrl } from '../common/uiUtil'
import { AbstractComponent } from '../component'

export class Output extends AbstractComponent {


  render() {
    return <Segment>
      {this.state.result.outputFiles.map(f=>
       <> <a href="">{f.name}</a>
        <img src={toDataUrl(f)}/>
        </>
      )}
    </Segment>
  }

}
