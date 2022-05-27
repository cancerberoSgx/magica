import test from 'ava'
import { File, main, run } from '../src'
import { colorCount, imagePixelColor } from '../src/image/imageUtil'
import { imageBuiltIn, listFormat } from '../src/image/support'
import { arrayBufferToString } from '../src/util/base64'

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

// test('seba', async t =>{
//   // const r = await run({
//   //   command: `convert n.png -format %[pixel:p{2,2}] info:`,    
//   //   inputFiles: [File.fromFile('test/assets/n.png')],
//   // })
//   // console.log('sebaaa');
  
//   const r = await main({
//     inputFiles: [File.fromFile('test/assets/n.png')],
//     command: `convert n.png -format "%[pixel:p{2,2}]\\\\n" info:`,
//     // verbose: true
//   })
  
//   // console.log(r.stdout.join(''));
//   console.log('HELLO', r.stdout)//arrayBufferToString(r.outputFiles[0].content.buffer));
  
  
// })


