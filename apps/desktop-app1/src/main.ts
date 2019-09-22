import { flatInstallArrayPrototype } from 'misc-utils-of-mine-generic'
flatInstallArrayPrototype()
import { loadLibraries } from './imageUtil'
import { App1 } from './app'
import { getInitialState, _setState } from "./store"

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
 