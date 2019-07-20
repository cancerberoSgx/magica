import { FS } from '../file/emscriptenFs'
import { ls } from './lsR'

export function rmRf(f: string, FS: FS, predicate: (f: string) => boolean = f => true) {
  if (FS.isDir(FS.stat(f).mode)) {
    ls(f, FS).some(f => rmRf(f, FS))
    if (predicate(f)) {
      try {
        FS.rmdir(f)
      } catch (error) {
        return true
      }
    }
    else {
      return false
    }
  }
  else if (predicate(f)) {
    try {
      FS.unlink(f)
    } catch (error) {
      return true
    }
  }

  return false
}
