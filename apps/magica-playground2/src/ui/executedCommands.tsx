import * as React from 'react';
import { useAppState } from '../state';

export function ExecutedCommands(props) {
  const [state, setState] = useAppState();
  return <div>
    <h6>Executed Commands:</h6>
    <code>{state.executionResults?.commands.map((command, i) => <div key={i}>{command.join(' ')}</div>)}</code>
  </div>;
}
