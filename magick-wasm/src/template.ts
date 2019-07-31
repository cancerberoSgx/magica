import { mkdir, ls, test } from 'shelljs';
import { compile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';
import { Options, defaultOptions } from './main';

export interface Context {
  scriptsFolder?: string
  type?: 'debug'|'production'
  dontCleanPrefix?: boolean
  quantumDepth?: '8'|'16'|'32',
  hdri?: boolean
}

export const defaultContext: Required<Context> = {
  scriptsFolder: 'emscripten-scripts',
  type: 'production',
  dontCleanPrefix: false,
  /** the greater the more memory it consumes */
  quantumDepth: '16',
  /** impact speed */
  hdri: true
}

export function renderTemplates(context: Required<Options> = defaultOptions) {
  context = { ...defaultContext, ...context }
  mkdir('-p', `${context.buildFolder}/${context.scriptsFolder}`);
  ls(context.templatesFolder)
    .filter(f => test('-f', `${context.templatesFolder}/${f}`) && f.endsWith('.ejs'))
    .map(f => ({ src: `${context.templatesFolder}/${f}`, dest: `${context.buildFolder}/${context.scriptsFolder}/${f.substring(0, f.length - '.ejs'.length)}` })).forEach(o => {
      const t = compile(readFileSync(o.src).toString());
      const result = t(context);
      writeFileSync(o.dest, result);
    });
}
