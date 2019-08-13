import { sleep, tryTo } from 'misc-utils-of-mine-generic'
import { File } from '../../../../dist/src'
import { handleInputFileChange } from '../app/dispatch'
import { getCanvasContext } from '../ui/canvas'
let stream: MediaStream | undefined
export async function setVideoEnable(enabled: boolean | 'takePhoto') {
  if (!enabled) {
    await resetCapture()
    return
  }
  if (enabled === 'takePhoto') {
    await initCapture()
    await shot()
  } else {
    async function f() {
      await shot()
      timer = setTimeout(f, 3000)
    }
    await initCapture()
    await f()
  }
}

async function initCapture(force = false) {
  if (force) {
    await tryTo(async () => await resetCapture())
  }
  if (!imageCapture) {
    const constraints = {
      video: true
    }
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    const videoTrack = stream.getVideoTracks().find(v => v.readyState === 'live')!
    //@ts-ignore
    imageCapture = new ImageCapture(videoTrack)
    await sleep(1500)
  }
}

async function resetCapture() {
  if (imageCapture) {
    await tryTo(async () => {
      await imageCapture.track.stop()
      clearTimeout(timer)
    })
  }
  imageCapture = undefined
}

let timer: any

let imageCapture: any

async function shot() {
  var f = await shotTakePhoto()
  return await handleInputFileChange(f)
}

async function shotGrabFrame() {
  console.log(imageCapture, imageCapture.getPhotoCapabilities(), imageCapture.getPhotoSettings(), stream, stream!.getVideoTracks())
  var b: ImageBitmap = await imageCapture.grabFrame()
  getCanvasContext().drawImage(b, 0, 0)
  var data = getCanvasContext().getImageData(0, 0, b.width, b.height)
  b.close()
  return await File.fromHTMLImageData(data, 'f.rgba')
}



async function shotTakePhoto() {
  // console.log(imageCapture , stream, stream!.getVideoTracks());

  var p: Blob = await imageCapture.takePhoto()
  //@ts-ignore
  var buffer = await p.arrayBuffer()
  var content = new Uint8ClampedArray(buffer)
  var ext = p.type.includes('/') ? p.type.split('/')[1] : 'jpg'
  return new File('f.' + ext, content)

}

