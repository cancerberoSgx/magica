import { Options, File } from 'magica'
import { callMain } from './workerAccess'
import { getStore } from './store'
import { notSame, notSameNotFalsy, serial, sleep } from 'misc-utils-of-mine-generic'
import { Example } from './examples'

export async function main(o: Partial<Options>) {
  const result = await callMain({ ...o, debug: true, inputFiles: getStore().getState().inputFiles })
  getStore().setState({ result })
  return result
}

export async function loadImageFromUrl(u: string) {
  const f = await File.fromUrl(u)
  if (f && f.content && f.name) {
    getStore().setState({
      inputFiles: [...getStore().getState().inputFiles, f]
        .filter((f, i, a) => a.findIndex(g => g.name === f.name) === i)
    })
  }
}

export async function setExample(example: Example) {
  await serial(example.inputFiles.map(file => async () => await loadImageFromUrl(file)))

  // await sleep(300)
  getStore().setState({
    example
  })
  // await sleep(300)


  // getStore().setState({
  //   example, 
  //   inputFiles: [...getStore().getState().inputFiles||[], ...inputFiles]
  //   .filter((f,i,a)=>a.findIndex(g=>g.name===f.name)===i)
  // })
  await main(example)
  await sleep(300)

}
