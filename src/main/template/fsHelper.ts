import { asArray } from 'misc-utils-of-mine-generic'
import { getOptions, magickLoaded, pushStdout } from '../../imageMagick/magickLoaded'
import { listFilesRecursively, ls } from '../../util/lsR'
import { TemplateHelper } from './template'

interface Options {
  path?: string
  recursive?: boolean
  stdout?: boolean
  noReturnValue?: boolean
}

export class LSHelper implements TemplateHelper<Options, Promise<string[]>> {
  public name = 'ls'
  public async exec(options: Options = {}) {
    const { FS } = await magickLoaded
    const { emscriptenNodeFsRoot } = getOptions()
    var path = options.path || emscriptenNodeFsRoot
    var files = options.recursive ? listFilesRecursively(path, FS) : ls(path, FS)
    var a: string[] = asArray<any>(files).map(f => typeof f === 'string' ? f : f.path)
    if (options.stdout) {
      a.forEach(s=>pushStdout(s))
    }
    return options.noReturnValue ? [] : a
  }
  public async fnCompileTime(options: Options) {
    return await this.exec(options)
  }
  public async fnRunTime(options: Options) {
    return await this.exec(options)
  }
}
