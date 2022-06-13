import * as React from 'react';
import { useAppState } from '../state';
import {AppAlbum, Image} from './Image'
import {File} from 'magica'

/** TODO: add new image, edit image */
export const InputImages = props => {
  const [state, setState] = useAppState();
  const file = state.inputFiles[0]
  // return <img src={state.inputFiles[0]?.asObjectUrl()} />;
  return <div>
      <input type="file" placeholder='foo.jpg' onChange={async (e) => {
      var inputFiles = await File.fromHtmlFileInputElement(e.currentTarget);
      setState({ ...state, inputFiles: [...state.inputFiles, ...inputFiles.filter(f => !state.inputFiles.find(f2 => f2.name == f.name))].reverse() });
    }} />

    <Image file={file} position={0} album={AppAlbum.input}/>
  </div>;
};
