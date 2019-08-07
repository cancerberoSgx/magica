import test from 'ava'
import { execSync } from 'child_process';

test('identify', async t => {
  await t.notThrowsAsync (async ()=> execSync('npm run build'))
  let b:Buffer
  await t.notThrowsAsync (async ()=> {
    b = await execSync('node bin/magick-wasm --help')
  })
  t.true(b!.toString().includes('ImageMagick WASM builder'))
})
