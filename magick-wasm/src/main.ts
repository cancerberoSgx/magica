import { rm, which, test, cp, mkdir } from 'shelljs';
import { renderTemplates } from './template';
import { Context, Options } from "./types";
import { defaultContext } from "./defaults";
import { execSync } from 'child_process';

export const defaultOptions: Required<Options> = {
  ...defaultContext,
  help: false,
  debug: false,
  // outputFolder: getRoot()+'/build', 
  outputFolder: './build',
}
// import { homedir } from 'os';
//  function getRoot() {
//   const d = homedir() + '/.magick-wasm';
//   if (!test('-d', d)) {
//     mkdir('-p', d);
//   }
//   return d;
// }

export function main(o: Options) {
  const allOptions: Required<Options> = { ...defaultOptions, ...o }
  allOptions.debug && console.log(allOptions);
  // !allOptions.noClean && rm('-rf', allOptions.outputFolder)
  renderTemplates(allOptions)
  // if (test('-f', `./build/${allOptions.scriptsFolder}/Dockerfile`)) {
  //   rm('-rf', `./build/${allOptions.scriptsFolder}`)
  // }
  // mkdir('-p', `./build/${allOptions.scriptsFolder}`)
  // cp('-r', `${allOptions.outputFolder}/${allOptions.scriptsFolder}/*`, `./build/${allOptions.scriptsFolder}`)
  if(!which('docker')){
    throw new Error('docker not found and is required. Aborting.')
  }
  if(!allOptions.noRun) {

    try {
      execSync(`cd ${allOptions.outputFolder} &&  sh ${allOptions.scriptsFolder}/run-docker.sh`, {stdio: 'pipe'})
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
