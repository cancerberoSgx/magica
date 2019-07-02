import { getFileExtension } from 'misc-utils-of-mine-generic'
import { File } from '..'

export function toDataUrl(o: File, mime=`image/${getFileExtension(o.name)}`) {
  return `data:${mime};base64,${btoa(
    (o.content as any as  number[])
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )}`
}
