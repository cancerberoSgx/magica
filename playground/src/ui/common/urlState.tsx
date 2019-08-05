import { File } from 'magica'
import { notUndefined, serial, sleep } from 'misc-utils-of-mine-generic'
import { setExample } from '../../app/dispatcher'
import { getStore } from '../../app/store'

export function createUrl() {
  var state = getStore().getState()
  const s = {
    example: {
      ...state.example,
      script: state.script,
    },
    fields: state.fields,
    inputFileNames: state.inputFiles.map(f => f.url).filter(notUndefined),
    script: state.script
  }
  const b = btoa(JSON.stringify(s))
  window.location.hash = '#state=' + b
}

export async function loadUrl() {
  if (urlHasState()) {
    const d = window.location.hash.split('state=')[1]
    const state = JSON.parse(atob(d))
    // console.log(state)
    let inputFiles = await serial(state.inputFileNames.map((f: string) => async () => {
      try {
        return await File.fromUrl(f)
      } catch (error) {
        return undefined
      }
    }))
    inputFiles = inputFiles.filter(notUndefined)
    getStore().setState({ 
      example: { 
        ...getStore().getState().example, 
        script: () => state.script 
      }, 
      script: state.script, 
      fields: state.fields,
      inputFiles: inputFiles 
    })
    await sleep(400)
    await setExample(getStore().getState().example)
  } else {

  }
}

export function urlHasState() {
  return window.location.hash.includes('state=')
}

