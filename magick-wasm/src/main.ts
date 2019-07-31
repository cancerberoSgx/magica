import { rm } from 'shelljs';
import { Context, renderTemplates, defaultContext } from './template';

export interface Options extends Context{
  help?: boolean
  buildFolder?: string
  templatesFolder?: string
}

export const defaultOptions: Required<Options> = {
  ...defaultContext, 
  help: false, 
  buildFolder: 'build', 
  templatesFolder: 'src/templates'
}

export function main(o: Options){
  const allOptions: Required<Options> = { ...defaultOptions, ...o }
  rm('-rf', allOptions.buildFolder)
  renderTemplates(allOptions)
}
