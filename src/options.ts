import { NativeOptions } from './types'

let options: Required<NativeOptions> = {
  nodeFsLocalRoot: 'working_tmp',
  emscriptenNodeFsRoot: '/w2',
  debug: false,
  outputDir: '.',
  disableNodeFs: false
}
export function getOptions() {
  return options
}
export function getOption(k: keyof NativeOptions) {
  return options[k] || undefined
}
export function setOptions(o: Partial<NativeOptions>) {
  options = { ...options, ...o }
}
