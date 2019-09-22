import { flat } from 'misc-utils-of-mine-generic'
// import { spawn } from 'threads'
import { loadLibraries } from './loadLibraries'
import { App1 } from './app'
import { getInitialState, _setState } from "./store"

if (typeof Array.prototype.flat === 'undefined') {
  Array.prototype.flat = function(this: any[]) {
    return flat(this)
  }
}

async function main() {
  console.log('Loading libraries...')
  await loadLibraries()
  console.log('Starting App...')
  _setState(getInitialState())
  const app = new App1({})
  app.render()
  app.start()
}
main().catch(console.error)

// async function main2() {
//   const w = new Worker("./libWorker")
//   const handlers = await spawn(w)
//   await handlers.loadLibraries()
//   console.log('res', await handlers.test())
//   console.log('res', await handlers.test3())
//   w.terminate()
// }
// // main2().catch(console.error)
