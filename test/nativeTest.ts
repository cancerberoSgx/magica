import test from 'ava'
import { main } from '../src'

test('wasm FS behavior', async t => {
  var r = await main({ command: 'convert -version' })
  t.falsy(r.error)
  t.true(r.stdout.join().includes('Version: ImageMagick'))
})

// test('fs.readFile, and IM IO primitives throwing exceptions', async t => {
//   const {FS:FS} = await magickLoaded
//   t.deepEqual(t.throws(()=> FS.readFile('/non_existent.txt')).message, 'FS error')
//  t.notThrows(()=> FS.writeFile('/non_existent.txt', '')) 
//  t.deepEqual(t.throws(()=> FS.writeFile('/non/foo/bar/non_existent.txt', '')).message, 'FS error') 

// //  t.deepEqual(t.throws(()=> FS.writeFile('/non_existent.txt', '')).message, 'adincludes');

//   // t.throws()
//   // var r = await main({command: 'convert -version'})
//   // t.falsy(r.error)
//   // t.true(r.stdout.join().includes('Version: ImageMagick'))
// })
