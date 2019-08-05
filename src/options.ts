import { NativeOptions } from './types'

let options: Required<NativeOptions> = {
  nodeFsLocalRoot: 'working_tmp',
  emscriptenNodeFsRoot: '/w2',
  debug: false,
  outputDir: '.',
  disableNodeFs: false,
  useNative: false,
  mainConcurrency: 3,
  mainInterval: 0,
  customCommandPrefix: '!js:'
}

export function getOptions() {
  return options
}

export function getOption<K extends keyof NativeOptions>(k: K): Required<NativeOptions>[K] {
  return options[k]
}

export function setOptions(o: Partial<NativeOptions>) {
  options = { ...options, ...o }
}
