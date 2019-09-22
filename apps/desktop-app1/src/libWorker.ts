// import { Window, MessageLoop, Label, Container, } from 'gui'
// console.log(MessageLoop.postTask);

// import { run } from 'magica'
// import { expose } from "threads/worker"
import { loadLibraries } from './imageUtil'

// async function test() {
//   const r = await run({ script: 'identify rose:' })
//   return r.stdout
// }
// async function test2(name: string, content: ArrayBuffer, output: string) {
//   await run({ script: `convert ${name} -rotate 33 ${output}` })
// }
// // async function test3(name: string, content: ArrayBuffer, output: string) {
// //   return cv.getBuildInformation()
// // }
// const handlers = { loadLibraries, test, test2 }
// export type Handlers = typeof handlers
// expose(handlers)

import { Worker, isMainThread, parentPort, workerData}  from 'worker_threads'

loadLibraries().then(()=>{
parentPort!.postMessage('loadLibraries');
})