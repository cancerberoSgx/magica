# magick-wasm

## Contents

<!-- toc -->

- [What?](#what)
- [Summary](#summary)
- [Usage](#usage)
- [Build result](#build-result)
- [Questions](#questions)
- [Hacking](#hacking)
  * [run-docker command (Internal)](#run-docker-command-internal)
  * [Replace magica's and run its tests (Internal)](#replace-magicas-and-run-its-tests-internal)
  * [Project versions registry](#project-versions-registry)
  * [(OLD) Notes about package versions and sources](#old-notes-about-package-versions-and-sources)
    + [ImageMagick](#imagemagick)
    + [png](#png)
    + [tiff](#tiff)
    + [zlib](#zlib)
    + [libjpeg](#libjpeg)
    + [freetype](#freetype)
    + [fftw](#fftw)
    + [webp](#webp)
    + [open-jpeg](#open-jpeg)
    + [turbo-jpeg (not included)](#turbo-jpeg-not-included)

<!-- tocstop -->

## What?

**WebAssembly build of ImageMagick and its libraries**

Produces JavaScript and WASM usable form Node.js and Browser with a simple API to call  ImageMagick command line utilities like `convert`, `identify`, `montage`, etc as an API.

Although it was implemented for [magica](https://github.com/cancerberoSgx/magica) it's totally independent of it and should be suitable for any use case needing.

See [main()](https://github.com/cancerberoSgx/magica/blob/master/src/main/main.ts) for simpler higher level implementation on top of it based on promises and defining a simple `File` interface.

## Summary

 * Generates shell scripts that: 
   * downloads latest versions of ImageMagick project and dependency libraries (mostly https://github.com/ImageMagick)
   * the script builder accepts settings for: 
     * enable/disable features like quantum-depth, hdri
     * build type: 'production', 'debug', 'incremental'
     * enable/disable dependency library
     * output folder, docker launch, script output, etc
   * WIP settings to re-use existing sources and optimize wasm build time and/or compile only certain libraries
   * WIP : command line tool to call the script generator
   * report git commits/sources for each project downloaded.

## Usage
 
TODO: the idea is to have a CLI that accepts parameters, builds scripts and optionally runs the build and tests. Right now what works instead is (`npx ts-node src/launch.ts`)

Install the tool globally (or locally and call it with `npx`)

```sh
npm install -g magick-wasm
```

Generates the default build type (production). in current directory and start it (docker needs to be up and running):

```sh
magick-wasm
```

Generates a "debug" build type, reusing current PREFIX/src folders in given `outputFolder`. 
It doesn't execute docker but prints instructions how to do it manually:

```sh
npx ts-node src/launch.ts --outputFolder $HOME/wasm/im --type debug --noClean --noRun
```


## Build result 

If everything is OK, (assuming default options), `emscripten_prefix/wasm/magick.wasm` and  `emscripten_prefix/wasm/magick.js` files should be generated.

In [magica](https://github.com/cancerberoSgx/magica) those can replace the ones at [src/imageMagick/compiled](https://github.com/cancerberoSgx/magica/src/imageMagick/compiled)


## TODO / STATUS / Roadmap

- [ ] --outputFolder
- [ ] minimal js api
- [ ] cli test
- [ ] test that control important build configuration (type=debug && type==production) (generates scripts from scratch, calls docker ) and run scripts/test-* scripts
 

## Questions

(I need to ask)

 * whats the use Magick.Native is necessary ? should I include that? what's the gain? consider browser and node.js
 * Should I include font-config ? what's the gain?

## Hacking

 * `wasm-builds/emscripten-scripts/base.sh` base flags, debug or production build, etc
 * `wasm-builds/emscripten-scripts/build.sh` libraries build orchestrator
 * `src/defaults.ts` has defaults template context values (like depth, production/debug release, hdri, etc)
 * `src/types.ts` types of template context and CLI/API options

### run-docker command (Internal)

Docker needs to be installed and running.

```
cd build
sh emscripten-scripts/run-docker.sh
```

If everything is OK that should generate magick WASM files at `magick-wasm/build/emscripten_prefix/wasm/`. 

Also, since latest versions of git projects for ImageMagick and libraries are used, the versions of each are dump at `magick-wasm/build/versions.txt`.

### Replace magica's and run its tests (Internal)

The following command clone's magica project, replace the wasm files with the new ones, and runs its tests to verify nothing it's broken.

```
sh emscripten-scripts/test-wasm-magica.sh
```

Take into account that some tests could assume some magick capabilities or image format support that might not be so. Tests are not yet intelligent to detect current IM capabilities but they will be.

### Project versions registry

 * After a successfull build a file [versions.txt](build/versions.txt) file will be written with info about git repository urls and revisions used for each project


### (OLD) Notes about package versions and sources 

#### ImageMagick

latest from official repository:  https://github.com/ImageMagick/ImageMagick.git - cf00632d1

**No modifications needed** (we build all using --prefix and using PCK_CONFIG_PATH the configure script takes all dependencies from there.)

#### png

Latest from ImageMagick with little changes in mempng.c when free() C pointers (as Knicknic need to modify also to work with emscripten) https://github.com/cancerberosgx/png.git - 62b9724

TODO: discuss and PR to IM repo - I really don't understand (nto an expert) why this happen. Perhaps can be avoided using a emcc flag ? Also ask emscripten guys. 

Probably could solve other libraries similar problems.

#### tiff

Latest from ImageMagick tiff repository with no modifications. 
 
https://github.com/ImageMagick/tiff.git - 4965cb9

#### zlib 

zlib: latest ImageMagick zlib repository with no modifications
https://github.com/ImageMagick/zlib.git - 6a152c1

#### libjpeg

https://github.com/KnicKnic/libjpeg.git - fbaf3bf 

Using wasm-imagemagick (knicknic) version. had trouble reading files with mageMagick/jpeg-turbo and with the original libjpeg repos (see below). TODO: ask knicknic for changes since git diff is not clear. Also we could search for an alternative / updated or look which changes are needed in those.

#### freetype

freetype: https://github.com/ImageMagick/freetype.git - 598ad7c

emscripten freetype port also work but I prefer this version since is "official" for IM and updated.

#### fftw

(fast fourier transformations)

downloading http://www.fftw.org/fftw-3.3.8.tar.gz - no modifications needed - no version control found. Has a couple non exhaustive tests

#### webp

from official IM project without modifications: https://github.com/ImageMagick/webp.git. Although this library cmake has a js (WebAssembly target) using -DWEBP_BUILD_WEBP_JS=on it's not used and wasm is built as the rest of the libraries . Has read/write tests

#### open-jpeg 

Compiling fine from latest https://github.com/ImageMagick/open-jpeg.git. Has tests

#### turbo-jpeg (not included)

didn't work for most images since a problem in "markers" . There is some notes documenting this as limitation. But probably is an error related to why knicknic need to change the official library. In any case it compiles OK and writes OK but fails to read. 

TODO: ask knicknic for help to patch this version or update his, since the diff in git is not clear.


