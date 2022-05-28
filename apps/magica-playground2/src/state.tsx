import {File} from 'magica'
// cheap global store, this is root component state which uses initState wile the other components use state and setState

export interface AppState {
  outputFiles: string[]
  inputFiles: File[]
  presets: {
    title: string
    description: string
  },
}

export const initialState: AppState = {
  presets: {
    title: 'cool product',
    description: 'solves to ugly problem of you know what',
  },
  inputFiles: [],
  outputFiles: [],
}

let state: AppState
let _setState: (s: AppState) => void

export const useAppState = () => {
  return { state, setState }
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
