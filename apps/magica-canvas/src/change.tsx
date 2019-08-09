import { loadHtmlCanvasElement, main } from 'magica';
import { state } from './state';

export async function change(x: number, y: number) {
  state.x=x
  state.y=y
  var t0 = performance.now()
  var r = await main({
    command: state.command.command(state),
    inputFiles: [state.inputFile],
    verbose: true
  });
  await loadHtmlCanvasElement(r.outputFiles[0] as any, state.ctx);
  state.time.innerHTML = (performance.now()-t0  ).toFixed(2)
}


