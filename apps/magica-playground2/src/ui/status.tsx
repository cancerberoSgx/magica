import { printMs } from 'misc-utils-of-mine-generic';
import * as React from 'react';
import { setScript } from '../handlers';
import { useAppState } from '../state';

interface Props {
  className?: string
}
export function Status(props: Props) {
  const [state, setState] = useAppState();
  return <div className={props.className || ''} 
    style={{ minWidth: '60px'
    // , fontSize: '0.8em', lineHeight: '0.8em' 
    }}>
    {/* <div>Status:</div> */}
    {/* <div> */}
      {state.execution.status === 'working' ? <progress className="progress is-small is-primary" max="100">15%</progress> :
        <span style={{fontSize: '0.8em'}}>{printMs(state.execution.time)}</span>}
    {/* </div> */}
  </div>
  // if(state.execution.status === 'working') {
  //   return 
  // }
  // return <div>
  //   Time: {printMs(state.execution.time)}
  // </div>;
}
