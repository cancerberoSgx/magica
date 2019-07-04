import test from 'ava'
import { File, main } from '../src'
import { imagePixelColor } from '../src/image/pixel';

test('imagePixelColor', async t => {
  const c = await imagePixelColor(await File.fromFile('test/assets/n.png'),20,20)
  t.deepEqual(c, 'srgb(178,182,181)')
})
