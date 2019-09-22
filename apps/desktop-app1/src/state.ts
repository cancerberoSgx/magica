import { Command } from './commands'

export interface State {
  working?: string
  image: string
  imageSize: { width: number, height: number }
  imageRotate: number
  currentBuffer: ArrayBufferView
  imageBuffer: ArrayBufferView
  magicaBuffer: ArrayBufferView
  onMouseMove: boolean
  commands: Command[]
  command: string
  fields: Field[]
  time: number
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'integer' | 'float'
}



