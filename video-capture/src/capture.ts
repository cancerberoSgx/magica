import { staticServer } from './staticServer'
import puppeteer, { LaunchOptions } from 'puppeteer'
import { mergeRecursive, sleep, checkThrow } from 'misc-utils-of-mine-generic'
import Jimp from 'jimp/*'
import { Server } from 'http'
import { reject } from 'q'

type V = void | Promise<void>
// type SupportedFormats = 'image/png'|
export interface CaptureOptions {
  port?: number
  puppeteerOptions?: LaunchOptions
  constrains?: MediaStreamConstraints
  shots?: number
  width?: number,
  height?: number
  fps?: number
}

type Listener = (data: ImageData) => V
interface ImageData {
  width: number
  height: number
  data:  Uint8ClampedArray
}

export class VideoCapture {

  protected server?:  Server
  protected browser?: puppeteer.Browser
  protected page?: puppeteer.Page
  protected capturing=false

  constructor(protected o: CaptureOptions){
    this.captureLoop = this.captureLoop.bind(this)
    this._postFrame = this._postFrame.bind(this)
  }

  protected listeners: Listener[] = []

   addFrameListener(listener: Listener):void {
this.listeners.push( listener)
  }

  encodeFrame(data: ImageData, mime: string) {
    //TODO: probably is faster to use canvas API to encode frames directly instead first as data - if users wants ust encoded then do that.
    const j = new Jimp(data)
    return j.getBufferAsync(mime)
  }

  async _postFrame(width: number, height: number, data: number[]) {
    const imageData = {
      // TODO: investigate why/how to pass the buffer / vide directly without transforming it to number[]
      data: new Uint8ClampedArray(data),
      width,
      height
    }
    this.notifyListeners(imageData)
    // const i = new Jimp(imageData)
    // i.write('tmpjimp.png')
    // await loadMirada()
    // await File.fromData(imageData, 'tmp.png').toRgba().write('tmp.png')
  }

  /**
   * Given callback can be called to stop video capture (turns camera off)
   */
  async stop(){
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    //TODO: stop cammera
    await this.server!.close()
  await this. browser!.close()
  }

  async pause(){
    this.capturing=false
    // throw new Error('TODO')
  }

 async resume(){
    this.capturing=true
    // throw new Error('TODO')
 }

protected notifyListeners(d:ImageData){
  this.listeners.forEach(l=>l(d))
}

/**
 * Starts capture. It resolved when the camera starts capturing or rejects if any error.
 */
async  start(){
  this. server = await staticServer(__dirname, 8080)
  // await sleep(1111)
  this. browser = await puppeteer.launch(mergeRecursive(
    {
      ...Jimp, 
      ...this.o.puppeteerOptions
      }, 
  { 
    headless: true, 
  args: ['--disable-web-security', '--allow-file-access', '--use-fake-ui-for-media-stream'] 
  }))
  this. page = await this.browser.newPage()
  this.page.on('console', e => {
    if (e.type() === 'error') {
      console.error('error: ' + JSON.stringify(e.location()) + '\n' + e.text().split('\n').join('\n'))
    }
    console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
  })
  await this.page.goto(`http://127.0.0.1:${this.o.port||8080}/index.html`)
  // await sleep(1000)
await this.page.evaluate(()=>{
  const d = document.createElement('div')
  d.innerHTML=`
  <video playsinline autoplay></video>
  <canvas></canvas>`
  document.body.append(d)
})

  await this.page.exposeFunction('postFrame', this._postFrame)


await this.initializeMedia()
  // await sleep(1000)
await this.captureFrame()
 
}

protected async captureFrame() {
    await this.page!.evaluate(async () => {
    // const video = document.querySelector('video')!
    // const canvas = document.querySelector('canvas')!
      (window as any).canvas!.getContext('2d')!.drawImage(  (window as any).video, 0, 0,   (window as any).canvas.width,   (window as any).canvas.height)
    const data =   (window as any).canvas!.getContext('2d')!.getImageData(0, 0,   (window as any).canvas.width,   (window as any).canvas.height)
    await (window as any).postFrame(data.width, data.height, Array.from(data.data.values()))
  })
}

protected async captureLoop(){
    if(this.capturing){

    } else {
      // TODO: something here ?
    }
}

protected async initializeMedia(){
        const constraints = {...{
        audio: false,
        video: true
      },
      ...this.o.constrains
      };
    await this.page!.evaluate((width, height, constraints) => {
    return new Promise(resolve => {
      (window as any).video = document.querySelector('video')!,
      (window as any). canvas = document.querySelector('canvas')!;
      (window as any).canvas.width = width;
      (window as any).canvas.height = height;

      navigator.mediaDevices.getUserMedia(JSON.parse(constraints) as MediaStreamConstraints) // TODO: do we really need to serialize constrains ? 
        .then(stream => { 
          // console.log('READDD'); 
          (window as any).video.srcObject = stream; 
        resolve(stream) 
        })
        .catch(error => 
        {
          reject(error)
          console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
          }
        )
    })
  }, this.o.width||480, this.o.height||360, JSON.stringify(constraints))
}
}