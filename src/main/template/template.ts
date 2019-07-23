import { compile } from 'ejs'
import { imageInfo } from '../../image/imageInfo'
import { CommandPreprocessor, Options, RunOptions } from '../../types'
import { arrayToCliOne, processCommand } from '../command'
import { LsHelper } from './ls'

export interface TemplateHelper<O = any, R = any, RO = any, RR = any> {
  name: string
  fsCompileTime: (options: O) => R
  fsRunTime: (options: RO) => RR
}

export class Template implements CommandPreprocessor {

  constructor() {
    if (!installed) {
      installed = true
      addTemplateHelper(new LsHelper())
    }
  }
  public name = 'template'

  public async fnCompileTime(context: RunOptions) {
    if (typeof context.script === 'string') {
      const t = compile(context.script, { async: true })
      let c: { [s: string]: any } = { ...context, imageInfo } // TODO: imageInfo should be another helper separately
      templateHelpers.forEach(fn => {
        c[fn.name] = fn.fsCompileTime.bind(fn)
      })
      const script = await t(c)
      return { ...context, script }
    }
    else {
      return context
    }
  }

  public async fnRuntime(commandOptions: Options, commandIndex: number, runOptions: RunOptions) {

    // commandOptions = {...commandOptions}
    // runOptions = {...runOptions}

    // var command = await serial(processCommand(context.command).map(arg => async () => {
    //   return await 
    // }))
    // var c : string[] = context.command ?  processCommand(context.command) : []
    // c = processCommand(context.command)

    var cs = commandOptions.command === 'string' ? commandOptions.command : !commandOptions.command ? '' : arrayToCliOne(commandOptions.command as any)
    // console.log(cs)
    // console.log('TEMPLALSLSLSL', cs);

    // if (cs.includes('<$')) {
    const t = compile(cs, { delimiter: '$', async: true })
    // const ctx = {...context
    let c: { [s: string]: any } = { runOptions, commandOptions, imageInfo } // TODO: imageInfo should be another helper separately
    templateHelpers.forEach(fn => {
      c[fn.name] = fn.fsRunTime.bind(fn)
    })

    // console.log('ctx', c);
    var s = await t(c)
    commandOptions.command = processCommand(s)


    // } 

    // else {
    //   return Promise.resolve(cs)
    // }

    // cs = await Template.renderRuntimeArg(context, cs)
    // context.command  
    // var processed = await serial(processCommand(context.command||[]).map(arg => async () => {

    // }))

    // if(typeof context.command==='string'){

    // }
    // context.command = await Template.renderRuntimeArg(context, processed)
    // return context
  }

  // public static async  renderRuntimeArg(o:Options, c:string){
  //   if(c.includes('<$')){
  //     const t = compile(c, { delimiter: '$', async: true })
  //     return await t(o)
  //   }else {
  //     return Promise.resolve(c)
  //   }
  // }
}

const templateHelpers: TemplateHelper<any, any>[] = []

/**
 * Allows to change the context object on which templates are evaluated to add new properties or functions so they can be evaluated in command templates.
 */
export function addTemplateHelper(h: TemplateHelper) {
  templateHelpers.push(h)
}

let installed = false

// export const templateCompileTimePreprocessor: () => CommandPreprocessor = () => {
//   if (!installed) {
//     installed = true
//     addTemplateHelper(new LsHelper())
//   }

//   return new Template();
// }
