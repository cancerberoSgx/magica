import { FS } from '../file/emscriptenFs'
import { ls } from './lsR'

export function rmRf(f: string, FS: FS, predicate: (f: string) => boolean = f => true, removed: string[] = []) {
  if (FS.isDir(FS.stat(f).mode)) {
    ls(f, FS).some(f => rmRf(f, FS, predicate, removed))
    if (predicate(f)) {
      try {
        FS.rmdir(f)
        removed.push(f)
      } catch (error) {
        return true
      }
    }
  }
  else if (predicate(f)) {
    try {
      FS.unlink(f)
      removed.push(f)
    } catch (error) {
      return true
    }
  }
  return false
}
