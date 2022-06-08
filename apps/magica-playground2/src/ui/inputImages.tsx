import * as React from 'react';
import { useAppState } from '../state';

/** TODO: add new image, edit image */
export const InputImages = props => {
  const [state, setState] = useAppState();
  return <img src={state.inputFiles[0]?.asObjectUrl()} />;
};
