import { File, imageCompare, run } from '../../src'
import { assert, assertEquals } from '../testUtil'

export default async function() {
  const result = await run({
    script: `
  convert -font helvetica.ttf -pointsize 44 -background lightblue -fill navy label:Seba tmp.png
  `,
    inputFiles: ['helvetica.ttf']
  })
  assertEquals(result.stderr, [])
  assertEquals(result.error, undefined)
  assert(await imageCompare(await File.fromUrl('text.png'), result.outputFiles[0]), 'text output')
}

