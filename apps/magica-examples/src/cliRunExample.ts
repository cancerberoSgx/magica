// just an utility that prints/run example using given input file from cli to easily debug

import { writeFileSync } from 'fs'
import { addTemplateHelper, run, setOptions } from '../../../'
import { getExampleFields } from './common'
import { examples } from './examples'

interface RunExampleConfig {
  source: string
  example: string
}

async function runExample(config: RunExampleConfig) {
  const example = examples().find(e=>e.name.toLowerCase()===config.example.toLowerCase())
  if(!example) {
    console.log('Example not found');
    return
  }

  const cmd = [
    'magick',
    'Passion_Flower.jpeg',
    '-virtual-pixel',
    'tile',
    '-filter',
    'point',
    '-set',
    'option:distort:viewport',
    '6x6',
    '-distort',
    'SRT',
    '0',
    'out.png'
  ]
  console.log(cmd.join(' '));
  

  setOptions({debug: true})
  const fields = getExampleFields(example)
  addTemplateHelper({
    name: 'get',
    fnCompileTime(s: string) {
      // @ts-ignore
      return this.options.fields[s]
    },
    fnRunTime: (o: any) => o
  })
   
  const result = await run({
    inputFiles: [config.source],
    script: example.script,
    // script: 'convert rose: tmp_rose.png',
    // @ts-ignore
    fields
  })
  console.log('RESULT', result);
  result.outputFiles.forEach(f => writeFileSync(f.name, f.content))
  
}

;(async ()=>{
  try {
    await runExample({source: 'notes/Passion_Flower.jpeg', example: 'Tile'})
  } catch (error) {
    console.log('ERROR', error);
  }
})();