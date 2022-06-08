import { examples } from 'magica-examples';
import * as React from 'react';
import { ExampleEditor } from '../editor/exampleEditor';
import { execute, setFields, setSelectedExample } from '../handlers';
import { NavBar } from '../probes/NavBar';
import { AppState, useAppState } from '../state';
import { CodeEditor } from './codeEditor';
import { ExampleSelection } from './exampleSelection';
import { InputImages } from './inputImages';
import { OutputImages } from './outputImages';

export const MainLayout = (props) => {
  const [state, setState] = useAppState()
  const box = { border: '1px solid pink', height: '200px' }

  return <>
  <NavBar/>
  <div className="columns">
    <div className="column is-two-thirds">
        <h3>Input Images</h3>
        <InputImages />
    </div>
    <div className="column">
        <h3>Effects</h3>
        <ExampleSelection onChange={e=>{
          setSelectedExample(e.selection)
        }} />
      </div>
  </div>
  <div className="columns">
    <div className="column is-two-thirds">
        <h3>Output</h3>
        <OutputImages/>
    </div>
    <div className="column">
      <ExampleEditor example={state.selectedExample} onChange={e=> {
          console.log('editor changed', e);
          setFields(e.newValues)
        } } />
      <button className="button is-primary is-small" onClick={e=>execute()}>Apply</button>
      <h4>Code:</h4>
      <CodeEditor value={state.selectedExample.script}/>
    </div>
  </div>
  </>
}


