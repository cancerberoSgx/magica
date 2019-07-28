magica's own scripts to compile ImageMagick and several of it's dependency libraries to WASM

# Build

## Use docker

```
sh emscripten-scripts/run-docker.sh
```

## Use local emcc

Use local system's emsdk (it will also need build essential tools):

```
sh emscripten-scripts/sh.sh
```

If everything is OK, both commands will generate the folder `emscripten_prefix/wasm/` with files magick.wasm and magick.js files that can substitute magica's `src/imageMagick/compiled/*`.

# Tests

The following command clone's magica project, replace the wasm files with the new ones, and runs its tests to verify nothing it's broken. Take into account that some tests could assume some magick capabilities or image format support that might not be supported by new build configurations. The default confg should run OK.

```
sh emscripten-scripts/test-wasm-magica.sh
```

# Notes / Problems

## IM quantum=16 and emscripten and typed arrays
 * IM Q16 won't work nicely (or at least easily/ straightforward) when loading images as ArrayBuffer). If you create UInt8Array a "unaligned error" will be thrwon or fail silently. I think (hope) that it solves by just using  --with-quantum-depth=8. 
 even if I build the data view using   var view = new DataView(content) it won't work (or other ways new UInt16Array(new Uint8Array(content)))
 *  Also Probably this also solves the errors with ImageMagick/png project ?




# browser :


Module.callMain('convert wizard: -scale 44% -rotate 33 foo.jpg'.split(' '))
var a = FS.readFile('foo.jpg')
var b = new Blob([a])
var img = document.createElement('img')
img.src=URL.createObjectURL(b)
document.body.append(img)

Module.callMain('convert rose: foo.json'.split(' '))
const bounds = JSON.parse(new TextDecoder("utf-8").decode(FS.readFile('foo.json')))[0].image.geometry

const imageData = new ImageData(bounds.width, bounds.height)
Module.callMain('convert rose: -depth 8 out.rgba'.split(' '))
imageData.data = FS.readFile('out.rgba')

document.getElementById('canvas').getContext('2d').putImageData(imageData)
Module.callMain('convert -list format'.split(' '))
