import { FS } from '../emscriptenFs'
import { ls } from './lsR'

export function rmRf(f: string, FS: FS) {
  if (FS.isDir(FS.stat(f).mode)) {
    ls(f, FS).forEach(f => rmRf(f, FS))
    FS.rmdir(f)
  }
  else {
    FS.unlink(f)
  }
}
