# Magica

Easy to setup and use, ImageMagick Node.js and Browser API and Command Line Interface. 

## Contents

<!-- toc -->

- [Playground & demos](#playground--demos)
- [Summary](#summary)
- [Install](#install)
  * [Browser setup](#browser-setup)
- [Command line](#command-line)
- [JavaScript API](#javascript-api)
  * [Node.js](#nodejs)
  * [Browser](#browser)
    + [Web Worker](#web-worker)
- [Options](#options)
- [Why](#why)
- [TODO / Road map](#todo--road-map)
  * [Ideas](#ideas)

<!-- tocstop -->

## Playground & demos

 * [Magica Playground](https://cancerberosgx.github.io/demos/magica/playground/) (WIP)
 
## Summary

 * JavaScript API for Node.js and Browser
 Command line interface which supports simple straightforwards translation between ImageMagick utilities command line interface (like `convert` command).
 * Easy/Quick setup, no emscripten build needed.
 * Includes ImageMagick emscripten binaries from [wasm-imagemagick](https://github.com/KnicKnic/WASM-ImageMagick) so no build is necessary. Just `npm install` and you are ready to go.

## Install

```sh
npm install magica
```

If you only will use the Command Line Interface perhaps a better option is installing it globally:

```sh
npm install -g magica
```
### Browser setup

 * **IMPORTANT**: make sure `dist/src/imageMagick/compiled/magick.wasm` is located at the same folder of your .js bundle file.
 * the rest of the files you can be bundled with any technology like browserify, parcel, webpack etc.
 * See npm script "browser-sample". Run "npm run browser-sample" and look samples at `test-browser/` file
 * browser tests can be executed (run with puppeteer) with `npm run test-browser`

## Command line

The command line interface will let you use the same Image Magick commands. The only difference is that you will need to explicitly list the input files paths. 

In the following example we execute `identify n.png`:

```sh
$ magica --command "identify n.png" --input test/assets/n.png 
n.png PNG 109x145 109x145+0+0 8-bit sRGB 39796B 0.000u 0:00.000
```

Notice that besides passing the ImageMagick command with `--command` we also passed the image files using `--input`. It is important that the basename of given input files match the file names referenced in the command (`n.png`): 

Some other examples: 

```sh
magica --input test/assets/n.png --command "convert n.png -scale 44% tmp.gif"
```

`--input` can be a glob of files, useful for batch multiple images or to build gifs from several images. 

TODO example with globs and gifs

## JavaScript API

The JavaScript API is equivalent to the Command Line Interface. The command references files that are passed separately. Since this library supports both Node.js and the browser, users are responsible of providing the input file contents. 

### Node.js

In the following example we convert an image in Node.js

```ts
import {main} from 'magica'
import { readFileSync, writeFileSync } from 'fs'

(async ()=>{
 const result = await main({
    debug: true,
    command: 'convert foo.png -scale 50% foo2.png',
    inputFiles: [ 'test/assets/n.png' ]
  })
  result.outputFiles.forEach(f => writeFileSync(f.name, f.content))
})()
```

### Browser 

The following example is analog to the previous one but in the browser: 

```ts
import {main} from 'magica'

(async ()=>{
 const result = await main({
    debug: true,
    command: 'convert bar.gif -scale 150% -rotate 45 foo.png',
    inputFiles: [ 'static/img/bar.gif' ]
  })
  const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode(...result.outputFiles[0].content))}`
  document.getElementById('img-foo').src = dataUrl
})()
```

#### Web Worker

Of course in the browser you will want to use a web-worker to process images. Just pass the command object as a message, execute `main()` in the worker and return back the result. 

Both the command and result objects are designed to transfer data between main thread and worker optimally.

See `test-browser/webWorker` and `npm run test-worker` script for a working simple example.

## Options

Options are the same for the command line and the API:

 * `--input: string[]`: (command line only) Input file paths. It can also be glob patterns. For passing more than one use `--input` multiple times. It's important that the base name of these paths match the file names given in the command.
 * `--command: string | string[]`: An ImageMagick command, for example: `"convert foo.png -scale 50% bar.gif"`.
 * `--inputFiles?: string | string[]`: (API only) The list of input files referenced in given command. It's important that the name of this files match the file names given in the command. If string and a file exists (node.js) then that file will be used. Otherwise it will be considered a url. In later cases, the filename will be the base name of file or url.
 * `--localNodeFsRoot?: string`:
 * `--emscriptenNodeFsRoot?: string`:
 * `--help?: boolean`: (command line only)
 * `--debug?: boolean`:
 * `disableNodeFs?: boolean`: (node.js only) Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be faster if read/write many images but consumes more memory.

## Why

 * I really need a 100% JavaScript node.js API and CLI which [wasm-imagemagick](https://github.com/KnicKnic/WASM-ImageMagick) currently doesn't provides. 
 * I contributed in [wasm-imagemagick](https://github.com/KnicKnic/WASM-ImageMagick)'s JavaScript API (for browser only) and I wanted to revisit:
  * Support node.js without having two separate distribution or using different technologies / APIs.
  * Although the principles of the API are the same, this project aims to simplifies some parts of it.
  * Clearly de couple the wasm build process and its internal details from the user API assuming a well known, simple API (see below).
  * Although currently [wasm-imagemagick](https://github.com/KnicKnic/WASM-ImageMagick) is the most mature (and I would working) ImageMagick emscripten port, there are other initiatives which could support more features or have better performance. This library is designed to easily support these emscripten wasm "binaries" without big changes (or even switch between them)
 * Don't want to be responsible of compiling .wasm, so this project includes and uses wasm-imagemagick files directly. `src/imageMagick/compiled/` can be generated from that project executing `npm run test-node`.
 * [wasm-imagemagick](https://github.com/KnicKnic/WASM-ImageMagick), [Magick.Native](https://github.com/dlemstra/Magick.Native/) and possibly others perform an complex task of porting ImageMagick to JavaScript which is not a trivial task, involving several C++ libraries (with alternatives). For example they should test if png, jpeg, and all Imagemagick transformations and combinations work OK. 
  * I believe the end user API should be built on top of this, in an independent project that assumes only a simple ImageMagick API is supported. Currently this API is the **Command Line interface of ImageMagick command line utilities like `convert`, `ìdentify`, `mogrify`, etc**. (Notice that is not the C/C++ API like MagickCore, MagickWand, etc, but the Command line interface of utilities like `convert` which IMO covers 99% of use cases and is easy to use (compared to the C/C++ APIs).
  * If a ImageMagick emscripten port supports this ImageMagick utilities Command line interface, then it should be automatically used by this project. (just replacing the .wasm should be enough)
  * I wanted have tests in Node.js and Browser and a easy/scalable framework for that.

## TODO / Road map

- [ ] fix npm run test-js
- [ ] consume input image from stream and support stdin . same for output / stdout
- [ ] support multiple line string commands like in src/main/command.ts
  - [ ] support IM command quoted arguments
- [ ] verify mkdir-p for output files
- [ ] because options are global - sending commands concurrently could fail. Solution: queue or instance options
- [ ] an easy to use API for web-workers
- [ ] verify web worker  passing files is optimal (verify transferable/shared array buffers/optimal)
- [ ] Option for Node.js users to work/mount current directory - the tool should not copy input files just use them since are present in mount root ems
- [ ] how high level scripts like test/probes/sketcher.ts can be integrated ? different project ?
- [ ] scripts/generateImEnumd.ts we should execute our CLI to extract 
- [ ] remove all logic from imageMagick/compiled/nodeMagick.js to separate.ts file
- [x] imageCompare()
- [x] extractImageInfo()
- [x] test from a real-app - check missing exported APIs - npm install usability
- [x] playground
- [x] webworker example & recipe (see test-browser/webWorker)
- [x] format tests
- [x] Performance tests (can we measure also memory consumption?)
- [x] browser tests
- [x] support input images from URLS both in node and browser.
- [x] node.js : work directly in user's filesystem without copying to emc FS: 
- [x] browser
- [x] CLI
- [x] CLI tests
- [x] Input file from url

### Ideas

- [ ] drawing svg. is not documented and seems the official way is doing it using mvg. But... what if we convert all shapes to paths, use svgo to reduce the number to (even single ) path and use draw to draw them. syntax seems to be compatible... This way we should have yet another method of rasterize a svg, but this time to any format. I wonder what the speed is compared to other rasterize methods, if we target .ma