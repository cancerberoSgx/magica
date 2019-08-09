import { change } from './change';
import { commands } from './commands';
import { getStore } from './store';
import { fieldArrayToObject } from './misc';
import { ExampleField } from '../../magica-examples/dist/src';
import { File, run, protectFile } from 'magica';
import { notUndefined } from 'misc-utils-of-mine-generic';
import { CANVAS_WIDTH } from './canvas';

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

export async function handleFileInputChange(e: HTMLInputElement){
  var files = await File.fromHtmlFileInputElement(e)
  files = files.filter(notUndefined)
  if(files.length==0){
    return 
  }
  await handleInputFileChange(files[0]);
}

export async function handleInputFileChange(files: File) {
  var inputFile = await createInputFile(files);
  getStore().setState({
    inputFile
  });
  await change(getStore().getState().x, getStore().getState().y, [inputFile]);
}

export async function createInputFile(f: File) {
  var s = await f.size()
  var r = await run({
    script: `convert ${f?f.name:'rose:'} -resize ${s.width>CANVAS_WIDTH ? CANVAS_WIDTH : s.width} output.miff`,
    inputFiles: [f],
    verbose: true
  });
  var inputFile = File.asFile(r.outputFiles[0]);
  protectFile(inputFile);
  return inputFile;
}
