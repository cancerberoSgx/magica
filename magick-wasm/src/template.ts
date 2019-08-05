import { mkdir, ls, test } from 'shelljs';
import { compile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';
import { Options, defaultOptions } from './main';
import { join } from 'path';

export interface Context {
  type?: 'debug' | 'production'
  /** 
   * If true it won't remove the $PREFIX folder before start. This is useful to re-use a prefix folder
   * generated by a previous run so project's won't be downloaded / cloned again and existing sources will be
   * used instead. Not recommended to release. 
   */
  noClean?: boolean
  /** 
   * the greater the more memory it consumes 
   */
  quantumDepth?: '8' | '16' | '32',
  /** 
   * High resolution for pixel transformation. Impacts speed. Default value: false
   */
  noHdri?: boolean
  /**
   * Name of the folder inside `outputFolder` where scripts will be generated 
   */
  scriptsFolder?: string
  templatesFolder?: string
  /**
   * If given it will only compile these libraries and disable the rest. Can be used to create a limited version of IM or, together with --noClean,for fast builds when testing/porting a concrete library.
   */
  libraries?: Library[]
  noLibraries?: boolean
  skipImageMagickConfig?: boolean
  skipImageMagickBuild?: boolean
}
export const defaultLibraries = ['fftw', 'freetype', 'libjpeg', 'libpng', 'tiff', 'webp', 'zlib', 'openjpeg', 'autotrace']

type Library = keyof (typeof defaultLibraries)

export const defaultContext: Required<Context> = {
  type: 'production',
  noClean: false,
  quantumDepth: '16',
  noHdri: false,
  scriptsFolder: 'emscripten-scripts',
  templatesFolder: join(__dirname, '..', 'src', 'templates'),
  libraries: defaultLibraries as Library[],
  noLibraries: false,
  skipImageMagickConfig: false,
  skipImageMagickBuild: false
}

export const defaultTemplateContext: Required<TemplateContext> = {
  ...defaultOptions,
  addLib(this: Required<Options>, lib: Library) { throw new Error('Not implemented') },
  test, ls, mkdir, readFileSync, writeFileSync
}

interface TemplateContext extends Options {
  addLib(this: Required<Options>, lib: Library): void
  test: typeof test
  ls: typeof ls
  mkdir: typeof mkdir
  readFileSync: typeof readFileSync
  writeFileSync: typeof writeFileSync
}

export function renderTemplates(options: Required<Options> = defaultOptions) {
  const context: TemplateContext = { ...defaultTemplateContext, ...options, addLib: addLib.bind(options) }
  mkdir('-p', `${options.outputFolder}/${options.scriptsFolder}`);
  ls(options.templatesFolder)
    .filter(f => test('-f', `${options.templatesFolder}/${f}`) && f.endsWith('.ejs'))
    .map(f => ({ src: `${options.templatesFolder}/${f}`, dest: `${options.outputFolder}/${options.scriptsFolder}/${f.substring(0, f.length - '.ejs'.length)}` })).forEach(o => {
      const t = compile(readFileSync(o.src).toString(), { escape: s => s, rmWhitespace: false });
      const result = t(context);
      writeFileSync(o.dest, result);
    });
}

function addLib(this: Required<Options>, lib: Library) {
  return `
cd $CURRENT_DIR
source ${this.scriptsFolder}/build-${lib}.sh
testExitCode "build-${lib}" $?
`.trim().split('\n').map(l => this.libraries.includes(lib) ? l : `# ${l}`).join('\n')
}