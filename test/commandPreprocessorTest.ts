import test from 'ava'
import { File } from '../src'
import { run } from '../src/main/run'
import template from 'lodash.template'

test('script template', async t => {
  const result = await run({
    script: `
      identify <%= inputFiles[1].name%>
      `,
    inputFiles: [await File.fromFile('test/assets/n.png'), await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(result.stdout, ['chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B 0.000u 0:00.000'])
})

test('script template with comments multi lines and spaces', async t => {
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

test('template test', async t => {
  const t2 = `
    # c1
    identify \\
    # c2
    <%= name %>
    # c3
    `
    const expected = `
    # c1
    identify \\
    # c2
    seba
    # c3
    `
    const r = template(t2)
    const s = r( { name: 'seba' })
  t.deepEqual(s, expected)
})

test.todo('register new processor')
