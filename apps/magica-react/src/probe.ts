import 'babel-polyfill'
import { File, loadHtmlCanvasElement, run, main } from 'magica'

async function test() {
  var root = document.getElementById('main')!
  root.innerHTML = `
  <p>canvas</p>
<canvas id="canvas" width="600" height="600"><canvas>
  `
  var img = await File.fromUrl('bluebells.png')
  var c = root.querySelector<HTMLCanvasElement>('#canvas')!
  var ctx = c.getContext('2d')!
  await loadHtmlCanvasElement(img!, ctx)

  var r = await main({
    command: `convert  ${img!.name} -rotate 33 output.rgba`,
    inputFiles: [img],
    verbose: true
  })
  // var o = File.asFile(r.outputFiles[0])
  // o.width = r.verbose![0].outputSize.width
  // o.height = r.verbose![0].outputSize.height

  await loadHtmlCanvasElement(r.outputFiles[0] as any, ctx)

  //   var {outputFiles } = await run({script: `convert bluebells.png -depth 8 i.rgba`, inputFiles: [img]})
  //   var data = new ImageData(new Uint8ClampedArray(outputFiles[0].content.buffer), size.width, size.height)
  // ctx.drawImage(await loadHtmlImageElement(img!, undefined, true), 0, 0)
  // ctx.putImageData(data, 0, 0)
}

test()