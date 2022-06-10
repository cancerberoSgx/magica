import { Example, examples } from 'magica-examples';
import * as React from 'react';
import { setSelectedExample } from '../handlers';
import { useAppState } from '../state';
import { ExampleInformation } from './exampleInformation';
import { Tip } from './tip';

interface ExampleSelectionEvent {
  selection: Example
}
interface ExampleSelectionProps {
  onChange: (e: ExampleSelectionEvent)=>void
}
export const ExampleSelection = (props: ExampleSelectionProps) => {
  const [state, setState] = useAppState()

  return <div className="field has-addons">
    <select className="select" defaultValue={state.selectedExample.name} onChange={e => {
      const selection= state.examples.find(example => example.name === e.target.value)
      props.onChange({selection})
    }}>
      {state.examples.map(example =>
        <option key={example.name} 
        value={example.name}>{example.name}</option>
      )}
    </select>

    <div className="control">
        <Tip className="is-right">
          <ExampleInformation/>
          </Tip>
      </div>
  </div>
}

export const ExamplesSelectionTest = (props) => {
  const [state, setState] = useAppState()
  return <div>
    <ExampleSelection onChange={e=>{
      setSelectedExample(e.selection)
    }}/>
  </div>
}


