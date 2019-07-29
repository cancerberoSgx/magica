import test from 'ava'
import { writeFileSync } from 'fs'
import { File, run } from '../src'
import { imageBuiltIn } from '../src/image/imageBuiltIn'
import { imagePixelColor } from '../src/image/pixel'
import { listFormat } from '../src/image/support'

test('imagePixelColor', async t => {
  const c = await imagePixelColor(await File.fromFile('test/assets/n.png'), 20, 20)
  t.deepEqual(c, 'srgb(178,182,181)')
})

test('imageBuiltIn with no args should return all ', async t => {
  const c = await imageBuiltIn()
  t.deepEqual(c.map(f => f.name), ['rose:', 'logo:', 'wizard:', 'granite:', 'netscape:'])
})

test('imageBuiltIn with name should return only given ', async t => {
  const c = await imageBuiltIn('logo:')
  t.deepEqual(c.map(f => f.name), ['logo:'])
})

test('listFormat', async t => {
  const c = await listFormat()
  t.truthy(c.find(f => f.name.includes('GIF')))
})

test('fft', async t => {
  const c = await run({
    debug: true,
    script: 'convert rose: -fft +depth +adjoin tmp_fft_%d.jpg'
  })
  console.log(c)

  writeFileSync('tmp_fft1.jpg', c.outputFiles[0].content)
  // writeFileSync( 'tmp_fft2.jpg', c.outputFiles[1]. content)
})

