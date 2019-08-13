import { tryTo } from 'misc-utils-of-mine-generic'
import { File } from '../../../dist/src'
import { handleInputFileChange } from './app/dispatch'

export async function setVideoEnable(enabled: boolean) {
  if (!enabled) {
    resetCapture()
    return
  }
  tryTo(resetCapture)
  const constraints = {
    video: true
  }
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  const videoTrack = stream.getVideoTracks().find(v => v.readyState === 'live')!
  //@ts-ignore
  imageCapture = new ImageCapture(videoTrack)
  timer = setInterval(setInputImage, 2000)
}

function resetCapture() {
  if (imageCapture) {
    imageCapture.track.stop()
    imageCapture = undefined
  }
  clearInterval(timer)
}

let timer: any

let imageCapture: any

async function setInputImage() {
  var p: Blob = await imageCapture.takePhoto()
  //@ts-ignore
  var buffer = await p.arrayBuffer()
  var content = new Uint8ClampedArray(buffer)
  var f = new File('fpp.' + p.type.split('/')[1], content)
  await handleInputFileChange(f)
}
