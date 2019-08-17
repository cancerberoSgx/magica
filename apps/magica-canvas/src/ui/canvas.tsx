import * as React from 'react'
import { change } from '../app/change'
import { dispatchCanvasMouseMove } from '../app/dispatch'
import { getState } from '../app/store'

// let canvasSize : Size
// export function getCanvasSize() {
//   if(!canvasSize){
//     canvasSize = {width: window.screen.width/2, height: window.screen.height/2}
//   }
//   return canvasSize
// }

export const Canvas = () => <canvas id="canvas"
  width={getState().canvasBounds.width} height={getState().canvasBounds.height}
  onMouseMove={e => dispatchCanvasMouseMove(e.nativeEvent.layerX, e.nativeEvent.layerY)}
  onClick={e => change(e.nativeEvent.layerX, e.nativeEvent.layerY)}></canvas>

let context: CanvasRenderingContext2D

export function getCanvasContext() {
  if (!context) {
    context = document.querySelector<HTMLCanvasElement>('#canvas')!.getContext('2d')!
  }
  return context
}

