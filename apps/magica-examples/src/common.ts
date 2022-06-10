import { SampleImage, ExampleField, Example, ExampleFields } from "./types";

export const fieldsText: ExampleField[] = [
  { id: 'text', value: 'Hello World 1234', description: 'text to render' },
  { id: 'font', value: 'PoetsenOne-Regular.otf', type: 'font', description: 'text font. Needs to be an actual input file' },
  { id: 'stroke', value: 'black', type: 'color', description: 'stroke color' },
  { id: 'strokewidth', value: '2', type: 'integer', description: 'stroke width' },
  { id: 'fill', value: 'white', type: 'color', description: 'fill color' },
  { id: 'pointSize', value: '68', type: 'integer', description: 'point size' }
];

export const fieldsShadow: ExampleField[] = [
  { id: 'shadowColor', value: 'navy', type: 'color', description: 'shadow\'s color' },
  { id: 'shadow', value: '120x5+5+4', description: 'shadow expression' },
];

export const fieldsTextCommand = `
  -font <%= get('font') %> -stroke <%= get('stroke') %> -strokewidth <%= get('strokewidth') %> \\
  -fill <%= get('fill') %> -pointsize <%= get('pointSize') %> 'label:<%= get('text') %>'
  `.trim();
export const fieldsShadowCommand = `-background <%= get('shadowColor') %> -shadow <%= get('shadow') %>`;

// sample images helper
let _sampleImages: SampleImage[] = [];

export function sampleImages(images?: SampleImage[]) {
  _sampleImages = images || _sampleImages;
  return _sampleImages;
}

export function getExampleFields(e: Example): ExampleFields {
  const fields: ExampleFields = {};
  (e.fields||[]).forEach(f=>{
    fields[f.id] = f.value
  })
  return fields
}
