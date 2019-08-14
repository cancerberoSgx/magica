import * as React from 'react'
import { change } from '../app/change'
import { dispatchCanvasMouseMove } from '../app/dispatch'
import { getStore } from '../app/store'

export const Canvas = () => <canvas id="canvas" width={getStore().getState().canvasWidth} height={getStore().getState().canvasHeight} onMouseMove={e =>
  dispatchCanvasMouseMove(e.nativeEvent.layerX, e.nativeEvent.layerY)}
  onClick={e => change(e.nativeEvent.layerX, e.nativeEvent.layerY)}></canvas>

let context: CanvasRenderingContext2D

export function getCanvasContext() {
  if (!context) {
    context = document.querySelector<HTMLCanvasElement>('#canvas')!.getContext('2d')!
  }
  return context
}
