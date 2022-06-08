import * as React from 'react';
import { setScript } from '../handlers';
import { useAppState } from '../state';

interface Props {
}
export function CodeEditor(props: Props) {
  const [state, setState] = useAppState();
  
  return <textarea style={{ width: '100%', height: '200px' }}
    value={state.selectedExample.script}
    onChange={e => {
      setScript(e.target.value)
    }}></textarea>;
}
