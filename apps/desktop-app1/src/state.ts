import { Command } from './commands'
import {Styles} from './styles'

export interface State {
  working?: string
  outputFormat: string
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
 scaleFactor: number
 autoApply: boolean
 virtualPixel: VirtualPixel 
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'number'
}





  export enum VirtualPixel {
    'Background' = 'Background',
    'Black' = 'Black',
    'CheckerTile' = 'CheckerTile',
    'Dither' = 'Dither',
    'Edge' = 'Edge',
    'Gray' = 'Gray',
    'HorizontalTile' = 'HorizontalTile',
    'HorizontalTileEdge' = 'HorizontalTileEdge',
    'Mirror' = 'Mirror',
    'None' = 'None',
    'Random' = 'Random',
    'Tile' = 'Tile',
    'Transparent' = 'Transparent',
    'VerticalTile' = 'VerticalTile',
    'VerticalTileEdge' = 'VerticalTileEdge',
    'White' = 'White'
  }
