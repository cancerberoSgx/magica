import { File, Options, RunOptions } from 'magica'
import { serial, sleep } from 'misc-utils-of-mine-generic'
import { Example } from './examples'
import { getStore } from './store'
import { callRun } from './workerAccess';

// export async function run(o: RunOptions) {
//   getStore().setState({
//     working: true
//   })
//   const result = await callRun(o)
//   getStore().setState({ result, working: false })
//   return result
// }

export async function loadImageFromUrl(u: string) {
  var state = getStore().getState()
  getStore().setState({
    working: true
  })
  const f = await File.fromUrl(u)
  if (f && f.content && f.name) {
    getStore().setState({
      working: false,
      inputFiles: [f, ...state.inputFiles]     .filter((f, i, a) => a.findIndex(g => g.name === f.name) === i)
    })
  }
}

export async function setExample(example: Example) {
  var state = getStore().getState()
  getStore().setState({
    working: true
  })
var inputFiles = [...await serial(example.inputFiles.filter(f=>!state.inputFiles.find(f2=>f2.name==f)).map(file => async ()=>File.fromUrl(file))), ...state.inputFiles]
  const script = example.script({...state, inputFiles})
  var result = await callRun({
    script, inputFiles
  })
  // const result = await callRun(o)

        getStore().setState({
          example,
          script,
          result,
          inputFiles,
          working: false
        })
  await sleep(300)

}
