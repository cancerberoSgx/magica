import fetch from 'cross-fetch'
import { basename, getFileNameFromUrl, isNode } from 'misc-utils-of-mine-generic'
import { File as IFile } from './types'

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
    return new File(o.name || basename(f), readFileSync(f))
  }
}
interface O {
  name?: string
}

export function readFileSync(f: string) {
  if (isNode()) {
    return require('f' + 's').readFileSync(f) as Buffer
  } else {
    throw new Error('Attemped to readFile in the browser.')
  }
}
