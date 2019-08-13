import { File, loadHtmlCanvasElement, main } from 'magica'
import { getCanvasContext } from '../ui/canvas'
import { getStore } from './store'

export async function change(x: number, y: number, inputFiles: File[] = []) {
  var state = getStore().getState()
  state.working = true
  state.x = x
  state.y = y
  var t0 = performance.now()
  state.commandString = state.command.command(state)
  var r = await main({
    command: state.commandString,
    inputFiles,
    verbose: true
  })
  if (r.outputFiles.length === 0) {
    state.stderr = r.stderr
  } else {
    state.stderr = []
    await loadHtmlCanvasElement(r.outputFiles[0] as any, getCanvasContext())
  }
  state.time = (performance.now() - t0).toFixed(2)
  state.callCounter++
  state.working = false
  getStore().setState({ ...state })
}
