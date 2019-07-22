import { serial } from 'misc-utils-of-mine-generic'
import runText from './tests/runText'
import simpleConvert from './tests/simpleConvert'
import simpleIdentify from './tests/simpleIdentify'
import { assert } from './testUtil'

const all = [
  simpleIdentify,
  simpleConvert,
  runText
]
serial(all.map(test => async () => {
  try {
    await test()
  } catch (ex) {
    assert(false, ex.toString())
    console.error(ex);
  }
}))
