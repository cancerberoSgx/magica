import { serial, sleep, getGlobal } from 'misc-utils-of-mine-generic'
import runText from './tests/runText'
import simpleConvert from './tests/simpleConvert'
import simpleIdentify from './tests/simpleIdentify'
import { assert, log } from './testUtil'
(async ()=>{
  
  const MAGICA_TEST_TO_RUN = [
    simpleIdentify,
    simpleConvert,
    runText
  ]
  await serial(MAGICA_TEST_TO_RUN.map(test => async () => {
    try {
      await test()
    } catch (ex) {
      assert(false, ex.toString())
      console.error(ex);
    }
  }))
  await sleep(500)

  log('TEST_FINISH =true')
  getGlobal().TEST_FINISH = 'TEST_FINISH =true'
})()
