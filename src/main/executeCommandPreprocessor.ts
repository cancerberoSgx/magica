import { serial } from 'misc-utils-of-mine-generic'
import { CommandPreprocessor, RunOptions } from '../types'
import { templatePreprocessor } from './templatePreprocessor'

const commandPreprocessor: CommandPreprocessor[] = []

/** internal - executes all registered preprocessor on given config */
export async function _preprocessCommand(config: RunOptions): Promise<RunOptions> {
  let cfg = config
  await serial(commandPreprocessor.map(p => async () => {
    cfg = await p.execute(cfg)
  }))
  return { ...cfg }
}

export function registerCommandPreprocessor(p: CommandPreprocessor) {
  commandPreprocessor.push(p)
}

registerCommandPreprocessor(templatePreprocessor)
