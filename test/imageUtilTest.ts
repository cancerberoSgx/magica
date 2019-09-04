import test from 'ava'
import { File } from '../src'
import { colorCount, imagePixelColor } from '../src/image/imageUtil'
import { imageBuiltIn, listFormat } from '../src/image/support'

test('imagePixelColor', async t => {
  const c = await imagePixelColor(await File.fromFile('test/assets/n.png'), 20, 20)
  t.deepEqual(c, 'srgb(178,182,181)')
  var f = await File.fromFile('test/assets/n.png')
  t.deepEqual(await f!.pixel(22, 10), 'srgb(168,173,169)')
})

test('colorCount', async t => {
  t.deepEqual(await colorCount(await File.fromFile('test/assets/n.png')), 5292)
  var f = await File.fromFile('test/assets/n.png')
  // t.deepEqual(await f!.colorCount(), 5292)
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


