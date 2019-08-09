import { change } from './change';
import { commands } from './commands';
import { getStore } from './store';
import { fieldArrayToObject } from './misc';
import { ExampleField } from '../../magica-examples/dist/src';

export function dispatchCanvasMouseMove(x: number, y: number) {
  var s = getStore().getState();
  if (!s.working && s.onMouseMove) {
    change(x, y);
  }
}

export function dispatchFieldChange(f: ExampleField) {
  getStore().setState({
    fields: { ...getStore().getState().fields, [f.id]: f }
  });
}

export function dispatchCommandSelected(f: string) {
  var command = commands.find(c => c.name === f)!;
  var fields = fieldArrayToObject(command);
  getStore().setState({
    command,
    fields
  });
}
