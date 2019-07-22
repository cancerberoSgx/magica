import { compile } from 'ejs'
import { imageInfo } from '../image/imageInfo'
import { CommandPreprocessor, RunOptions } from '../types'

type TemplatePreprocessorContextMutator<C extends RunOptions = RunOptions, D extends RunOptions = RunOptions> = (context: C)=>D
const templatePreprocessorContextMutators: TemplatePreprocessorContextMutator<any,any>[] = []
/**
 * Allows to change the context object on which templates are evaluated to add new properties or functions so they can be evaluated in command templates.
 */
export function addTemplatePreprocessorContextMutator<C extends RunOptions = RunOptions, D extends RunOptions = RunOptions>(fn: TemplatePreprocessorContextMutator<C,D>){
  templatePreprocessorContextMutators.push(fn)
}
export const templatePreprocessor: CommandPreprocessor = {
  name: 'template',
  async execute(context) {
    if (typeof context.script === 'string') {
      console.log(context.script);
      
      const t = compile(context.script, { async: true })
      let c  = { ...context, imageInfo }
      templatePreprocessorContextMutators.forEach(fn=>{
        c = fn(c)
      })
      const script = await t(c)
      return { ...context, script }
    }
    else {
      return context
    }
  }
}
