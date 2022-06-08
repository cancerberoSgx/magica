import * as React from 'react';
import { useAppState } from '../state';

interface Props {
  value: string;
}
export function CodeEditor(props: Props) {
  const [state, setState] = useAppState();
  const [value, setValue] = React.useState(props.value);
  return <textarea style={{ width: '100%', height: '200px' }}
    value={value}
    onChange={e => {
      console.log(e.target.value);
      setValue(e.target.value)
    }}></textarea>;
}
