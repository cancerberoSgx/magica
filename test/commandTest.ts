import test from 'ava'
import { arrayToCli } from '../src/main/command'

test('arrayToCli should support simple commands', async t => {
  t.deepEqual(arrayToCli(['convert', 'foo.png', '-sharpen', '10x8', 'bar.gif']), 'convert foo.png -sharpen 10x8 bar.gif')

})

test('arrayToCli should escape parenthesis', async t => {
  t.deepEqual(arrayToCli(['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif']), `convert foo.png \\( +clone -channel R -fx B \\) +swap -channel B -fx v.R bar.gif`)
})

test('arrayToCli should quote arguments with spaces', async t => {
  t.deepEqual(arrayToCli(['convert', 'input foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'output bar.gif']), `convert 'input foo.png' \\( +clone -channel R -fx B \\) +swap -channel B -fx v.R 'output bar.gif'`)
})


//   })

//   describe('cliToArray', () => {

//     it('should support simple commands', () => {
//       expect(cliToArray(`convert foo.png -rotate 90 bar.gif`))
//         .toEqual([['convert', 'foo.png', '-rotate', '90', 'bar.gif']])
//     })

//     it('should support commands with quoted arguments', () => {
//       expect(cliToArray(`convert 'my picture.png' -rotate 90 'output image.png'`))
//         .toEqual([['convert', 'my picture.png', '-rotate', '90', 'output image.png']])
//     })

//     it('should support escaped parenthesis', () => {
//       expect(cliToArray(`convert foo.png \\( +clone -channel R -fx B \\) +swap -channel B -fx v.R bar.gif`))
//         .toEqual([['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif']])
//     })

//     it('should support multiple commands separated by new line', () => {
//       expect(cliToArray(`
// convert rose: -sharpen 0x1 reconstruct.jpg
// compare rose: reconstruct.jpg difference.png
// compare -compose src rose: reconstruct.jpg difference.png
//       `))
//         .toEqual([
//           ['convert', 'rose:', '-sharpen', '0x1', 'reconstruct.jpg'],
//           ['compare', 'rose:', 'reconstruct.jpg', 'difference.png'],
//           ['compare', '-compose', 'src', 'rose:', 'reconstruct.jpg', 'difference.png'],
//         ])

//     })

//     it('should support multiple commands separated by new line and respect the \\ character to continue the same command in another line', () => {

//       expect(cliToArray(`
// convert foo.png \\( +clone -channel R -fx B \\) \\
//   +swap -channel B -fx v.R bar.gif
// convert bar.gif -resize 50% out.tiff
//       `))
//         .toEqual([
//           ['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif'],
//           ['convert', 'bar.gif', '-resize', '50%', 'out.tiff']])

//     })

//     it('', async done=>{
//       // expect(cliToArray(` 
//       // identify -format %wx%h\\n
//       // `).map(s=>s+'')).toEqual(['identify', '-format', '%wx%h\n'])

//       console.log(cliToArray(` 
//       identify -format %wx%h\\n
//       `));

//     //   // expect(cliToArray(` 
//     //   // identify -format '%wx%h\n'
//     //   // `)).toBe([])

//     //   // expect(cliToArray(` 
//     //   // convert logo: -resize \`identify -format %wx%h\\n rose:\` out1.png
//     //   // `)).toBe([])

//       done()
//     })


//     describe('asCommand', () => {
//       it('should support multiple commands separated by new line and respect the \\ character to continue the same command in another line - all in the same string - no arrays', () => {

//         expect(asCommand(`
//   convert foo.png \\( +clone -channel R -fx B \\) \\
//     +swap -channel B -fx v.R bar.gif
//   convert bar.gif -resize 50% out.tiff
//         `))
//           .toEqual([
//             ['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif'],
//             ['convert', 'bar.gif', '-resize', '50%', 'out.tiff']])

//       })

//       it('should support multiple commands separated by new line and respect the \\ character to continue the same command in another line - all as an array of 1 element', () => {

//         expect(asCommand([`
//   convert foo.png \\( +clone -channel R -fx B \\) \\
//     +swap -channel B -fx v.R bar.gif
//   convert bar.gif -resize 50% out.tiff
//         `,
//           `convert bar.gif -resize 50% out.tiff`,
//         ]))
//           .toEqual([
//             ['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif'],
//             ['convert', 'bar.gif', '-resize', '50%', 'out.tiff'],

//             ['convert', 'bar.gif', '-resize', '50%', 'out.tiff']])

//       })

//       it('should do nothing for valid command inputs', () => {

//         expect(asCommand([['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif'],
//         ['convert', 'bar.gif', '-resize', '50%', 'out.tiff']]))
//           .toEqual([
//             ['convert', 'foo.png', '(', '+clone', '-channel', 'R', '-fx', 'B', ')', '+swap', '-channel', 'B', '-fx', 'v.R', 'bar.gif'],
//             ['convert', 'bar.gif', '-resize', '50%', 'out.tiff']])

//       })

//     })
//   })

// })
