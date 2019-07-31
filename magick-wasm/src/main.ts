import { rm, which, test, cp, mkdir } from 'shelljs';
import { Context, renderTemplates, defaultContext } from './template';
// import { getRoot } from './getRoot';
// import { join } from 'path';

export interface Options extends Context {
  help?: boolean
  debug?: boolean
  outputFolder?: string
}

export const defaultOptions: Required<Options> = {
  ...defaultContext,
  help: false,
  debug: false,
  // outputFolder: getRoot()+'/build', 
  outputFolder: './build',
}

export function main(o: Options) {
  const allOptions: Required<Options> = { ...defaultOptions, ...o }
  allOptions.debug && console.log(allOptions);
  // !allOptions.dontClean && rm('-rf', allOptions.outputFolder)
  renderTemplates(allOptions)
  // if (test('-f', `./build/${allOptions.scriptsFolder}/Dockerfile`)) {
  //   rm('-rf', `./build/${allOptions.scriptsFolder}`)
  // }
  // mkdir('-p', `./build/${allOptions.scriptsFolder}`)
  // cp('-r', `${allOptions.outputFolder}/${allOptions.scriptsFolder}/*`, `./build/${allOptions.scriptsFolder}`)
  if(!which('docker')){
    throw new Error('docker not found and is required. Aborting.')
  }
}
