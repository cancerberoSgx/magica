import test from 'ava'
import { File, imageCompare, run } from '../src'
import { imageBuiltIn } from '../src/image/imageBuiltIn'
import { colorCount, imagePixelColor } from '../src/image/imageUtil'
import { listFormat } from '../src/image/support'
import { writeFileSync } from 'fs';

test('imagePixelColor', async t => {
  const c = await imagePixelColor(await File.fromFile('test/assets/n.png'), 20, 20)
  t.deepEqual(c, 'srgb(178,182,181)')
  var f = await File.fromFile('test/assets/n.png')
  t.deepEqual(await f!.pixel(22, 10), 'srgb(168,173,169)')
})

test('colorCount', async t => {
  t.deepEqual(await colorCount(await File.fromFile('test/assets/n.png')), 5292)
  var f = await File.fromFile('test/assets/n.png')
  t.deepEqual(await f!.colorCount(), 5292)
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
  const c = await run<File>({
    script: `
    convert -size 32x32 gradient: -chop 0x1 -rotate 90 -evaluate sine 16 sine4.png
    convert sine4.png -fft +delete -contrast-stretch 0 -evaluate log 100 sine4_spectrum.png`
  })
  t.deepEqual(undefined, c.error)
  t.true(await imageCompare(await File.fromFile('test/assets/fft1.png'), c.outputFiles[0]))
})

test.skip('autotrace', async t => {
  const result = await run<File>({
    script: `
    convert rose: p.pnm
    convert p.pnm -rotate 54 -scale 200% rose.svg`
  })
  writeFileSync('tmpww.svg', result.outputFiles[0].content)
  t.deepEqual(undefined, result.error)
  // t.true(await imageCompare(await File.fromFile('test/assets/fft1.png'), result.outputFiles[0]))
})
