import template from 'lodash.template'
import { RunOptions } from '../types'

export interface CommandPreprocessor {
  name: string,
  execute: (context: RunOptions) => RunOptions
}

const commandPreprocessor: CommandPreprocessor[] = []

/** internal - executes all registered preprocessor on given config */
export function _preprocessCommand(config: RunOptions): RunOptions {
  let cfg = config
  commandPreprocessor.forEach(p => {
    cfg = p.execute(cfg)
  })
  return { ...cfg }
}

export function registerCommandPreprocessor(p: CommandPreprocessor) {
  commandPreprocessor.push(p)
}

registerCommandPreprocessor({
  name: 'template',
  execute(context) {
    if (typeof context.script === 'string') {
      const t = template(context.script)
      const script = t(context)
      return { ...context, script }
    }
    else {
      return context
    }
  }
})
