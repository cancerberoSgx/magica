import { Command } from './commands'
import {Styles} from './styles'
import {imList} from 'magica'

export interface State {
  working?: string
  outputFormat: string
  image: string
  imageSize: { width: number, height: number }
  imageOffset: {x: number, y: number}
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
 scaleFactor: number
 autoApply: boolean
 virtualPixel: imList.VirtualPixel 
 gravity: imList.Gravity 
 rotatePreserveSize: boolean
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'number'
}
