import 'babel-polyfill'
import { test4 } from './test4'
import { loadOpencv } from 'mirada'

async function main() {
  // await sleep(1000)
  await loadOpencv()
  await test4()
}
main()


