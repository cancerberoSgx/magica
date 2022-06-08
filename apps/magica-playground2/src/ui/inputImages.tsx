import * as React from 'react';
import { useAppState } from '../state';
import {AppAlbum, Image} from './Image'
/** TODO: add new image, edit image */
export const InputImages = props => {
  const [state, setState] = useAppState();
  const file = state.inputFiles[0]
  // return <img src={state.inputFiles[0]?.asObjectUrl()} />;
  return <Image file={file} position={0} album={AppAlbum.input}/>;
};
