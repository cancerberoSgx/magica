import { Options, Result } from 'magica'
import { unique, Deferred } from 'misc-utils-of-mine-generic'
import { setOptions } from '../../../dist/src/options'

let pending: { magicaId: string, deferred: Deferred<Result | undefined> }[] = []

export async function callMain(o: Partial<Options>) {
  const magicaId = unique()
  const deferred = new Deferred<Result | undefined>()
  pending.push({ magicaId, deferred })
  worker.postMessage({ ...o, magicaId })
  const result = await deferred
  return result

}

let worker = new Worker('./worker/worker.ts')

worker.onmessage = async e => {
  const i = pending.findIndex(p => p.magicaId === e.data.magicaId)
  const p = pending[i]
  pending.splice(0, i).forEach(q => q !== p && q.deferred.resolve(undefined))
  if (p) {
    p.deferred.resolve(e.data)
  } else {
    //  throw new Error('WARNING message for no pending')
  }
}
