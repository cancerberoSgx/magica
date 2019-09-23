 
# node-video-capture


## Contents

<!-- toc -->
 
<!-- tocstop -->

After searching for an easy to use portable library to access the webcam directly from node.js I didn't found a library that works in windows, macos and linux, without native dependencies that users need ot manually install (or even so, they won't work). 

This library solves the problem with an easy approach. Use headless browser to capture the video,  draw in canvas and post the image data from there to the Node.js side using page.exposeFunction() and without almost any encode since the image data is passed as array buffer. 

## Motivation 


## Playground & demos

 * TODO
 
## Summary

I didn't found any library that provides an interface to capture webcam video so I show the video and filter frame by frame in my Node.s desktop app (not based on electron - no canvas / HTML5 available - rendering on cairo/opengl surface that complies with

 * 
 * don't require users to install native complex dependencies (like opencv)
 * works on windows, macOs, and linux
 * provides a stream-like API for video frames
 * fast so it can be used for a "real-time" video filter demo
 * usable without electron/canvas/html5 - imagine I'm rendering in a native surface like cairo, gtk, etc
 * portable - no surprises - working in latest node.js versions
 * Optionally the frames can be encoded as in jpg/png or even a video created . 
 + Also provides simple filtering API.

## Status
 
 * just born - a prototype working - just designing an API now
 
## Install

```sh
npm install node-video-capture puppeteer
```

(puppeteer is a peer dependency you must install by yourself)

## Command line

TODO

## JavaScript API

```js
import 
```

## Reference API

* TODO
 
## TODO / Road map

- [ ] investigate why/how to pass the buffer / vide directly without transforming it to number[]
- [ ] probably for frames a generator / or observable is more appropriate than even listeners.