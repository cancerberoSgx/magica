import { resolve } from 'path'
import { which } from 'shelljs'
import { defaultContext, defaultOptions } from "./defaults"
import { renderTemplates } from './template'
import { Options } from "./types"

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
  allOptions.debug && console.log(allOptions)
  // !allOptions.noClean && rm('-rf', allOptions.outputFolder)
  renderTemplates(allOptions)
  // if (test('-f', `./build/${allOptions.scriptsFolder}/Dockerfile`)) {
  //   rm('-rf', `./build/${allOptions.scriptsFolder}`)
  // }
  // mkdir('-p', `./build/${allOptions.scriptsFolder}`)
  // cp('-r', `${allOptions.outputFolder}/${allOptions.scriptsFolder}/*`, `./build/${allOptions.scriptsFolder}`)
  if (!which('docker')) {
    throw new Error('docker not found and is required. Aborting.')
  }
  if (!allOptions.noRun) {

    // try {
    const cmd = `sh ${allOptions.scriptsFolder}/run-docker.sh`
    const cwd = allOptions.outputFolder
    console.log(`
Build scripts built at ${allOptions.outputFolder}/${allOptions.scriptsFolder}

To launch tests run: 

cd ${cwd}
${cmd}
`
    )

    // execSync(cmd, {cwd })
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }
  }
}
