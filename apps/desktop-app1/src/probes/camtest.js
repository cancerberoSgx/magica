// var cv = require('opencv');
// try {
//   var camera = new cv.VideoCapture(0);
//   var window = new cv.NamedWindow('Video', 0)
//   setInterval(function() {
//     camera.read(function(err, im) {
//       if (err) throw err;
//       console.log(im.size())
//       if (im.size()[0] > 0 && im.size()[1] > 0){
//                 if (err) throw err;
//                 window.show(im);
//       }
//       window.blockingWaitKey(0, 50);
//     });
//   }, 20);
// } catch (e){
//   console.log("Couldn't start camera:", e)
// }

//Available in nodejs

var NodeWebcam = require( "node-webcam" );


//Default options

var opts = {

    //Picture related

    width: 640,

    height: 480,

    quality: 100,


    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows

    delay: 0,


    //Save shots in memory

    saveShots: true,


    // [jpeg, png] support varies
    // Webcam.OutputTypes

    output: "jpeg",


    //Which camera to use
    //Use Webcam.list() for results
    //false for default device

    device: false,


    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes

    callbackReturn: "buffer",


    //Logging

    verbose: false

};


//Creates webcam instance

var Webcam = NodeWebcam.create( opts );


// //Will automatically append location output type

Webcam.capture( "test_picture", function( err, data ) {
  console.log(err, data);
  
} );


// //Also available for quick use

// NodeWebcam.capture( "test_picture", opts, function( err, data ) {

// });


//Get list of cameras

Webcam.list( function( list ) {

    //Use another device
console.log(list);

    // var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );

});

//Return type with base 64 image

// var opts = {
//     callbackReturn: "base64"
// };

// NodeWebcam.capture( "test_picture", opts, function( err, data ) {

//     var image = "<img src='" + data + "'>";

// });
