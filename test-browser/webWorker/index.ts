
const worker = new Worker('worker.ts')
worker.addEventListener('message', e => {
  console.log(e.data)
})
worker.postMessage({
  command: `identify rose:`
})
