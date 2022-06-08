import * as React from 'react';
import { useAppState } from '../state';
import {File} from 'magica'

interface Props extends AppImage {
}

export interface AppImage {
  album: AppAlbum
  position: number
  file: File
}
export enum AppAlbum {
  input = 'input',
  output = 'output'
}
/** TODO: an image component with options for: save-as, replace, rename, and collection options as: delete, duplicate */
export function Image(props: Props) {
  return <img src={props.file?.asObjectUrl()} />;
}
