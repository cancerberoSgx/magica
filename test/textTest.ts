import test from 'ava'
import { File, imageCompare, run } from '../src'

test('should render text', async t => {
  const result = await run({
    script: `
convert -font helvetica.ttf -pointsize 44 -background lightblue -fill navy label:Seba tmp.png
      `,
    inputFiles: ['test/assets/helvetica.ttf']
  })
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
  t.deepEqual(result.stderr, [])
})

