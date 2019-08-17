import { File, loadHtmlCanvasElement, run } from 'magica'
import { getCanvasContext } from '../ui/canvas'
import { time } from '../util/misc'
import { getState, getStore } from './store'

export async function change(x: number, y: number, inputFiles: File[] = []) {
  var state = getState()
  state.working = true
  state.x = x
  state.y = y
  var t0 = performance.now()
  state.commandString = state.command.command(state)
  var result = await run({
    script: state.commandString,
    inputFiles,
    verbose: true
  })
  if (result.outputFiles.length === 0) {
    state.stderr = ['Error:', ...result.stderr]
  } else {
    state.stderr = []
    await loadHtmlCanvasElement(result.outputFiles[0] as any, getCanvasContext(), state.imageBounds.x, state.imageBounds.y)
  }
  state.time = time(performance.now() - t0)
  state.callCounter++
  state.working = false
  getStore().setState({ ...state })
}

