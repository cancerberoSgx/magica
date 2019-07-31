import { mkdir, ls, test } from 'shelljs';
import { compile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';
import { buildFolder, templatesFolder } from "./config";

export interface Context {
  scriptsFolder?: string
  type?: 'debug'|'production'
  dontCleanPrefix?: boolean
}

const defaultContext: Required<Context> = {
  scriptsFolder: 'emscripten-scripts',
  type: 'production',
  dontCleanPrefix: false
}

export function renderTemplates(context: Context = defaultContext) {
  context = { ...defaultContext, ...context }
  mkdir('-p', `${buildFolder}/${context.scriptsFolder}`);
  ls(templatesFolder)
    .filter(f => test('-f', `${templatesFolder}/${f}`) && f.endsWith('.ejs'))
    .map(f => ({ src: `${templatesFolder}/${f}`, dest: `${buildFolder}/${context.scriptsFolder}/${f.substring(0, f.length - '.ejs'.length)}` })).forEach(o => {
      const t = compile(readFileSync(o.src).toString());
      const result = t(context);
      writeFileSync(o.dest, result);
    });
}
