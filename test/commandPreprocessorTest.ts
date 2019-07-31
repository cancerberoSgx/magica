import test from 'ava'
import { File } from '../src'
import { run } from '../src/main/run'
import { notUndefined } from 'misc-utils-of-mine-generic';

test('script template', async t => {
  const result = await run({
    // debug: true,
    script: `
      identify <%= inputFiles[1].name%>
      `,
    inputFiles: [await File.fromFile('test/assets/n.png'), await File.fromFile('test/assets/chala.tiff')],
  })
  t.true(result.stdout.join().includes('chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B'))
})

test('script with template, comments multi lines and spaces', async t => {
  const result = await run({
    script: `
      # c1 
      identify \\
      # c2
      <%= inputFiles[0].name%>
      # c3
      `,
    inputFiles: [await File.fromFile('test/assets/chala.tiff')],
  })
  t.true(result.stdout.join().includes('chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B'))
})


test('custom commands', async (t) => {
  const script = `
  convert rose: bar.gif
  {  this.pushStdout('hello') }
  {  this.pushStdout(...FS.readdir('.')) } `
  var result = await run({
    script,
    protectOutputFiles: true,
  })
  t.deepEqual(result.stdout.filter(notUndefined), ['hello', 'bar.gif'])
  result = await run({
    script
  })
  t.deepEqual(result.stdout.filter(notUndefined), ['hello'])

})

// test('custom commands and templates together', async (t) => {
//   const script = `
//   <%= var img %>
//   { img = await run({script}) this.pushStdout('hello') }
//   {  this.pushStdout(...FS.readdir('.')) } `
//   var result = await run({
//     script,
//     protectOutputFiles: true,
//   })
//   t.deepEqual(result.stdout.filter(notUndefined), ['hello', 'bar.gif'])
//   result = await run({
//     script
//   })
//   t.deepEqual(result.stdout.filter(notUndefined), ['hello'])

// })

test.todo('register new processor')


