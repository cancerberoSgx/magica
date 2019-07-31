magica's own scripts to compile ImageMagick and several of it's dependency libraries to WASM using emscripten


# Build

docker needs to be installed

```
sh emscripten-scripts/run-docker.sh
```

If everything is OK that should generate magick WASM files at `magick-wasm/build/emscripten_prefix/wasm/`. 

Also, since latest versions of git projects for ImageMagick and libraries are used, the versions of each are dump at `magick-wasm/build/versions.txt`.

# Tests

The following command clone's magica project, replace the wasm files with the new ones, and runs its tests to verify nothing it's broken.

```
sh emscripten-scripts/test-wasm-magica.sh
```

Take into account that some tests could assume some magick capabilities or image format support that might not be so. Tests are not yet intelligent to detect current IM capabilities but they will be.

# Configuration / structure

 * `wasm-builds/emscripten-scripts/base.sh` base flags, debug or production build, etc
 * `wasm-builds/emscripten-scripts/build.sh` libraries build orchestrator



# Package versions and sources:

## ImageMagick

latest from official repository:  https://github.com/ImageMagick/ImageMagick.git - cf00632d1

**No modifications needed** (we build all using --prefix and using PCK_CONFIG_PATH the configure script takes all dependencies from there.)

## png

Latest from ImageMagick with little changes in mempng.c when free() C pointers (as Knicknic need to modify also to work with emscripten) https://github.com/cancerberosgx/png.git - 62b9724

TODO: discuss and PR to IM repo - I really don't understand (nto an expert) why this happen. Perhaps can be avoided using a emcc flag ? Also ask emscripten guys. 

Probably could solve other libraries similar problems.

## tiff

Latest from ImageMagick tiff repository with no modifications. 
 
https://github.com/ImageMagick/tiff.git - 4965cb9

# zlib 

zlib: latest ImageMagick zlib repository with no modifications
https://github.com/ImageMagick/zlib.git - 6a152c1

## libjpeg

https://github.com/KnicKnic/libjpeg.git - fbaf3bf 

Using wasm-imagemagick (knicknic) version. had trouble reading files with mageMagick/jpeg-turbo and with the original libjpeg repos (see below). TODO: ask knicknic for changes since git diff is not clear. Also we could search for an alternative / updated or look which changes are needed in those.

## freetype

freetype: https://github.com/ImageMagick/freetype.git - 598ad7c

emscripten freetype port also work but I prefer this version since is "official" for IM and updated.

## fftw

(fast fourier transformations)

downloading http://www.fftw.org/fftw-3.3.8.tar.gz - no modifications needed - no version control gound.

## webp

from official IM project without modifications: https://github.com/ImageMagick/webp.git

## turbo-jpeg (not included)

didn't work for most images since a problem in "markers" . There is some notes documenting this as limitation. But probably is an error related to why knicknic need to change the official library. In any case it compiles OK and writes OK but fails to read. 

TODO: ask knicknic for help to patch this version or update his, since the diff in git is not clear.

## open-jpeg (not included)

Compiling fine from latest https://github.com/ImageMagick/open-jpeg.git  - seems to work fine - Currently not including it since I don't know yet how/where is used. 


# Questions

 * What is Magick.Native is necessary ? how would improve the browser ?
