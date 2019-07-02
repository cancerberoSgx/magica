import test from 'ava'
import fetch from 'cross-fetch'
import { InputFile } from '../src/file'
import { main } from '../src/main/main'
import fileType = require('file-type')

test('from url request', async t => {
  const u = 'https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg', o = {}
  const r = await fetch(u, o)
  const content = await r.arrayBuffer()

  const result = await main({
    command: ['identify', 'bridge.jpg'],
    inputFiles: [{ name: 'bridge.jpg', content: new Uint8Array(content) }]
  })
  t.deepEqual(result.stdout.join(''), 'bridge.jpg JPEG 500x333 500x333+0+0 8-bit sRGB 35527B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})

test('InputFile.fromUrl', async t => {
  const url = 'https://cancerberosgx.github.io/demos/geometrizejs-cli/bridge.jpg'
  const result = await main({
    command: ['identify', 'bridge.jpg'],
    inputFiles: [await InputFile.fromUrl(url)]
  })
  t.deepEqual(result.stdout.join(''), 'bridge.jpg JPEG 500x333 500x333+0+0 8-bit sRGB 35527B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})

test('InputFile.fromFile', async t => {
  let result = await main({
    command: ['convert', 'chala.tiff', '-scale', '200%', 'bigger.tiff'],
    inputFiles: [await InputFile.fromFile('test/assets/chala.tiff')],
    debug: true
  })
  t.deepEqual(fileType(result.outputFiles[0].content.buffer), { ext: 'tif', mime: 'image/tiff' })
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
  result = await main({
    command: ['identify', 'bigger.tiff'],
    inputFiles: result.outputFiles
  })
  t.deepEqual(result.stdout.join(''), 'bigger.tiff TIFF 100x100 100x100+0+0 8-bit sRGB 30346B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})

test('accept array buffer view', async t => {
  let result = await main({
    command: ['convert', 'chala.tiff', '-scale', '200%', 'bigger.tiff'],
    inputFiles: [await InputFile.fromFile('test/assets/chala.tiff')],
    debug: true
  })
  t.deepEqual(fileType(result.outputFiles[0].content.buffer), { ext: 'tif', mime: 'image/tiff' })
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
  result = await main({
    command: ['identify', 'bigger.tiff'],
    inputFiles: result.outputFiles
  })
  t.deepEqual(result.stdout.join(''), 'bigger.tiff TIFF 100x100 100x100+0+0 8-bit sRGB 30346B 0.000u 0:00.000')
  t.deepEqual(result.stderr, [])
  t.falsy(result.error)
})
