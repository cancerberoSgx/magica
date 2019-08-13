import { IFile } from '../types'
import { getFilePath } from '../util/fileUtil'

/**
 * If string is given is assumes as the path and must exists
 */
export function protectFile(f: string | IFile, protect = true) {
  // console.log(protectedFiles, getFilePath(f));
  protectedFiles[getFilePath(f)] = protect
  // console.log(protectedFiles, getFilePath(f));
}

export function isProtectedFile(f: string | IFile) {
  // console.log(protectedFiles, getFilePath(f));
  return protectedFiles[getFilePath(f)]
}

const protectedFiles: {
  [f: string]: boolean;
} = {}
