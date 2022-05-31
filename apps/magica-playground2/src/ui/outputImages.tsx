import * as React from 'react';
import { useAppState } from '../state';

export const OutputImages = props => {
  const [state, setState] = useAppState();
  return <img src={state.outputFiles[0]} />;
};
