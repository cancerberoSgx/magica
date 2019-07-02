import test from 'ava'
import { execSync } from 'child_process'

test('identify', async t => {
  let r: Buffer
  t.notThrows(() => r = execSync('npx ts-node -T test/assets/formatConvertIdentifyScript.ts'))
  t.true(r!.toString().includes('total time:'))
})
