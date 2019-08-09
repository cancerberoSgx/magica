import * as React from 'react'
import { change } from './change';
import { dispatchCanvasMouseMove } from './dispatch';

export const CANVAS_WIDTH = 600, CANVAS_HEIGHT = 500

export const Canvas = () => <canvas id="canvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onMouseMove={e => 
  dispatchCanvasMouseMove(e.nativeEvent.layerX, e.nativeEvent.layerY)} 
  onClick={e => change(e.nativeEvent.layerX, e.nativeEvent.layerY)}></canvas>;  

let context: CanvasRenderingContext2D;

export function getCanvasContext() {
  if (!context) {
    context = document.querySelector<HTMLCanvasElement>('#canvas')!.getContext('2d')!;
  }
  return context;
}
