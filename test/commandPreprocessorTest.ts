import test from 'ava'
import { File } from '../src'
import { run } from '../src/main/run'
import { writeFileSync } from 'fs';

test('script template', async t => {
  const result = await run({
    script: `
      identify <%= inputFiles[1].name%>
      `,
    inputFiles: [await File.fromFile('test/assets/n.png'), await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(result.stdout, ['chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B 0.000u 0:00.000'])
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
  t.deepEqual(result.stdout, ['chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B 0.000u 0:00.000'])
})



test.todo('register new processor')


