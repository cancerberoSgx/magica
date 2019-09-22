import { Command } from './commands'
import {Styles} from './styles'
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
 theme: Styles
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'number'
}



