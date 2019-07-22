import { Options, Result, RunOptions, RunResult } from 'magica'
import { Deferred, unique } from 'misc-utils-of-mine-generic'

let pending: { magicaId: string, deferred: Deferred<any> }[] = []

// export async function callMain(o: Partial<Options>) {
//   const magicaId = unique()
//   const deferred = new Deferred<Result | undefined>()
//   pending.push({ magicaId, deferred })
//   worker.postMessage({ ...o, magicaId })
//   const result = await deferred
//   return result
// }

export async function callRun(o: RunOptions) {
  const magicaId = unique()
  const deferred = new Deferred<RunResult | undefined>()
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
