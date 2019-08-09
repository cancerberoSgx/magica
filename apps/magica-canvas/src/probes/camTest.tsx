// import * as React from 'react'
// import { commands, Command } from '../commands'
// import { AbstractComponent } from '../component'
// import { Fields } from '../fields';
// import { memoryReport } from '../misc';
// import { dispatchCommandSelected, dispatchCanvasMouseMove, handleFileInputChange } from '../dispatch';

// export class CamTest1 extends AbstractComponent {
   
//   componentDidUpdate(){
//       // The width and height of the captured photo. We will set the
//       // width to the value defined here, but the height will be
//       // calculated based on the aspect ratio of the input stream.
    
//       var width = 320;    // We will scale the photo width to this
//       var height = 0;     // This will be computed based on the input stream
    
//       // |streaming| indicates whether or not we're currently streaming
//       // video from the camera. Obviously, we start at false.
    
//       var streaming = false;
    
//       // The various HTML elements we need to configure or control. These
//       // will be set by the startup() function.
    
//       var video:HTMLVideoElement
//       var canvas:HTMLCanvasElement
//       var photo:HTMLImageElement
//       var startbutton:HTMLButtonElement
    
//       function startup() {
//         video = document.getElementById('videoTest') as any
//         canvas = document.getElementById('canvasTest') as any
//         photo = document.getElementById('photoTest') as any
//         startbutton = document.getElementById('startbuttonTest') as any
    
//         navigator.mediaDevices.getUserMedia({video: true, audio: false})
//         .then(function(stream) {
//           video.srcObject = stream;
//           video.play();
//         })
//         .catch(function(err) {
//           console.log("An error occurred: " + err);
//         });
    
//         video.addEventListener('canplay', function(ev){
//           if (!streaming) {
//             height = video.videoHeight / (video.videoWidth/width);
          
//             // Firefox currently has a bug where the height can't be read from
//             // the video, so we will make assumptions if this happens.
          
//             if (isNaN(height)) {
//               height = width / (4/3);
//             }
          
//             video.setAttribute('width', width+'');
//             video.setAttribute('height', height+'');
//             canvas.setAttribute('width', width+'');
//             canvas.setAttribute('height', height+'');
//             streaming = true;
//           }
//         }, false);
    
//         startbutton.addEventListener('click', function(ev){
//           takepicture();
//           ev.preventDefault();
//         }, false);
        
//         clearphoto();
//       }
    
//       // Fill the photo with an indication that none has been
//       // captured.
    
//       function clearphoto() {
//         var context = canvas.getContext('2d')!
//         context.fillStyle = "#AAA";
//         context.fillRect(0, 0, canvas.width, canvas.height);
    
//         var data = canvas.toDataURL('image/png');
//         photo.setAttribute('src', data);
//       }
      
//       // Capture a photo by fetching the current contents of the video
//       // and drawing it into a canvas, then converting that to a PNG
//       // format data URL. By drawing it on an offscreen canvas and then
//       // drawing that to the screen, we can change its size and/or apply
//       // other changes before drawing it.
    
//       function takepicture() {
//         var context = canvas.getContext('2d')!
//         if (width && height) {
//           canvas.width = width;
//           canvas.height = height;
//           // video.videoTracks[0].sourceBuffer.
//           // context.createImageData()
//           context.drawImage(video, 0, 0, width, height);
        
//           var data = canvas.toDataURL('image/png');
//           photo.setAttribute('src', data);
//         } else {
//           // clearphoto();
//         }
//       }
    
//       // Set up our event listener to run the startup process
//       // once loading is complete.
//       // window.addEventListener('load', startup, false);
//       startup()
//   }
//   render() {
//     return <> 
//       <div className="cameraTest">
//     <video id="videoTest">Video stream not available.</video>
//     <button id="startbuttonTest">Take photo</button> 
//   </div>
//   <canvas id="canvasTest">
//   </canvas>
//   <div className="outputTest">
//     <img id="photoTest" alt="The screen capture will appear in this box."/> 
//   </div>
// 	<p>
// 		Visit our article <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos"> Taking still photos with WebRTC</a> to learn more about the technologies used here.
// 	</p>  
//     </>
//   }
// }