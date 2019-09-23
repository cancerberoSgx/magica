import test from 'ava'
import { printMs } from 'misc-utils-of-mine-generic'
import { VideoCapture } from '../src/capture'
import fileTypes from 'file-type'
import fileType from 'file-type'

test.serial.cb('addFrameListener single ', t => {
  const c = new VideoCapture({ port: 8082, width: 480, height: 360 })
  c.addFrameListener(frame => {
    t.deepEqual([frame.width, frame.height, frame.data.length], [480, 360, 691200])
    t.end()
  })
  c.start()
})

test.serial.cb('addFrameListener multiple ', t => {
  let t0 = Infinity
  let t1 = Date.now()
  let i = 0
  const c = new VideoCapture({
    width: 200, height: 200, port: 8081
  })
  c.addFrameListener(frame => {
    i++
    t.deepEqual([frame.width, frame.height, frame.data.length], [200, 200, 160000])
    if (i > 50) {
      t.end()
    }
  })
  c.initialize().then(() => {
    t0 = Date.now()
    c.start()
  })
})

test.serial('users requesting frames instead notifications', async t => {
  const c = new VideoCapture({
    width: 100, height: 100, port: 8083
  })
  await c.initialize()
  const f = await c.readFrame()
  const f2 = await c.readFrame()
  t.deepEqual([f.width, f.height, f.data.length], [100, 100, 40000])
  t.deepEqual([f2.width, f2.height, f2.data.length], [100, 100, 40000])
  t.true(f !== f2)
})

test.serial('encoded frames', async t => {
  const c = new VideoCapture({
    width: 100, height: 100, port: 8084
  })
  await c.initialize()
  const f = await c.readFrame('image/png')
  t.deepEqual(fileType(f.data), {ext:'png', mime: 'image/png'})
  const f2 = await c.readFrame('image/jpeg')
  t.deepEqual(fileType(f2.data),  {ext:'jpg', mime: 'image/jpeg'})
})


test.todo('pause, resume, stop')
