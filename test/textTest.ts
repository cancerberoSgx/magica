import test from 'ava'
import { File, imageCompare, run } from '../src'
import { writeFileSync } from 'fs';

test('should render text', async t => {
  const result = await run({
    script: `
convert -font helvetica.ttf -pointsize 44 -background lightblue -fill navy label:Seba tmp.png
      `,
      // debug: true,
    inputFiles: ['test/assets/helvetica.ttf']
  })
  // writeFileSync('tmptext.png', result.outputFiles[0].content)
  t.true(await imageCompare(await File.fromFile('test/assets/text.png'), result.outputFiles[0]))
  t.deepEqual(result.error, undefined)
})

test('should list available fonts', async t => {
  const result = await run({
    script: `
    convert -list font 
      `,
    inputFiles: []
  })
  t.deepEqual(result.error, undefined)
  t.deepEqual(result.stdout, [])
  // t.deepEqual(result.stderr, [])
})

