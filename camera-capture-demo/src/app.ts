import { VideoCapture, ImageData } from 'camera-capture'
import { Window, Container, MessageLoop, Image, Label } from 'gui'
import Jimp from 'jimp'
import { realpathSync, readFileSync } from 'fs'
import { join } from 'path'

async function main() {

const w = Window.create({})
const c2 = Container.create()
w.setContentView(c2)
w.setContentSize({width: 600, height: 600,})

w.center()
w.activate()


c2.setStyle({flex: 1, width: '100%', height: '100%', flexDirection: 'column'})
const options = Container.create()
options.setStyle({flex: 1, width: '40%', height: '100%', flexDirection: 'row'})
c2.addChildView(options)
const fps = Label.create('0 FPS')
fps.setStyle({flexDirection: 'row'})
options.addChildView(fps)

const canvas = Container.create()
canvas.setStyle({flex: 1, width: '60%', height: '100%', flexDirection: 'row'})
c2.addChildView(canvas)
canvas.onDraw=(self, painter, dirty)=>{
  // const img = Image.createFromBuffer(frameBuffer, 1)
  painter.drawImage(img, {x:0,y:0,...img.getSize()})
}
  let counter=0

setInterval(()=>{
  fps.setText(`${counter} FPS`)
  counter=0
}, 1000)

  let frameBuffer : Buffer  =readFileSync( realpathSync(join(__dirname, 'n.png')))
  let img : Image = Image.createFromBuffer(frameBuffer, 1)
// let frame: ImageData
  const capture = new VideoCapture({
    width: 400, height: 300, port: 8081
  })
capture.addFrameListener(async frame => {
  const i = new Jimp(frame)
   frameBuffer = await i.getBufferAsync('image/jpeg')
   img = Image.createFromBuffer(frameBuffer, 1)
  canvas.schedulePaint()
  counter++
  })
  await capture.start()



if (!process.versions.yode) {
  MessageLoop.run()
    w.close()
}

}
main()