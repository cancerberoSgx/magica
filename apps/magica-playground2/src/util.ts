import { IFile, File } from "magica";
import { Example, ExampleFields } from "magica-examples";

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

export function capitalize(s: string) {
  if(!s){
    return ''
  }
  return s.substring(0, 1).toUpperCase() + s.substring(1, s.length  )
}
