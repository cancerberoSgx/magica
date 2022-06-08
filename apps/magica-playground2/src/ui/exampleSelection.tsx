import { Example, examples } from 'magica-examples';
import * as React from 'react';
import { setSelectedExample } from '../handlers';
import { useAppState } from '../state';

interface ExampleSelectionEvent {
  selection: Example
}
interface ExampleSelectionProps {
  onChange: (e: ExampleSelectionEvent)=>void
}
export const ExampleSelection = (props: ExampleSelectionProps) => {
  const [state, setState] = useAppState()

  return <div>
    <select className="select" defaultValue={examples.name} onChange={e => {
      const selection= state.examples.find(example => example.name === e.target.value)
      props.onChange({selection})
    }}>
      {state.examples.map(example =>
        <option key={example.name} 
        value={example.name}>{example.name}</option>
      )}
    </select>

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


