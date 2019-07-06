import test from 'ava'
import { run } from '../src/main/run';
import { writeFileSync, readFileSync } from 'fs';
import { imageCompare, File } from '../src';

test('should run a single command with comments, spaces and command break line', async t => {
  const result = await run({
    script: `
      # this is a comment before
      identify \\
        wizard:
      # this is a comment after
      `
  })
  t.deepEqual(result.stdout, ['wizard:=>WIZARD GIF 480x640 480x640+0+0 8-bit sRGB 256c 99674B 0.000u 0:00.000'])
})

test('should output files', async t => {
  const result = await run({
    script: `
    convert n.png -scale 50% 1.jpg
    `,
    inputFiles: ['test/assets/n.png']
  })
  t.deepEqual(result.outputFiles.map(f => f.name), ['1.jpg'])
  t.true(true)
})

test('should provide output images as input images to next command', async t => {
    const result = await run({
      script: `
      convert n.png -scale 50% 1.jpg
      convert 1.jpg -rotate 133 2.gif
      `, 
      inputFiles: ['test/assets/n.png']
    })
    t.deepEqual(result.outputFiles.map(f=>f.name), ['2.gif'])
    t.deepEqual(result.results.map(f=>f.outputFiles.map(f=>f.name)), [['1.jpg'],['2.gif']])
    t.true(await imageCompare(result.outputFiles[0], await File.fromFile('test/assets/run_2.gif')))
})

test.skip('should provide output images as input images to next command, tiff error', async t => {
    const result = await run({
      script: `
      convert n.png -scale 50% 1.jpg
      convert 1.jpg -rotate 133 2.tiff
      `, 
      inputFiles: ['test/assets/n.png']
    })
    t.deepEqual(result.outputFiles.map(f=>f.name), ['2.tiff'])
    t.deepEqual(result.results.map(f=>f.outputFiles.map(f=>f.name)), [['1.jpg'],['2.tiff']])
})

