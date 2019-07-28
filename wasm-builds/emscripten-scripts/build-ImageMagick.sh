#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
# rm -rf ImageMagick
# git clone https://github.com/ImageMagick/ImageMagick.git
# git clone https://github.com/ImageMagick/ImageMagick6.git ImageMagick
# git clone https://github.com/KnicKnic/ImageMagick.git
cd ImageMagick

# make clean
autoreconf -fiv
emconfigure ./configure --prefix="$PREFIX" \
  --without-threads --disable-shared --disable-openmp --enable-static  --without-lcms \
  --enable-delegate-build --enable-zero-configuration \
  --disable-docs --without-bzlib --without-webp \
  --without-heic --without-raw --without-perl --without-lzma --without-x \
  --disable-largefile --without-modules --disable-installed --without-jbig  --without-dps \
  --with-quantum-depth=$QUANTUM_DEPTH --enable-hdri=$HDRI \
   PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"  LDFLAGS="$LDFLAGS"
testExitCode "ImageMagick emconfigure" $?
# --without-magick-plus-plus --without-fontconfig 

# emcmake make # PKG_CONFIG_PATH="$PKG_CONFIG_PATH"  LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"
# testExitCode "ImageMagick emcmake make" $?

emcmake make install # PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"
testExitCode "ImageMagick emcmake make install" $?

mkdir -p $PREFIX/wasm
echo "Module.arguments = ['-list', 'format']; " > $PREFIX/wasm/pre-js.js

# LIBS="$PREFIX/lib/libMagickCore-7.Q${QUANTUM_DEPTH}${HDRI_LABEL}.a $PREFIX/lib/libMagickWand-7.Q${QUANTUM_DEPTH}${HDRI_LABEL}.a $PREFIX/lib/libpng16.a $PREFIX/lib/libturbojpeg.a $PREFIX/lib/libjpeg.a $PREFIX/lib/libtiffxx.a $PREFIX/lib/libfftw3.a $PREFIX/lib/libz.a $PREFIX/lib/libfreetype.a $PREFIX/lib/libtiff.a"

LIBS=$PREFIX/lib/*.a

rm -rf $PREFIX/wasm/magick.js $PREFIX/wasm/magick.wasm $PREFIX/wasm/magick.html

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS --pre-js "$PREFIX/wasm/pre-js.js" -o "$PREFIX/wasm/magick.html" utilities/magick.o $LIBS 
testExitCode "ImageMagick emcc link" $?
