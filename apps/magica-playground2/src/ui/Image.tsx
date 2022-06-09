import * as React from 'react';
import { useAppState } from '../state';
import {File} from 'magica'
import * as FileSaver from 'file-saver'

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
  if(!props.file) {
    return <div>Image Placeholder</div>
  }
  return <div>
    <div><a onClick={e=>{
      e.preventDefault()
      FileSaver.saveAs(props.file.asBlob(), props.file.name)      
    }}>{props.file.name}</a></div>
    <img src={props.file.asObjectUrl()} />
    </div>
}
