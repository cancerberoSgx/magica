import 'babel-polyfill'
import { File, loadHtmlCanvasElement, run, main } from 'magica'
import { randomIntBetween, randomFloatBetween } from 'misc-utils-of-mine-generic';

async function test() {
  var root = document.getElementById('main')!
  root.innerHTML = `
  <p>click the canvas</p>
<canvas id="canvas" width="600" height="600"><canvas>
  `
  var img = await File.fromUrl('bluebells.png', {protected: true})
  var c = root.querySelector<HTMLCanvasElement>('#canvas')!
  c.addEventListener('click', change)
  var ctx = c.getContext('2d')!
  await loadHtmlCanvasElement(img!, ctx)

  async function change(event:any) {
    var x = event.layerX;
    var y = event.layerY;
    const command =  rotateCommand(x, y)
    console.time('c1')
    var r = await main({
      command,
      inputFiles: [img],
      verbose: true
    })
    await loadHtmlCanvasElement(r.outputFiles[0] as any, ctx)
    console.timeEnd('c1')
  }

  function rotateCommand(x: number, y: number) {
    return `convert  ${img!.name} -rotate ${randomIntBetween(0,360)} output.rgba`;
  }
  function barrelCommand(x: number, y: number) {
    return `convert ${img!.name} -matte -virtual-pixel transparent -distort Barrel '${[0.2, 0.7, .2, .5, x, y].join(' ')}' output.rgba`;
  }
}

test()