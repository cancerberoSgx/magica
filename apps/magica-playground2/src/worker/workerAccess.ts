import { RunOptions, RunResult } from 'magica'
import { Deferred, unique } from 'misc-utils-of-mine-generic'
import { ExampleFields } from 'magica-examples'

let pending: { magicaId: string, deferred: Deferred<RunResult | undefined> }[] = []

export type RunConfig = RunOptions & { fields: ExampleFields }

export async function callRun(o: RunConfig): Promise<RunResult | undefined> {
  const magicaId = unique()
  const deferred = new Deferred<RunResult | undefined>()
  pending.push({ magicaId, deferred })
  worker.postMessage({ ...o, magicaId })
  return await deferred
}

let worker = new Worker('./worker.ts')

worker.onmessage = async e => {
  const i = pending.findIndex(p => p.magicaId === e.data.magicaId)
  const p = pending[i]
  pending.splice(0, i).forEach(q => q !== p && q.deferred.resolve(undefined))
  if (p) {
    var r = e.data as RunResult
    p.deferred.resolve(r)
  } else {
    //  throw new Error('WARNING message for no pending')
  }
}
