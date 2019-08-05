import { mkdir, ls, test } from 'shelljs';
import { compile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';
import {  defaultOptions } from './main';
import { defaultTemplateContext } from './defaults';
import { TemplateContext, Library, Options } from './types';

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