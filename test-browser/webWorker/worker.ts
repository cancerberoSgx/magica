import { main } from '../../src'

self.onmessage = async e => {
  const r = await main(e.data)
  postMessage(r, undefined as any)
}
