import { File } from '../file/file'
import { getFS } from '../imageMagick/magickLoaded'
import { getOptions } from '../options'
import { IFile } from '../types'

/**
 * if given a file it ignores its contents and alwasys read again from FS
 */
export function readFile(f: string | IFile, FS = getFS()): File {
  return new File(getFileName(f), FS.readFile(getFilePath(f)))
}

/**
 * Returns file name / path of given file relative to emscripten FS root  (in the context of emscripten FS)
 */
export function getFileName(f: string | IFile) {
  const { emscriptenNodeFsRoot } = getOptions()
  const path = typeof f === 'string' ? f : f.name
  return path.startsWith(`${emscriptenNodeFsRoot}/`) ? path.substring(`${emscriptenNodeFsRoot}/`.length, path.length) : `${path}`
}

/**
 * Returns absolute path of given file (in the context of emscripten FS)
 */
export function getFilePath(f: string | IFile) {
  const { emscriptenNodeFsRoot } = getOptions()
  const path = typeof f === 'string' ? f : f.name
  return path.startsWith(`${emscriptenNodeFsRoot}/`) ? path : `${emscriptenNodeFsRoot}/${path}`
}

export function writeFile(f: IFile, FS = getFS()) {
  FS.writeFile(getFilePath(f.name), f.content)
}

export function removeFile(f: string | IFile, FS = getFS()) {
  FS.unlink(getFilePath(getFilePath(f)))
}

export function isDir(f: string | IFile, FS = getFS()) {
  try {
    return FS.isDir(FS.stat(getFilePath(f)).mode)
  } catch (error) {
    return false
  }
}

export function isFile(f: string | IFile, FS = getFS()) {
  try {
    return FS.isFile(FS.stat(getFilePath(f)).mode)
  } catch (error) {
    return false
  }
}

