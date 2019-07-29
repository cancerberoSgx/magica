import test from 'ava'
import { execSync } from 'child_process'

test.skip('low level identify', async t => {
  const s = execSync('node test/assets/lowlevelTestScript')
  t.true(s.toString().includes('The format is: png'))
})

test('dummy', async t=>{
  t.true(true)
})