import { unique, sleep } from 'misc-utils-of-mine-generic';
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom';
import rasterizeHTML from 'rasterizehtml';
import 'mirada'
import {Canny, GaussianBlur, Bitwise} from 'ojos'
import { Mat, del, toRgba } from 'mirada';

let src:Mat = null as any
async function animCanvas(c: HTMLCanvasElement){
  // if(src){}
  src && del(src)
  // src=null as any
  src =  cv.imread(c)
  // const m = src&&new Bitwise().exec({src: toRgba(src), dst: toRgba(src), type: 'not'})
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY)//new Bitwise().exec({src: toRgba(src), dst: toRgba(src), type: 'not'})
  // new GaussianBlur().exec({src, dst: src, ksize: new cv.Size(5,5), sigmaX: 3.4})
  cv.imshow(c, src)
  // await sleep(2000)
  // debugger
  del(src)
}
const id = unique('id');
// export function _getId() {
//   return id
// }
export async function toggleOverlayElementVisibility( visible=true) {
  // if(visible){
  //   renderInCanvas
  // }
  element = document.querySelector<HTMLElement>('#' + id)!;
  if(element){
element.style.display=visible?'block':'none'
  }
  if(canvas && visible){
canvasToBack()
  }
}
  let canvas: HTMLCanvasElement =null as any
let element:HTMLElement=null as any
// let html:string=null as any
export async function renderInCanvas(el: JSX.Element , hideCanvas = true) {
  const container = document.querySelector<HTMLElement>('#container1')!
  if (!hideCanvas && container) {
    unmountComponentAtNode(document.getElementById('layout-container')!);
    // element = null as any
  }
// element = element || document.querySelector<HTMLElement>('#' + id)!;
 render(<div id="container1">
    <span id={id}>{ el}</span>
   {hideCanvas?'': <canvas style={{display:'none'}} width={window.innerWidth} height={window.innerHeight} id="canvas"/>}
   {/* <canvas width={window.innerWidth} height={window.innerHeight} id="canvas"/> */}
  </div>, document.getElementById('layout-container'))

   element =   document.querySelector<HTMLElement>('#' + id)!;
  // html=element.outerHTML||html
  canvas= document.querySelector<HTMLCanvasElement>("#canvas")!;
  if (!hideCanvas) {
    // canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
 await animCanvas(canvas)
  }
  // else {
    canvasToBack();
  // }
  if (!container || !hideCanvas  ) {
   await rasterizeHTML.drawHTML(`<style>${allCssText()}</style>` + element.outerHTML, canvas);
    await animCanvas(canvas)
  }
  if (hideCanvas) {
    element.style.display = 'none';
  }
  return { canvas, container, element }
}

let _allCssText: string=null as any

function canvasToBack() {
  canvas.style.position = 'absolute';
  canvas.style.top = element.offsetTop + 'px';
  canvas.style.left = element.offsetLeft + 'px';
  canvas.style.zIndex = "-1";
  canvas.style.display='block'
}

function allCssText() {
  if (!_allCssText) {
    var css = [];
    for (var sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
      var sheet = document.styleSheets[sheeti];
      //@ts-ignore
      var rules = ('cssRules' in sheet) ? sheet.cssRules : sheet.rules;
      for (var rulei = 0; rulei < rules.length; rulei++) {
        var rule = rules[rulei];
        if ('cssText' in rule)
          css.push(rule.cssText);
        else
          css.push(rule.selectorText + ' {\n' + rule.style.cssText + '\n}\n');
      }
    }
    _allCssText = css.join('\n');
  }
  return _allCssText;
  // //@ts-ignore
  // return Array.from(document.styleSheets).map(s => Array.from(s.cssRules).map(r => r.cssText)).flat().join();
}
