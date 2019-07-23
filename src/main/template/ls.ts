import { asArray } from 'misc-utils-of-mine-generic';
import { getOptions, magickLoaded, pushStdout } from '../../imageMagick/magickLoaded';
import { listFilesRecursively, ls } from '../../util/lsR';
import { TemplateHelper } from './template';

interface Options {
  path?: string
  recursive?: boolean
  stdout?: boolean
  returnValue?: any
  //TODO: size?: boolean
}

export class LsHelper implements TemplateHelper<Options, Promise<string[]>> {
  public name = 'ls'
  public async fsCompileTime(options: Options = {}) {
    const { FS } = await magickLoaded
    const { emscriptenNodeFsRoot } = getOptions()
  
    var path = options.path || emscriptenNodeFsRoot
    // console.log(path,  ls(path, FS), emscriptenNodeFsRoot, FS.cwd());
    // FS.chdir(emscriptenNodeFsRoot)
    var files = options.recursive ? listFilesRecursively(path, FS) : ls(path, FS)
    var a: string[] = asArray<any>(files).map(f => typeof f === 'string' ? f : f.path)
    if (options.stdout) {
      a.forEach(pushStdout)
    }
    return a
  }
  public fsRunTime = (o: any) => o
}
