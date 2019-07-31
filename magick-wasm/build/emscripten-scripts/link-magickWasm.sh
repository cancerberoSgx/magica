#!/bin/bash
source emscripten-scripts/base.sh

cd $PREFIX/src/ImageMagick

rm -rf $PREFIX/wasm
mkdir -p $PREFIX/wasm

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS \
  -o "$PREFIX/wasm/magick.html" $PREFIX/src/ImageMagick/utilities/magick.o $PREFIX/lib/*.a \
  $PREFIX/src/ImageMagick/MagickWand/libMagickWand_*-compare.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-fourier.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-vision.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-module.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-magic.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-module.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-cipher.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_*-magick.o 
# --embed-file $PREFIX/etc/ImageMagick-7@/etc/ImageMagick-7

testExitCode "link magick.wasm" $?
