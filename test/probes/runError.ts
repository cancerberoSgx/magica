// import test from 'ava'
import { run } from '../../src/main/run'

// test('should run a single command with comments, spaces and command break line', async t => {
//   const result = await run({
//     script: `
//       # this is a comment before
//       identify \\
//         wizard:
//       # this is a comment after
//       `
//   })
//   t.deepEqual(result.stdout, ['wizard:=>WIZARD GIF 480x640 480x640+0+0 8-bit sRGB 256c 99674B 0.000u 0:00.000'])
// })

// test('should output files', async t => {
//   const result = await run({
//     script: `
//     convert n.png -scale 50% 1.jpg
//     `,
//     inputFiles: ['test/assets/n.png']
//   })
//   t.deepEqual(result.outputFiles.map(f => f.name), ['1.jpg'])
//   t.true(true)
// })

// test('should provide output images as input images to next command', async t => {
try {
  (async () => {
    const result = await run({
      script: `
        convert n.png -scale 50% 1.jpg
        convert 1.jpg -scale 50% 2.tiff
        `,
      inputFiles: ['test/assets/n.png']
    })
  })()
  // t.deepEqual(result.outputFiles.map(f=>f.name), ['2.tiff'])
  // t.deepEqual(result.results.map(f=>f.outputFiles.map(f=>f.name)), [['1.jpg'],['2.tiff']])
  // t.true(true)
} catch (error) {
  console.log(error)

}

// })

