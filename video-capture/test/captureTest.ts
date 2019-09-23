import test from 'ava'
import { printMs } from 'misc-utils-of-mine-generic'
import { VideoCapture } from '../src/capture'

test.cb('addFrameListener single ', t => {
  const c = new VideoCapture({ port: 8082 })
  c.addFrameListener(frame => {
    t.deepEqual([frame.width, frame.height, frame.data.length], [480, 360, 691200])
    t.end()
  })
  c.initialize().then(() => c.start())
})

test.cb('addFrameListener multiple ', t => {
  let t0 = Infinity, t1 = Date.now()
  let i = 0
  const c = new VideoCapture({
    width: 200, height: 200, port: 8081
  })
  c.addFrameListener(frame => {
    i++
    // console.log('frame', i++);
    t.deepEqual([frame.width, frame.height, frame.data.length], [200, 200, 160000])
    if (i > 50) {
      console.log(i, 'frames', printMs(Date.now() - t0))
      console.log('total', printMs(Date.now() - t1))
      t.end()
    }
  })
  c.initialize().then(() => {
    t0 = Date.now()
    c.start()
  })
})


test.todo('pause, resume, stop')
test.todo('encode')
