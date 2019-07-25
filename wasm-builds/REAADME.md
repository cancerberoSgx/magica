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
