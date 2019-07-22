import { main } from '../../src'
import { assertEquals, log } from '../testUtil'

export default async function() {
  const result = await main({
    command: ['identify', 'rose:'],
    inputFiles: []
  })
  assertEquals(result.stdout.join(''), 'rose:=>ROSE PNM 70x46 70x46+0+0 8-bit sRGB 9673B 0.000u 0:00.000')
  log(result.stdout.join(''))
}

