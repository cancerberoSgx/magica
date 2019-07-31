import 'babel-polyfill'
import { run, File } from 'magica'

self.onmessage = async e => {
  if (!e.data.magicaId) {
    throw new Error('message data without magicaId')
  }
  // e.data.inputFiles = (e.data.inputFiles||[]).map(File.asFile)
  // debugger
  const r = await run(e.data)
  postMessage({ ...r, magicaId: e.data.magicaId }, undefined as any)
}
