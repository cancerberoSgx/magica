import {compile} from 'ejs'
import { CommandPreprocessor } from '../types';
import { imageInfo } from '../image/imageInfo';
export const templatePreprocessor:CommandPreprocessor ={
  name: 'template',
  async execute(context) {
    if (typeof context.script === 'string') {
      const t = compile(context.script,{async: true})
      const script = await t({...context, imageInfo})
      return { ...context, script }
    }
    else {
      return context
    }
  }
}
