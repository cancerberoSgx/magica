import test from 'ava'
import { setObjectProperty } from 'misc-utils-of-mine-generic'
import { File } from '../src'
import { imageInfo } from '../src/image/imageInfo'

test('should extract image info', async t => {
  const i = JSON.stringify(await imageInfo(await File.fromFile('test/assets/n.png')))
  t.true(i.includes('"format":"PNG"'))
  t.true(i.includes('"geometry":{"width":109,"height":145'))
  t.true(i.includes('"standardDeviation":14841.5,"kurtosis":-0.836822,"skewness":-0.813355,'))
  t.true(i.includes('"channelStatistics":{"Red":{"min":0,"max":237,"mean":129.561,"standardDeviation":13774.6,'))
  t.true(i.includes('"filesize":"4152B","numberPixels":"15805",'))
  t.true(i.includes('"mimeType":"image/png",'))
})
