import test from 'ava'
import { File, imageCompare } from '../src'
import { run } from '../src/main/run'

test('should run a single command with comments, spaces and command break line', async t => {
  const r = await run({
    script: `
      # this is a comment before
      identify \\
        wizard:
      # this is a comment after
      `
  })
  t.true(r.stdout.join().includes('wizard:=>WIZARD GIF 480x640 480x640+0+0 8-bit sRGB 256c 99674B'))
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

test('should output files2', async t => {
  const result = await run({
    script: `
     convert logo.jpg -scale 50% 2.png
    `,
    inputFiles: ['test/assets/logo.jpg']
  })
  t.deepEqual(result.outputFiles.map(f => f.name), ['2.png'])
  t.true(true)
})

test('should provide output images as input images to next command', async t => {
  const result = await run({
    script: `
      convert n.png -scale 50% 1.jpg
      convert 1.jpg -rotate 133 2.gif
      `,
    debug: true,
    inputFiles: ['test/assets/n.png']
  })
  t.deepEqual(result.outputFiles.map(f => f.name), ['2.gif'])
  t.deepEqual(result.results.map(f => f.outputFiles.map(f => f.name)), [['1.jpg'], ['2.gif']])
  t.true(await imageCompare(result.outputFiles[0], await File.fromFile('test/assets/run_2.gif')))
})

test('should provide output images as input images to next command, tiff repage error', async t => {
  const result = await run({
    script: `
      convert chala.tiff -scale 50% 1.jpg
      convert 1.jpg -rotate 133 +repage 2.tiff
      `,
    debug: true,
    inputFiles: ['test/assets/chala.tiff']
  })
  t.deepEqual(result.outputFiles.map(f => f.name), ['2.tiff'])
  t.deepEqual(result.results.map(f => f.outputFiles.map(f => f.name)), [['1.jpg'], ['2.tiff']])
})

test.todo('error handling')
