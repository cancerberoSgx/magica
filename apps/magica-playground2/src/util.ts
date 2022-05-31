import { IFile, File } from "magica";
import { Example } from "magica-examples";
import { ExampleFields } from "./editor/exampleEditor";
import { AppState } from "./state";

/** gets mouse events coords relative to element that has the listener installed */
export function relativeCoords ( event ) {
  var bounds = event.currentTarget.getBoundingClientRect();
  var x = Math.ceil(event.clientX - bounds.left);
  var y = Math.ceil(event.clientY - bounds.top);
  return {x, y};
}

export async function fileToDataUrl(file: IFile) {
  return await (await File.fromArrayBuffer(file.content.buffer)).asDataUrl()
}

export function getExampleFields(e: Example): ExampleFields {
  const fields = {};
  (e.fields||[]).forEach(f=>{
    fields[f.id] = f.value
  })
  return fields
}
