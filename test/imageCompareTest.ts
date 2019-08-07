import test from 'ava'
import { File, main } from '../src'
import { imageCompare } from '../src/image/imageCompare'

test('should return true same image file', async t => {
  const eq = await imageCompare(await File.fromFile('test/assets/n.png'), await File.fromFile('test/assets/n.png'))
  t.true(eq)
})

test('should return true for equal images different formats', async t => {
  const { outputFiles } = await main({
    command: 'convert n.png 2.tiff',
    inputFiles: [await File.fromFile('test/assets/n.png')]
  })
  const eq = await imageCompare(await File.fromFile('test/assets/n.png'), outputFiles[0])
  t.true(eq)
})

test('should return false for different images', async t => {
  const { outputFiles } = await main({ command: 'convert n.png -charcoal 2 2.png', inputFiles: [await File.fromFile('test/assets/n.png')] })
  const eq = await imageCompare(await File.fromFile('test/assets/n.png'), outputFiles[0])
  t.false(eq)
})
