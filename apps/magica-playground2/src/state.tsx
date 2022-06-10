// cheap global store, this is root component state which uses initState wile the other components use state and setState

import {File, RunResult} from 'magica'
import { Example, examples, ExampleFields } from 'magica-examples'
import { getExamples } from './examples/examples'
import { getExampleFields } from './util'

export interface AppState {
  inputFiles: File[]
  selectedExample: Example
  fields: ExampleFields
  outputFiles: string[]
  // inputFilesDataUrls: string[]
  examples: Example[]
  execution: ExecutionState
  // executedCommands: string[][]
  executionResults: RunResult
}

interface ExecutionState {
  status: 'working'|'idle'
  time: number
}

const defaultExample = getExamples()[0]

export const initialState: AppState = {
  inputFiles: [],
  // inputFilesDataUrls: [],
  outputFiles: [],
  examples: getExamples(),
  selectedExample: defaultExample,
  fields: getExampleFields(defaultExample),
  execution: {
    status: 'idle',
    time: 0
  },
  executionResults: null
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

