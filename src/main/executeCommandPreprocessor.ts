import { serial } from 'misc-utils-of-mine-generic'
import { CommandPreprocessor, Options, RunOptions } from '../types'
import { Template } from './template/template'

const commandPreprocessor: CommandPreprocessor[] = []


/** internal - executes all registered preprocessor on given config */
export async function _compileTimePreprocess(config: RunOptions): Promise<RunOptions> {
  install()
  let cfg = config
  await serial(commandPreprocessor.filter(p => p.fnCompileTime).map(p => async () => {
    cfg = await p.fnCompileTime!(cfg)
  }))
  return { ...cfg }
}

export async function _runTimePreprocess(runOptions: RunOptions, commandOptions: Options, commandIndex: number): Promise<void> {
  if (!installed) {
    installed = true
    install()
  }
  await serial(commandPreprocessor.filter(p => p.fnRuntime).map(p => async () => {
    await p.fnRuntime!(commandOptions, commandIndex, runOptions)
  }))
}

export function registerCommandPreprocessor(p: CommandPreprocessor) {
  commandPreprocessor.push(p)
}

function install() {
  if (!installed) {
    installed = true
    registerCommandPreprocessor(new Template())
  }
}

let installed = false
