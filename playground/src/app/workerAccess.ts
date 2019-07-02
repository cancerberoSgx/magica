import {Options, Result } from 'magica'
import { unique, Deferred } from 'misc-utils-of-mine-generic';

let pending: {magicaId:string, deferred: Deferred<Result>}[] = []

export async function callMain(o: Partial<Options>) {
  const magicaId = unique()
  const deferred = new Deferred<Result>()
  pending.push({magicaId, deferred})
  worker.postMessage({...o, magicaId})
  const result = await deferred
return result
    
}

let worker = new Worker('./worker/worker.ts')

worker.onmessage = async e=>{
  const p = pending.find(p=>p.magicaId===e.data.magicaId)
  pending = pending.filter(r=>r!==p)
 if(p){
   p.deferred.resolve(e.data)
 }else {
   throw new Error('WARNING message for no pending')
 }
}