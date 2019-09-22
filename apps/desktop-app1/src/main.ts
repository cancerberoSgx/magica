import { Window, MessageLoop, Label, Container, } from 'gui'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'
import { flatInstallArrayPrototype } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { _setState, getInitialState } from './store'
import { App1 } from './app'
import { loadLibraries } from './imageUtil'
flatInstallArrayPrototype()

async function main() {
  const win = Window.create({ transparent: false, frame: true })
  const c = Container.create()
  c.setStyle({ flex: 1 })
  const label = Label.create('Loading Libraries...')
  label.setStyle({ flex: 1 })
  c.addChildView(label)
  win.setContentView(c)
  win.setContentSize({ width: 200, height: 100 })
  win.center()
  win.activate()
  if (!process.versions.yode) {
    MessageLoop.run()
  }
  MessageLoop.postTask(async () => {
    await loadLibraries()
    win.close()
    _setState(getInitialState())
    const app = new App1({})
    app.render()
    app.start()
  })
}
main().catch(console.error)
