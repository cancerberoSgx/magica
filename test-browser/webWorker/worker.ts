import 'babel-polyfill'
import { main } from '../../src'


self.onmessage = async (e: any) => {
  const r = await main(e.data)
  postMessage(r, undefined as any)
}
