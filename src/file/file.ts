import { ok } from 'assert'
import fetch from 'cross-fetch'
import { existsSync, readFileSync } from 'fs'
import { basename, getFileNameFromUrl, isNode, serial } from 'misc-utils-of-mine-generic'
import { File as IFile, Options } from '../types'

export class File implements IFile {
  public content: IFile['content']

  constructor(public name: string, content: IFile['content'] | ArrayBuffer) {
    this.content = content instanceof ArrayBuffer ? new Uint8ClampedArray(content) : content
  }

  static async fromUrl(u: string, o: RequestInit & O = {}) {
    const r = await fetch(u, o)
    return new File(o.name || getFileNameFromUrl(u), await r.arrayBuffer())
  }

  static async fromFile(f: string, o: O = {}) {
    if (!isNode()) {
      throw new Error('File.readFile() called in the browser.')
    }
    return new File(o.name || basename(f), readFileSync(f))
  }

  static toString(f: File) {
    return String.fromCharCode.apply(null, f.content as any)
  }

  static async   resolveOptions(o: Partial<Options>) {
    return await serial((o.inputFiles || []).map(f => async () => {
      if (typeof f === 'string') {
        if (isNode() && existsSync(f)) {
          return await File.fromFile(f)
        }
        else {
          return await File.fromUrl(f)
        }
      }
      else {
        ok(ArrayBuffer.isView(f.content))
        return f
      }
    }))
  }

  static asPath(f: string | File) {
    return typeof f === 'string' ? f : f.name
  }
}


interface O {
  name?: string
}

