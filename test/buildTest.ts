import test from 'ava'
import { execSync } from 'child_process'

test('default is q16 hdri', async t => {
  await t.notThrowsAsync(async () => execSync('npm run build'))
  let r: Buffer | undefined
  await t.notThrowsAsync(async () => { r = execSync('node bin/magica --input --command "convert -version"') })
  t.true(r && !['Q16 x86_64', 'HDRI'].find(s => !r!.toString().trim().includes(s)))
})

test.todo('change to q8 wasm, rebuild and check version info')
