import { rm, which } from 'shelljs';
import { Context, renderTemplates, defaultContext } from './template';
import { getRoot } from './getRoot';
import { join } from 'path';

export interface Options extends Context{
  help?: boolean
  outputFolder?: string
}

export const defaultOptions: Required<Options> = {
  ...defaultContext, 
  help: false, 
  outputFolder: getRoot()+'/build', 
}

export function main(o: Options){
  const allOptions: Required<Options> = { ...defaultOptions, ...o }
  rm('-rf', allOptions.outputFolder)
  renderTemplates(allOptions)
  if(!which('docker')){
    throw new Error('docker not found and is required. Aborting.')
  }
}
