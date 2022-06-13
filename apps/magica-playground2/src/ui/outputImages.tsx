import * as React from 'react';
import { useAppState } from '../state';
import { AppAlbum, Image } from './Image'

export const OutputImages = props => {
  const [state, setState] = useAppState();
  return (
    // <Image file={state.outputFiles[0]} position={0} album={AppAlbum.input}/>
    <img src={state.outputFiles[0]} />
  )
};
