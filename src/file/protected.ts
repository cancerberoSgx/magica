import { magickLoaded } from '../imageMagick/magickLoaded'
import { IFile } from '../types'
import { File } from './file'
/**
 * If string is given is assumes as the path and must exists
 */
export function protectFile(f: string | IFile) {
  //TODO: we should get stat and modification data to know if it's dirty
  protectedFiles[File.asPath(f)] = true
}
export async function getProtectedFile(f: string | IFile) {
  const { FS } = await magickLoaded
  //TODO: check if dirty
  const name = File.asPath(f)
  const content = FS.readFile(name)
  return { name, content }
}
export function isProtectedFile(f: string | IFile) {
  return protectedFiles[File.asPath(f)]
}
const protectedFiles: {
  [f: string]: boolean;
} = {}
