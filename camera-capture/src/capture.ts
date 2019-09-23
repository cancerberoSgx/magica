import { Server } from 'http'
import { checkThrow, mergeRecursive, sleep } from 'misc-utils-of-mine-generic'
import puppeteer, { LaunchOptions } from 'puppeteer'
import { reject } from 'q'
import { staticServer } from './staticServer'
import { canvasToArrayBuffer } from './browser'

type V = void | Promise<void>

export type SupportedFormats = 'image/png' | 'image/jpeg' | 'image/webp' | 'rgba'

export interface CaptureOptions {
  port?: number
  puppeteerOptions?: LaunchOptions
  constrains?: MediaStreamConstraints
  shots?: number
  width?: number,
  height?: number
  fps?: number
  mime?: SupportedFormats
}

type Listener = (data: ImageData) => V

export interface ImageData {
  width: number
  height: number
  data: Uint8ClampedArray
}

export class VideoCapture {

  protected server?: Server
  protected browser?: puppeteer.Browser
  protected page?: puppeteer.Page
  protected capturing = false
  protected initialized = false
  protected lastFrame?: ImageData
  protected listeners: Listener[] = []

  constructor(protected o: CaptureOptions = {}) {
    this.captureLoop = this.captureLoop.bind(this)
    this._postFrame = this._postFrame.bind(this)
    this.o.width = this.o.width || 400
    this.o.height = this.o.height || 300
  }

  addFrameListener(listener: Listener): void {
    this.listeners.push(listener)
  }

  protected async _postFrame(width: number, height: number, data: number[]) {
    const imageData = {
      // TODO: investigate why/how to pass the buffer / vide directly without transforming it to number[]
      data: new Uint8ClampedArray(data),
      width,
      height
    }
    this.notifyListeners(imageData)
    // this.lastFrame = imageData
  }

  /**
   * Given callback can be called to stop video capture (turns camera off)
   */
  async stop() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    //TODO: stop camera
    await this.server!.close()
    await this.browser!.close()
  }

  async pause() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    this.capturing = false
  }

  async resume() {
    checkThrow(this.server && this.browser, 'Expected started before calling stop()')
    this.capturing = true
  }

  protected notifyListeners(d: ImageData) {
    this.listeners.forEach(l => l(d))
  }

  /**
   * Starts capture. It resolved when the camera starts capturing or rejects if any error.
   */
  async  start() {
    if (this.capturing) {
      throw new Error('Already capturing')
    }
    await this.initialize()
    this.capturing = true
    await this.captureLoop()
  }

  /**
   * starts servers, browser and media streams / canvas / video in the DOM. 
   * 
   * It's not neccesary to call this method - it will be called automatically. Separated on purpose so capturing can be measured independently of initialization.
   */
  async initialize() {
    if (this.initialized) {
      return
    }
    await this.launch()
    await this.page!.exposeFunction('postFrame', this._postFrame)
    await this.initializeMedia()
    this.initialized = true
  }

  protected async launch() {
    this.server = await staticServer(__dirname, this.o.port || 8080)
    this.browser = await puppeteer.launch(mergeRecursive(
      {
        ...{},
        ...this.o.puppeteerOptions
      },
      {
        headless: true,
        args: ['--disable-web-security', '--allow-file-access', '--use-fake-ui-for-media-stream']
      }))
    this.page = await this.browser.newPage()
    this.page.on('console', e => {
      if (e.type() === 'error') {
        console.error('error: ' + JSON.stringify(e.location()) + '\n' + e.text().split('\n').join('\n'))
      }
      console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
    })
    await this.page.goto(`http://127.0.0.1:${this.o.port || 8080}/index.html`)
    await this.page.evaluate(() => {
      const d = document.createElement('div')
      d.innerHTML = `
  <video playsinline autoplay></video>
  <canvas></canvas>`
      document.body.append(d)
    })
  }

  protected async captureFrame(mime: SupportedFormats = this.o.mime || 'rgba') {
    //TODO. perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration?
    //TODO: probably is faster to use canvas API to encode frames directly instead first as data - if users wants ust encoded then do that.
    await this.page!.evaluate(async (mime: SupportedFormats = 'rgba', width: number, height: number) => {
      const canvas = (window as any).canvas as HTMLCanvasElement
      const video = (window as any).video as HTMLVideoElement
      canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height)
      if (mime === 'rgba') {
        const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height)
        await (window as any).postFrame(data.width, data.height, Array.from(data.data.values()))
      } else {
        const data = await (window as any).canvasToArrayBuffer(canvas, mime)
        if (data) {
          await (window as any).postFrame(width, height, Array.from(new Uint8ClampedArray(data)))
        } else {
          // TODO: warning
        }
      }
      return ''
    }, mime, this.o.width!, this.o.height!)
  }

  public async readFrame(mime: SupportedFormats = this.o.mime || 'rgba') {
    // const lastFrame = this.lastFrame
    await this.captureFrame(mime)
    await sleep(0)
    // checkThrow(this.lastFrame && lastFrame !== this.lastFrame, 'Expected to have a new frame')
    return this.lastFrame!
  }

  protected async captureLoop() {
    if (this.capturing) {
      await this.captureFrame()
      //TODO: support fps like opencv
      // await sleep(1)
      await this.captureLoop()
    } else {
      // TODO: something here ?
    }
  }

  protected async initializeMedia() {
    const constraints = {
      ...{
        audio: false,
        video: true
      },
      ...this.o.constrains
    }
    await this.page!.evaluate((width, height, constraints, canvasToArrayBufferS) => {
      return new Promise(resolve => {
        (window as any).video = document.querySelector('video')!;
        (window as any).canvas = document.querySelector('canvas')!;
        (window as any).canvas.width = width;
        (window as any).canvas.height = height;
        (window as any).canvasToArrayBuffer = eval(`(${canvasToArrayBufferS})`)
        navigator.mediaDevices.getUserMedia(JSON.parse(constraints) as MediaStreamConstraints)
          // TODO: do we really need to serialize constrains ? 
          .then(stream => {
            (window as any).video.srcObject = stream
            resolve(stream)
          })
          .catch(error => {
            reject(error)
            console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name)
          }
          )
      })
    }, this.o.width || 480, this.o.height || 360, JSON.stringify(constraints), canvasToArrayBuffer.toString())
  }
}

