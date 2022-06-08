import * as React from 'react';
import { useAppState } from '../state';

interface Props {
  url: string;
}
// interface AppImage {
//   album: AppAlbum
//   position: number
//   file: File
// }
// enum AppAlbum {
//   input = 'input',
//   output = 'output'
// }
/** TODO: an image component with options for: save-as, replace, rename, and collection options as: delete, duplicate */
export function Image(props: Props) {
  // const [value, setValue] = React.useState(props.value);
  return <img src={props.url} />;
}
