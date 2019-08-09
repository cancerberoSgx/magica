import * as React from 'react'
import { change } from './change';
import { dispatchCanvasMouseMove } from './dispatch';

export const Canvas = () => <canvas id="canvas" width="600" height="600" onMouseMove={e => 
  dispatchCanvasMouseMove(e.nativeEvent.layerX, e.nativeEvent.layerY)} 
  onClick={e => change(e.nativeEvent.layerX, e.nativeEvent.layerY)}></canvas>;

let context: CanvasRenderingContext2D;

export function getCanvasContext() {
  if (!context) {
    context = document.querySelector<HTMLCanvasElement>('#canvas')!.getContext('2d')!;
  }
  return context;
}
