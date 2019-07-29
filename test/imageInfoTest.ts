import test from 'ava'
import { File } from '../src'
import { imageInfo } from '../src/image/imageInfo'

test('should extract image info', async t => {
  const i = JSON.stringify(await imageInfo(await File.fromFile('test/assets/n.png')))
  t.true(i.includes('"format":"PNG"'))
  t.true(i.includes('"geometry":{"width":109,"height":145'))
  t.true(i.includes('"mean":12'))
  t.true(i.includes('"channelStatistics":{"Red":{"min":0,"max":237'))
  t.true(i.includes('"colorspace":"sRGB","depth":8,'))
  t.true(i.includes('"mimeType":"image/png",'))
})
