import * as React from 'react';
import { useAppState } from '../state';

export function ExecutionResult() {
  const [state, setState] = useAppState();
  return <div>
    stdout
    <code>
      {state.executionResults?.stdout.join('\n')}
    </code>
    <br />
    stderr
    <code>
      {state.executionResults?.stderr.join('\n')}
    </code>
  </div>;
}
