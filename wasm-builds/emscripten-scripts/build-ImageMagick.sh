#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf ImageMagick
git clone https://github.com/ImageMagick/ImageMagick.git
cd ImageMagick


autoconf

emconfigure ./configure --prefix="$PREFIX" \
  --without-threads --disable-shared --disable-openmp --enable-static --without-lcms \
  --disable-docs --without-bzlib --without-magick-plus-plus \
  --without-heic --without-raw --without-perl --without-lzma --without-x \
  --disable-largefile --without-modules --without-jbig --without-dps --without-fontconfig \
  --with-quantum-depth=$QUANTUM_DEPTH --enable-hdri=$HDRI --with-utilities \
   PKG_CONFIG_PATH="$PKG_CONFIG_PATH"  
# --enable-delegate-build --enable-zero-configuration  --disable-installed  \

testExitCode "ImageMagick emconfigure" $?

emcmake make install PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"

testExitCode "ImageMagick emcmake make install" $?

rm -rf $PREFIX/wasm
mkdir -p $PREFIX/wasm

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS \
-o "$PREFIX/wasm/magick.html" utilities/magick.o  $PREFIX/lib/*.a \
$PREFIX/src/ImageMagick/MagickWand/libMagickWand_7_Q8_la-compare.o \
$PREFIX/src/ImageMagick/ImageMagick/MagickCore/libMagickCore_7_Q8_la-fourier.o \
$PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-magic.o \
$PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-cipher.o \
$PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-magick.o

testExitCode "ImageMagick emcc link" $?

# --pre-js "$PREFIX/wasm/pre-js.js" --post-js "$PREFIX/wasm/post-js.js" \


# echo "Module.arguments = ['-list', 'format']; " > $PREFIX/wasm/pre-js.js
# echo "
# Module.callMain('convert wizard: -scale 44% -rotate 33 foo.jpg'.split(' '))
# var a = FS.readFile('foo.jpg')
# var b = new Blob([a])
# var img = document.createElement('img')
# img.src=URL.createObjectURL(b)
# document.body.append(img)
# " >  $PREFIX/wasm/post-js.js
