import { basename } from 'misc-utils-of-mine-generic'
import { FS } from '../emscriptenFs'
/**
 * dirname
 */
export function getFileDir(f: string) {
  const baseName = basename(f)
  let folderName = f.substring(0, f.length - baseName.length)
  if (folderName.endsWith('/')) {
    folderName = folderName.substring(0, folderName.length - 1)
  }
  return folderName
}

export function isDir(f: string, FS: FS) {
  return FS.isDir(FS.stat(f).mode)
}
export function isFile(f: string, FS: FS) {
  return FS.isFile(FS.stat(f).mode)
}
