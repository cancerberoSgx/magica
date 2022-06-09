import { shorter } from 'misc-utils-of-mine-generic';
import * as React from 'react';
import { useAppState } from '../state';

let exampleInformation;
export function ExampleInformation() {
  const [state, setState] = useAppState();
  return <div style={{fontSize: '0.8em'}}>
    <p><strong>Effect description</strong>: {shorter(state.selectedExample.description, 50)}</p>
    <p><strong>Effect tags</strong>: {state.selectedExample.tags.join(', ')}</p>
  </div>;
}
