import { basename, pathJoin } from 'misc-utils-of-mine-generic'
import { FS } from '../file/emscriptenFs'

interface Options {

  /**
   * Folder path to list files.
   */
  path: string

  /**
   * list files in given folder. Returns children files and folders base names.
   */
  ls: (f: string) => string[]

  /**
   * return true if given file is a directory.
   */
  isDir: (f: string) => boolean
  
  /**
   * If true is returned the visit will stop.
   */
  visitor: (f: LsRVisitorFile) => boolean
}

export interface LsRVisitorFile {
  path: string,
  isDir: boolean
}

export function lsR(o: Options) {
  const result: LsRVisitorFile[] = []
  function recurse(f: string): boolean {
    if (!o.isDir(f)) {
      o.visitor({ path: f, isDir: false })
      return true
    }
    return o.ls(f).map(c => pathJoin(f, basename(c))).some(path => {
      const f = { path, isDir: o.isDir(path) }
      result.push(f)
      if (o.visitor(f)) {
        return true
      }
      else if (f.isDir) {
        return recurse(path)
      }
      else {
        return false
      }
    })
  }
  recurse(o.path)
  return result
}

export function listFilesRecursively(path: string, FS: FS) {
  return lsR({
    path,
    ls: p => ls(p, FS),
    isDir: f => FS.isDir(FS.stat(f).mode),
    visitor: f => false
  })
}

export function ls(p: string, FS: FS) {
  return (FS.readdir(p) as string[]).filter(s => !['.', '..'].includes(s))
}
