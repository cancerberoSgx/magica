import { examples } from 'magica-examples';
import * as React from 'react';
import { ExampleEditor } from '../editor/exampleEditor';
import { execute, setFields, setSelectedExample } from '../handlers';
import { NavBar } from '../probes/NavBar';
import { AppState, useAppState } from '../state';
import { CodeEditor } from './codeEditor';
import { ExampleInformation } from './exampleInformation';
import { ExampleSelection } from './exampleSelection';
import { ExecutedCommands } from './executedCommands';
import { ExecutionResult } from './executionResult';
import { InputImages } from './inputImages';
import { OutputImages } from './outputImages';

export const MainLayout = (props) => {
  const [state, setState] = useAppState()
  
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
    <ExampleInformation/>

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
      <CodeEditor  />
      <ExecutedCommands />
      <ExecutionResult />
    </div>
  </div>
  </>
}


