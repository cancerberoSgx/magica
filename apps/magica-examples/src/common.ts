import { SampleImage, ExampleField } from "./types";

export const fieldsText: ExampleField[] = [
  { id: 'text', value: 'Hello World 1234' },
  { id: 'stroke', value: 'black' },
  { id: 'strokewidth', value: '2' },
  { id: 'fill', value: 'white' },
  { id: 'pointSize', value: '68' }
];

export const fieldsShadow: ExampleField[] = [
  { id: 'shadowColor', value: 'navy' },
  { id: 'shadow', value: '120x5+5+4' },
];

export const fieldsTextCommand = `
  -stroke <%= get('stroke') %> -strokewidth <%= get('strokewidth') %> \\
  -fill <%= get('fill') %> -pointsize <%= get('pointSize') %> 'label:<%= get('text') %>'
  `.trim();
export const fieldsShadowCommand = `-background <%= get('shadowColor') %> -shadow <%= get('shadow') %>`;

// sample images helper
let _sampleImages: SampleImage[] = [];

export function sampleImages(images?: SampleImage[]) {
  _sampleImages = images || _sampleImages;
  return _sampleImages;
}
