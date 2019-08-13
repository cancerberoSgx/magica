import { FS } from '../file/emscriptenFs'
import { File } from '../file/file';
import { getOptions } from '../options';
import { IFile } from '../types';

export function readFile( f:string, FS: FS): File {
  return new File(getFileName(f), FS.readFile(getFilePath(f)) );
}

export function getFileName(f: string|IFile) {
  const { emscriptenNodeFsRoot } = getOptions()
  const path =  typeof f === 'string' ? f : f.name
  return path.startsWith(`${emscriptenNodeFsRoot}/`) ? path.substring(`${emscriptenNodeFsRoot}/`.length, path.length) : `${  path}`;
}

/**
 * Returns absolute path of given 
 */
export function getFilePath(f: string|IFile) {
  const { emscriptenNodeFsRoot } = getOptions()
  const path =  typeof f === 'string' ? f : f.name
  return path.startsWith(`${emscriptenNodeFsRoot}/`) ? path : `${emscriptenNodeFsRoot}/${  path}`;
}

export function writeFile( f: IFile, FS: FS) {
  FS.writeFile(getFilePath(f.name), f.content)
}

export function isDir(f: string|IFile, FS: FS) {
  try {
    return FS.isDir(FS.stat(getFilePath(f)).mode)
  } catch (error) {
    return false
  }
}

export function isFile(f: string|IFile, FS: FS) {
  try {
    return FS.isFile(FS.stat(getFilePath(f)).mode)
  } catch (error) {
    return false
  }
}

