import * as React from 'react';
import { useAppState } from '../state';

let exampleInformation;
export function ExampleInformation() {
  const [state, setState] = useAppState();
  return <div style={{fontSize: '0.9em'}}>
    <p><strong>Effect description</strong>: {state.selectedExample.description}</p>
    <p><strong>Effect tags</strong>: {state.selectedExample.tags.join(', ')}</p>
  </div>;
}
