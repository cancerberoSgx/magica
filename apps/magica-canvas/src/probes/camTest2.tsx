// import * as React from 'react'
// import { commands, Command } from '../commands'
// import { AbstractComponent } from '../component'
// import { Fields } from '../fields';
// import { memoryReport } from '../misc';
// import { dispatchCommandSelected, dispatchCanvasMouseMove, handleFileInputChange, createInputFile, handleInputFileChange } from '../dispatch';
// import { File, run } from '../../../../dist/src';

// export class CamTest2 extends AbstractComponent {
   
//   async componentDidUpdate(){
//     const constraints = {
//       video: true
//     };
//     // const video = document.querySelector('video')!;
//    const stream = await  navigator.mediaDevices.getUserMedia(constraints)
//         const v = stream.getVideoTracks().find(v=>v.readyState==='live')
//         //@ts-ignore
//         var imageCapture = new ImageCapture(v);
//         var p:Blob = await imageCapture.takePhoto() 
//         //@ts-ignore
//         var buffer = await p.arrayBuffer()
//         var content = new Uint8ClampedArray(buffer)
//         var f = new File('fpp.jpeg', content)
//          await handleInputFileChange(f)
//         // var r = await run({script: `convert ${f.name} output.miff`})
//         // var aa = await p
//         // var b: ImageBitmap = await imageCapture.grabFrame()
//         // video.srcObject = stream
//   }
//   render() {
//     return <> 
//           <video autoPlay></video>
//     </>
//   }
// }

// // function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
// //   return new Promise(resolve => {
// //     const fileReader = new FileReader()
// //     fileReader.onload = event => {
// //       const result = (event.target as any).result as ArrayBuffer
// //       resolve(new Uint8Array(result))
// //     }
// //     fileReader.readAsArrayBuffer(blob)
// //   })
// // }

// // export function blobToString(blb: Blob): Promise<string> {
// //   return new Promise(resolve => {
// //     const reader = new FileReader()
// //     reader.addEventListener('loadend', e => {
// //       const text = (e.srcElement as any).result as string
// //       resolve(text)
// //     })
// //     reader.readAsText(blb)
// //   })
// // }
