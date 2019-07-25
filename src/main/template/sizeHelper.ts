import { TemplateHelper } from './template'
import { File, Size } from '../../file/file';
import { asArray } from 'misc-utils-of-mine-generic';

interface Options {
  file: string|File
}

export class SizeHelper implements TemplateHelper<Options, Promise<Size>> {
  public name = 'size'
  public async fnCompileTime(options: Options ) {
    var file =  asArray(typeof options.file==='string' ? await File.resolve(options.file) : options.file)
    return await file[0].size()
  }
}
