import { Command } from './commands'

export interface State {
  working?: string
  image: string
  imageSize: { width: number, height: number }
  currentBuffer: ArrayBufferView
  imageBuffer: ArrayBufferView
  magicaBuffer: ArrayBufferView
  options: Options
  time: number
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'integer' | 'float'
}

interface Options {
  onMouseMove: boolean
  commands: Command[]
  command: string
  fields: Field[]
}


