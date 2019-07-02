import { getFileExtension } from 'misc-utils-of-mine-generic';
import { File } from '..';

export function toDataUrl(o: File){
  return `data:image/${getFileExtension(o.name)};base64,${btoa(String.fromCharCode(...o.content as any))}`
}
  