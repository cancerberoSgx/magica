import test from 'ava'
import { File, imageCompare, run } from '../src'
import { writeFileSync } from 'fs';

test('should render ttf', async t => {
  const result = await run({
    script: `
convert -font helvetica.ttf -pointsize 44 -background lightblue -fill navy label:Seba tmp.png
      `,
    inputFiles: ['test/assets/helvetica.ttf']
  })
  t.true(await imageCompare(await File.fromFile('test/assets/text.png'), result.outputFiles[0]))
  t.deepEqual(result.error, undefined)
})

test('should render otf', async t => {
  const result = await run({
    script: `
convert -font PoetsenOne-Regular.otf -pointsize 44 -background #113311 -fill #e05511 'label:Lorem Ipsum' tmp1.jpg
      `,
    inputFiles: ['test/assets/PoetsenOne-Regular.otf']
  })
  // writeFileSync('tmp1.jpg', result.outputFiles[0].content)
  t.true(await imageCompare(await File.fromFile('test/assets/text3.jpg'), result.outputFiles[0]))
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
  t.deepEqual(result.stderr.filter(s => !s.includes('UnableToOpenConfigureFile') && !s.includes('Calling stub instead of')), [])
})

