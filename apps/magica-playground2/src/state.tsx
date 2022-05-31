// cheap global store, this is root component state which uses initState wile the other components use state and setState

import {File} from 'magica'
import { Example, examples } from 'magica-examples'
import { ExampleFields } from './editor/exampleEditor'
import { getExampleFields } from './util'

export interface AppState {
  inputFiles: File[]
  selectedExample: Example
  fields: ExampleFields
  outputFiles: string[]
  inputFilesDataUrls: string[]
  examples: Example[]
}

const defaultExample = examples()[0]

export const initialState: AppState = {
  inputFiles: [],
  inputFilesDataUrls: [],
  outputFiles: [],
  examples: examples(),
  selectedExample: defaultExample,
  fields: getExampleFields(defaultExample)
}

let state: AppState
let _setState: (s: AppState) => void

export const useAppState = () => {
  return [ state, setState ] as [AppState, (s: AppState) => void]
}

const setState = (s?: AppState) => {
  state = {...(s||state)}
  _setState(state)
}

/** only called once from root component */
export function initState(initialState: AppState, newSetState: (s: AppState) => void) {
  state = initialState
  _setState = newSetState
}

