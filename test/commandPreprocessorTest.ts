import test from 'ava'
import { File } from '../src'
import { run } from '../src/main/run'

test('script template', async t => {
  const result = await run({
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



test.todo('register new processor')


