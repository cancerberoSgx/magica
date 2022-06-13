export interface Example {
  tags: string[];
  script: string;
  name: string;
  description: string;
  inputFiles: string[];
  fields?: ExampleField[];
}

export interface ExampleField {
  id: string;
  value: string | number;
  type?: 'string' | 'integer' | 'float' | 'color' | 'point' |'font' |'select';
  selectList?: string[]
  options?: string[]
  description?: string
}

export interface SampleImage {
  type: 'animation' | 'color';
  path: string;
}

export enum ExampleTag {
  animation = 'animation',
  info = 'info',
  drawing = 'drawing',
  gradient = 'gradient',
  color = 'color',
  montage = 'montage',
  format = 'format',
  distort = 'distort',
  text = 'text',
  artistic = 'artistic',
  simple = 'simple'
}

export type ExampleFields = { [k: string]: string | number | undefined }
