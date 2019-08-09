import { File } from 'magica'
import { Example } from 'magica-examples'
import { arrayToObject, notUndefined, serial, sleep } from 'misc-utils-of-mine-generic'
import { getStore } from './store'
import { callRun } from './workerAccess'

export async function loadImageFromUrl(u: string) {
  var state = getStore().getState()
  getStore().setState({
    working: true
  })
  const f = await File.fromUrl(u)
  if (f && f.content && f.name) {
    getStore().setState({
      working: false,
      inputFiles: [f, ...state.inputFiles].filter((f, i, a) => a.findIndex(g => g.name === f.name) === i)
    })
  }
}

export async function setExample(example?: Example) {
  var state = getStore().getState()
  var fields = example && example.fields ? example.fields : state.fields || []
  getStore().setState({
    working: true,
    fields,
  })
  var inputFiles = [...await serial((example ? example.inputFiles : state.inputFiles.map(f => f.name)).filter(f => !state.inputFiles.find(f2 => f2.name == f)).map(file => async () => File.fromUrl(file))), ...state.inputFiles].filter(notUndefined)
  const script = example ? example.script : state.script
  var result = await callRun({
    script,
    inputFiles,
    fields: arrayToObject(fields.map(f => f.id), f => { var f3 = fields.find(f2 => f2.id === f); return f3 ? f3.value : undefined })
  })
  getStore().setState({
    example: example || state.example,
    script,
    result,
    fields,
    inputFiles,
    working: false
  })
  await sleep(100)
}

