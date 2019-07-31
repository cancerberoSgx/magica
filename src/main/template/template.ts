import { compile } from 'ejs'
import { CommandPreprocessor, Options, RunOptions } from '../../types'
import { arrayToCliOne, processCommand } from '../command'
import { LSHelper } from './fsHelper'
import { HeightHelper, ImageInfoHelper, SizeHelper, WidthHelper } from './imageHelper'

export interface TemplateHelper<O = any, R = any, RO = any, RR = any> {
  name: string
  fnCompileTime: (options: O) => R
  fnRunTime?: (options: RO) => RR
}

export class Template implements CommandPreprocessor {

  constructor() {
    if (!installed) {
      installed = true
      addTemplateHelper(new LSHelper())
      addTemplateHelper(new SizeHelper())
      addTemplateHelper(new ImageInfoHelper())
      addTemplateHelper(new HeightHelper())
      addTemplateHelper(new WidthHelper())
    }
  }

  public name = 'template'

  public async fnCompileTime(context: RunOptions) {
    if (typeof context.script === 'string') {
      const t = compile(context.script, { async: true })
      context.debug && console.log('Template compiled: ', t.toString())
      let c: { [s: string]: any } = { ...context }
      templateHelpers.forEach(fn => {
        c[fn.name] = fn.fnCompileTime.bind(fn)
      })
      const script = await t(c)
      return { ...context, script }
    }
    else {
      return context
    }
  }

  public async fnRuntime(commandOptions: Options, commandIndex: number, runOptions: RunOptions) {
    var cs = commandOptions.command === 'string' ? commandOptions.command : !commandOptions.command ? '' : arrayToCliOne(commandOptions.command as any)
    const t = compile(cs, { delimiter: '$', async: true })
    let c: { [s: string]: any } = { runOptions, commandOptions }
    templateHelpers.filter(t => t.fnRunTime).forEach(fn => {
      c[fn.name] = fn.fnRunTime!.bind(fn)
    })
    var s = await t(c)
    commandOptions.command = processCommand(s)
  }
}

const templateHelpers: TemplateHelper<any, any>[] = []

/**
 * Allows to change the context object on which templates are evaluated to add new properties or functions 
 * so they can be evaluated in command templates.
 */
export function addTemplateHelper(h: TemplateHelper) {
  templateHelpers.push(h)
}
let installed = false

