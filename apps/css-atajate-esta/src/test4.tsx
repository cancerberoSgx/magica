import 'mirada';
import { del, loadOpencv, Mat } from 'mirada';
import { sleep, unique } from 'misc-utils-of-mine-generic';
import rasterizeHTML from 'rasterizehtml';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import '../node_modules/bulma/bulma.sass';
import { Bitwise, Canny } from 'ojos';

export async function test4() {
  await restoreCanvas();
  window.addEventListener('resize', async e =>
    await renderInCanvas(f(), false)
  );
}

const f = () => <Test />;
async function restoreCanvas() {
  await renderInCanvas(f(), false);
}

async function not(src: Mat) {
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB)
  new Bitwise().exec({ src, dst: src, type: 'not' })
}

// async function canny(src: Mat) {
//   new Canny().exec({channels: true, src, d})
//   cv.cvtColor(src, src, cv.COLOR_RGBA2RGB)
//   new Bitwise().exec({ src, dst: src, type: 'not' })
// }

async function none(src: Mat) {
  // cv.cvtColor(src, src, cv.COLOR_RGBA2RGB)
  // new Bitwise().exec({ src, dst: src, type: 'not' })
}

let src: Mat = null as any
async function animCanvas(c: HTMLCanvasElement = canvas, f: (src: Mat) => Promise<void> = none) {
  src && del(src)
  src = cv.imread(c)
  await f(src)
  cv.imshow(c, src)
  del(src)
}
const id = unique('id');

async function setOverlayVisibility(visible = true) {
  element = document.querySelector<HTMLElement>('#' + id)!;
  if (element ) {
    // element.style.display = visible ? 'block' : 'none'
    if(visible) {element.style.zIndex="1"}
    else {element.style.zIndex="-1"}
  }
  if (canvas ) {
   visible &&  canvasToBack()
   if(!visible){
     canvas.style.zIndex = "1";
  canvas.style.pointerEvents='none'

   }
  }
}

let canvas: HTMLCanvasElement = null as any
let element: HTMLElement = null as any
let container: HTMLElement = null as any

async function renderInCanvas(el: JSX.Element, hideCanvas = true, f: (src: Mat) => Promise<void> = none) {
  container = document.querySelector<HTMLElement>('#container1')!
  if (!hideCanvas && container) {
    unmountComponentAtNode(document.getElementById('layout-container')!);
  }
  render(<div style={{ background: 'white' }} id="container1">
    <span id={id}>{el}</span>
    {/* <canvas style={{ display: 'none' }} width={0} height={0} id="canvas" /> */}
    {hideCanvas ? '' : <canvas style={{ display: 'none' }} width={window.innerWidth} height={window.innerHeight} id="canvas" />}
  </div>, document.getElementById('layout-container'))

  element = document.querySelector<HTMLElement>('#' + id)!;
  canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  container = document.querySelector<HTMLElement>('#container1')!
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  if (!hideCanvas) {
    await animCanvas(canvas, f)
  }
  canvasToBack();
  if (!container || !hideCanvas) {
    await rasterizeHTML.drawHTML(`<style>${allCssText()}</style>` + element.outerHTML, canvas);
    await animCanvas(canvas, f)
  }
  if (hideCanvas) {
    element.style.display = 'none';
  }
  return { canvas, container, element }
}

let _allCssText: string = null as any

function canvasToBack() {
  canvas.style.position = 'absolute';
  canvas.style.top = container.offsetTop + 'px';
  canvas.style.left = container.offsetLeft + 'px';
  canvas.style.zIndex = "-1";
  canvas.style.display = 'block'
  canvas.style.pointerEvents='none'
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
}

//   await animCanvas(canvas, not)
//   await setOverlayVisibility(false,)
//   await sleep(300)
//  await setOverlayVisibility(true)
function Test() {
  return (<>
    <div id="box1">
      <button className="button is-info" onMouseDown={async e => {
        await animCanvas(canvas, not)
        await setOverlayVisibility(false)
      }}
      onMouseUp={async e => {
        await animCanvas(canvas, none)
        await setOverlayVisibility(false)
      }}
      >not</button>

      <button className="button is-info" onMouseUp={async e => {
        await animCanvas(canvas, none)
        await setOverlayVisibility(false)
      }}       >none</button>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Primary title
      </h1>
            <h2 className="subtitle">
              Primary subtitle
      </h2>
            <div className="field has-addons">
              <p className="control">
                <a className="button">
                  <span className="icon is-small">
                    <i className="fas fa-bold"></i>
                  </span>
                  <span>Bold</span>
                </a>
              </p>
              <p className="control">
                <a className="button">
                  <span className="icon is-small">
                    <i className="fas fa-italic"></i>
                  </span>
                  <span>Italic</span>
                </a>
              </p>
              <p className="control">
                <a className="button">
                  <span className="icon is-small">
                    <i className="fas fa-underline"></i>
                  </span>
                  <span>Underline</span>
                </a>
              </p>
            </div>

            <div className="field has-addons">
              <p className="control">
                <a className="button">
                  <span className="icon is-small">
                    <i className="fas fa-align-left"></i>
                  </span>
                  <span>Left</span>
                </a>
              </p>
              <p className="control">
                <a className="button">
                  <span className="icon is-small">
                    <i className="fas fa-align-center"></i>
                  </span>
                  <span>Center</span>
                </a>
              </p>
              <p className="control">
                <a className="button">
                  <span className="icon is-small">
                    <i className="fas fa-align-right"></i>
                  </span>
                  <span>Right</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="columns">
        <div className="column">
          First column
  </div>
        <div className="column">
          Second column
  </div>
        <div className="column">
          Third column
  </div>
        <div className="column">
          Fourth column
  </div>
      </div>

      <div className="columns">
        <div className="column is-narrow">
          <div className="box" style={{ width: '200px' }}>
            <p className="title is-5">Narrow column</p>
            <p className="subtitle">This column is only 200px wide.</p>
            <a className="button is-outlined">Outlined</a>
            <a className="button is-primary is-outlined">Outlined</a>
            <a className="button is-link is-outlined">Outlined</a>
            <a className="button is-info is-outlined">Outlined</a>
            <a className="button is-success is-outlined">Outlined</a>
            <a className="button is-danger is-outlined">Outlined</a>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <p className="title is-5">Flexible column</p>
            <p className="subtitle">This column will take up the remaining space available.</p>
            <div className="control">
              <label className="radio">
                <input type="radio" name="foobar" />
                Foo
  </label>
              <label className="radio">
                <input type="radio" name="foobar" checked />
                Bar
  </label>
              <a className="button is-primary">Primary</a>
              <a className="button is-link">Link</a>
              <a className="button is-info">Info</a>
              <a className="button is-success">Success</a>
              <a className="button is-warning">Warning</a>
              <a className="button is-danger">Danger</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

