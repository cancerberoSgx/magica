import test from 'ava'
import { execSync } from 'child_process'
import { enumKeys } from 'misc-utils-of-mine-generic'
import { imList } from '../src'

test.skip('low level identify', async t => {
  const s = execSync('node test/assets/lowlevelTestScript')
  t.true(s.toString().includes('The format is: png'))
})

test('imLists', async t => {
  t.deepEqual(enumKeys(imList.Weight).sort(), ['Thin', 'ExtraLight', 'UltraLight', 'Normal', 'Regular', 'Medium', 'DemiBold', 'SemiBold', 'Bold', 'ExtraBold', 'UltraBold', 'Heavy', 'Black'].sort())
})
