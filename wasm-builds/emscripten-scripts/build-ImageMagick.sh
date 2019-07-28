#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf ImageMagick
git clone https://github.com/ImageMagick/ImageMagick.git
# git clone https://github.com/ImageMagick/ImageMagick6.git ImageMagick
# git clone https://github.com/KnicKnic/ImageMagick.git
cd ImageMagick

emcmake make clean
# autoreconf -fiv
# autoconf

# libtoolize --force
# aclocal
# autoreconf --force
# automake --add-missing
# ./autogen
autoconf
# autoreconf

emconfigure ./configure --prefix="$PREFIX" \
  --without-threads --disable-shared --disable-openmp --enable-static  --without-lcms \
  --disable-docs --without-bzlib --without-webp \
  --without-heic --without-raw --without-perl --without-lzma --without-x \
  --disable-largefile --without-modules --without-jbig  --without-dps --without-fontconfig \
  --with-quantum-depth=$QUANTUM_DEPTH --enable-hdri=$HDRI \
   PKG_CONFIG_PATH="$PKG_CONFIG_PATH" # CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"  LDFLAGS="$LDFLAGS"
testExitCode "ImageMagick emconfigure" $?
# --without-magick-plus-plus --without-fontconfig   --enable-delegate-build --enable-zero-configuration  --disable-installed  \

# emcmake make # PKG_CONFIG_PATH="$PKG_CONFIG_PATH"  LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"
# testExitCode "ImageMagick emcmake make" $?

emcmake make install  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"
testExitCode "ImageMagick emcmake make install" $?

mkdir -p $PREFIX/wasm
echo "Module.arguments = ['-list', 'format']; " > $PREFIX/wasm/pre-js.js
echo "
Module.callMain('convert wizard: -scale 44% -rotate 33 foo.jpg'.split(' '))
var a = FS.readFile('foo.jpg')
var b = new Blob([a])
var img = document.createElement('img')
img.src=URL.createObjectURL(b)
document.body.append(img)
" >  $PREFIX/wasm/post-js.js

rm -rf $PREFIX/wasm/magick.js $PREFIX/wasm/magick.wasm $PREFIX/wasm/magick.html

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS --pre-js "$PREFIX/wasm/pre-js.js" \
  --post-js "$PREFIX/wasm/post-js.js" -o "$PREFIX/wasm/magick.html" utilities/magick.o $PREFIX/lib/*.a
testExitCode "ImageMagick emcc link" $?
