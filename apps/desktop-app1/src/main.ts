import { Window, MessageLoop, Label, Container, } from 'gui'
import { Worker, isMainThread, parentPort, workerData}  from 'worker_threads'
import { flatInstallArrayPrototype } from 'misc-utils-of-mine-generic'
import { join } from 'path'
import { _setState, getInitialState } from './store'
import { App1 } from './app'
import { loadLibraries } from './imageUtil'
flatInstallArrayPrototype()

async function main() {

  // console.log('BE1');

  // console.log('BE0');

  //    const worker = new Worker(join(__dirname, "./libWorker.js"))
  // // // console.log('BE1');
  //    worker.on('message', m=>{
  //      console.log('message', m);
  //       //  handlers.loadLibraries().then(()=>{
  //     // console.log('ernddds');
  // // win.terminate()
  // // win.close()
  //     // MessageLoop.quit()
  //     // _setState(getInitialState())
  // // const app = new App1({})
  //     //  console.log('message2s', m);

  // // app.render()
  // // app.start()
  //    })
      // worker.on('error', err=>console.error('error', err));
      // worker.on('exit', (code) => {
      //   if (code !== 0)
      //     console.error(new Error(`Worker stopped with exit code ${code}`));
      // })


      // worker.
  // console.log('BE2');

  // const handlers = await spawn(w, )
  // console.log('BE3');
  
  // handlers.loadLibraries().then(()=>{
  //     console.log('ernddds');
  // w.terminate()
  //     MessageLoop.quit()
  // win.close()
  //     _setState(getInitialState())
  // const app = new App1({})
  // app.render()
  // app.start()
  // })


  const win = Window.create({transparent: false, frame: true})
  const c = Container.create()
    c.setStyle({flex:1})
    const label = Label.create('Loading Libraries...')
    label.setStyle({flex:1})
  c.addChildView(label)
  //   process.arch==='darwin' && win.setTitleVisible(false)
    win.setContentView(c)
    win.setContentSize({width: 200, height: 100})
  win.center()
    win.activate()
    if (!process.versions.yode) {
    MessageLoop.run()
    // process.exit(0)
    }
  //   MessageLoop.postDelayedTask(200, ()=>{
  //   loadLibraries(()=>{
  //     console.log('ernddds');
      
  // win.close()
  //     _setState(getInitialState())
  // const app = new App1({})
  // app.render()
  // app.start()
  //   })
  //   })
    MessageLoop.postDelayedTask(1,async ()=>{
  //   loadLibraries(()=>{
  //     console.log('ernddds');
      await loadLibraries()
  win.close()
      _setState(getInitialState())
  const app = new App1({})
  app.render()
  app.start()
    })
    // })
    // magickLoaded.then(()=>{
    //   console.log('ernddds12222', magickLoaded.status);

    // })
//   c.onDraw=(self, painter, rect) =>{
//     // loadLibraries(()=>{
//     //   console.log('ernddds');
//     // })
//       // console.log('ernddds1', magickLoaded.status);
//       // loadLibraries 
//     //()=>{
//       if(magickLoaded.status==='resolved'){
// // c.dr
//       console.log('ernddds2');

//         win.close()
//       _setState(getInitialState())
//   const app = new App1({})
//   app.render()
//   app.start()
//       } else {

// // setImmediate(()=>c.schedulePaint())
// MessageLoop.postTask(()=>c.schedulePaint())
// // MessageLoop.postTask(()=>nextTick(()=>c.schedulePaint()))

//       }
      // console.log('ernddds22');
    // })
  // }

  // console.log('Loading libraries...')
  // await loadLibraries()
  // console.log('Starting App...')
}
main().catch(console.error)
 