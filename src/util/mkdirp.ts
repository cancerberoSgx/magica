import { FS } from '../file/emscriptenFs'

export function mkdirp(path: string, exists: (f: string) => boolean, mkdir: (f: string) => any) {
  const folders = path.split('/')
  function f(i: number) {
    if (folders.length < i) {
      return
    }
    const name = folders.slice(0, i).join('/').trim()
    if (name && !exists(name)) {
      mkdir(name)
    }
    f(i + 1)
  }
  f(0)
}

export function makeDirRecursive(p: string, FS: FS) {
  return mkdirp(p, p => FS.analyzePath(p).exists, FS.mkdir)
} 
