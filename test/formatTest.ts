import test from 'ava'
import { execSync } from 'child_process'
import { run, File, imageCompare, main } from '../src';
import fileType = require('file-type');
import { writeFileSync } from 'fs';

test.serial('identify', async t => {
  let r = execSync('npx ts-node -T test/assets/formatConvertIdentifyScript.ts')
  // console.log(r.toString());
  // t.notThrows(() => r = execSync('npx ts-node -T test/assets/formatConvertIdentifyScript.ts'))
  t.true(r.toString().includes('total time:'))
})

test('webp read', async t => {
  const result = await run({
    script: `
      convert ear.webp -scale 200% ear.gif
      `,
    // debug: true,
    inputFiles: ['test/assets/ear.webp']
  }) 
   t.deepEqual(result.stderr, [])
  t.falsy(result.error)
  t.deepEqual(fileType(result.outputFiles[0].content.buffer), { ext: 'gif', mime: 'image/gif' })
  t.true(await imageCompare(await File.fromFile('test/assets/ear.webp'), result.outputFiles[0]))

})

test('webp read main', async t => {
  const result = await main({
    command: `
      convert ear.webp -scale 200% ear.png
      `.trim().split(' '),
    // debug: true,
    inputFiles: ['test/assets/ear.webp']
  }) 
  //  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
  writeFileSync('tmp.png', result.outputFiles[0].content)
  t.deepEqual(fileType(result.outputFiles[0].content.buffer), { ext: 'png', mime: 'image/png' })
  t.true(await imageCompare(await File.fromFile('test/assets/ear.webp'), result.outputFiles[0]))
  t.false(await imageCompare(await File.fromFile('test/assets/n.png'), result.outputFiles[0]))

})

// test('dummy', async t => {
//   t.true(true)
// })
