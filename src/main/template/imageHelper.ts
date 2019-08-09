import { asArray, notUndefined } from 'misc-utils-of-mine-generic'
import { File } from '../../file/file'
import { ExtractInfoResultImage } from '../../image/imageInfo'
import { TemplateHelper } from './template'
import { Size } from '../../types';

interface Options {
  file: string | File
}

export class SizeHelper implements TemplateHelper<Options, Promise<Size>> {
  public name = 'size'
  public async exec(options: Options) {
    var file = asArray(typeof options.file === 'string' ? await File.resolve(options.file) : options.file)
    return await file[0].size()
  }
  public async fnCompileTime(options: Options) {
    return await this.exec(options)
  }
  public async fnRunTime(options: Options) {
    return await this.exec(options)
  }
}

export class ImageInfoHelper implements TemplateHelper<Options, Promise<ExtractInfoResultImage>> {
  public name = 'imageInfo'
  protected async exec(options: Options) {
    var file = asArray(typeof options.file === 'string' ? await File.resolve(options.file) : options.file).filter(notUndefined).map(File.asFile)
    return await file[0].infoOne()
  }
  public async fnCompileTime(options: Options) {
    return await this.exec(options)
  }
  public async fnRunTime(options: Options) {
    return await this.exec(options)
  }
}

export class HeightHelper implements TemplateHelper<Options, Promise<number>> {
  public name = 'height'
  public async exec(options: Options) {
    var file = asArray(typeof options.file === 'string' ? await File.resolve(options.file) : options.file)
    return (await file[0].size()).height
  }
  public async fnCompileTime(options: Options) {
    return await this.exec(options)
  }
  public async fnRunTime(options: Options) {
    return await this.exec(options)
  }
}

export class WidthHelper implements TemplateHelper<Options, Promise<number>> {
  public name = 'width'
  public async exec(options: Options) {
    var file = asArray(typeof options.file === 'string' ? await File.resolve(options.file) : options.file)
    return (await file[0].size()).width
  }
  public async fnCompileTime(options: Options) {
    return await this.exec(options)
  }
  public async fnRunTime(options: Options) {
    return await this.exec(options)
  }
}
