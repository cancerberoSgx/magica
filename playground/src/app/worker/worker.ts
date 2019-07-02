import 'babel-polyfill'
import { main } from 'magica'


self.onmessage = async e => {
  if (!e.data.magicaId) {
    throw new Error('message data without magicaId')
  }
  const r = await main(e.data)
  postMessage({ ...r, magicaId: e.data.magicaId }, undefined as any)
}
