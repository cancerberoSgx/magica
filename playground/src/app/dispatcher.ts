import { File, Options } from 'magica'
import { serial, sleep } from 'misc-utils-of-mine-generic'
import { Example } from './examples'
import { getStore } from './store'
import { callMain } from './workerAccess'

export async function main(o: Partial<Options>) {
  getStore().setState({
    working: true
  })
  const result = await callMain({ ...o, debug: true, inputFiles: getStore().getState().inputFiles })
  getStore().setState({ result, working: false })
  return result
}

export async function loadImageFromUrl(u: string) {
  getStore().setState({
    working: true
  })
  const f = await File.fromUrl(u)
  if (f && f.content && f.name) {
    getStore().setState({
      working: false,
      inputFiles: [...getStore().getState().inputFiles, f]
        .filter((f, i, a) => a.findIndex(g => g.name === f.name) === i)
    })
  }
}

export async function setExample(example: Example) {
  await serial(example.inputFiles.map(file => async () => await loadImageFromUrl(file)))
  getStore().setState({
    example
  })
  await main(example)
  await sleep(300)

}
