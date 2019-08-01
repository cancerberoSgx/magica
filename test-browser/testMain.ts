import { getGlobal, serial } from 'misc-utils-of-mine-generic'
import runText from './tests/runText'
import simpleConvert from './tests/simpleConvert'
import simpleIdentify from './tests/simpleIdentify'
import { assert } from './testUtil';

(async () => {
  assert(!getGlobal().browserTest_ts_TEST_FINISHl, '')
  const MAGICA_TEST_TO_RUN = [
    simpleIdentify,
    simpleConvert,
    runText
  ]
  await serial(MAGICA_TEST_TO_RUN.map(test => async () => {
    try {
      await test()
    } catch (ex) {
      console.error(ex);
      assert(false, ex.toString())
    }
  }))
  getGlobal().browserTest_ts_TEST_FINISH = 'browserTest_ts_TEST_FINISH'
  return true
})()
