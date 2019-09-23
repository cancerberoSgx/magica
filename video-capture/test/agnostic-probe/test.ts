import puppeteer from 'puppeteer'
import { sleep } from 'misc-utils-of-mine-generic'
import Jimp from 'jimp'
import { staticServer } from '../../src/staticServer'

async function test() {
  const server = await staticServer(__dirname, 8080)
  // await sleep(1111)
  const browser = await puppeteer.launch({ headless: true, args: ['--disable-web-security', '--allow-file-access', '--use-fake-ui-for-media-stream'] })
  const page = await browser.newPage()
  page.on('console', e => {
    if (e.type() === 'error') {
      console.error('error: ' + JSON.stringify(e.location()) + '\n' + e.text().split('\n').join('\n'))
    }
    console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
  })
  await page.goto('http://127.0.0.1:8080/test3.html')
  await sleep(1000)
await page.evaluate(()=>{
  const d = document.createElement('div')
  d.innerHTML=`
  <video playsinline autoplay></video>
  <canvas></canvas>`
  document.body.append(d)
})
  await page.exposeFunction('postFrame', async (width, height, data: number[]) => {
    const imageData = {
      data: new Uint8ClampedArray(data),
      width,
      height
    }
    const i = new Jimp(imageData)
    i.write('tmpjimp.png')
    // await loadMirada()
    // await File.fromData(imageData, 'tmp.png').toRgba().write('tmp.png')
  })
  await sleep(1000)
  await page.evaluate(() => {
    return new Promise(resolve => {
      const video = document.querySelector('video')!
      const canvas = document.querySelector('canvas')!
      canvas.width = 480;
      canvas.height = 360;
      const constraints = {
        audio: false,
        video: true
      };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => { console.log('READDD'); video.srcObject = stream; resolve() })
        .catch(error => console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name))
    })
  })
  await sleep(1000)
  await page.evaluate(async () => {
    const video = document.querySelector('video')!
    const canvas = document.querySelector('canvas')!
    canvas!.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height)
    const data = canvas!.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
    await (window as any).postFrame(data.width, data.height, Array.from(data.data.values()))
  })
  await server.close()
  await browser.close()
}

test()