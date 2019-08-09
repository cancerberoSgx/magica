import { loadHtmlCanvasElement, main, File } from 'magica';
import { getStore } from './store';

export async function change(x: number, y: number, inputFiles: File[]=[]) {
  var state = getStore().getState()
  state.working=true
  state.x=x
  state.y=y
  var t0 = performance.now()
  state.commandString = state.command.command(state)
  var r = await main({
    command: state.commandString,
    inputFiles ,
    verbose: true
  });
  await loadHtmlCanvasElement(r.outputFiles[0] as any, state.ctx);
  state.time = (performance.now()-t0  ).toFixed(2)
  state.working=false
  getStore().setState({...state})
}


