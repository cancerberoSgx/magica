#!/bin/bash
source emscripten-scripts/base.sh

cd $PREFIX/src/ImageMagick

rm -rf $PREFIX/wasm
mkdir -p $PREFIX/wasm


rm -rf $PREFIX/wasm
mkdir -p $PREFIX/wasm

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS \
  -o "$PREFIX/wasm/magick.html" utilities/magick.o  $PREFIX/lib/*.a \
  $PREFIX/src/ImageMagick/MagickWand/libMagickWand_7_Q8_la-compare.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-fourier.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-vision.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-module.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-magic.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-module.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-cipher.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_Q8_la-magick.o 
# --embed-file $PREFIX/etc/ImageMagick-7@/etc/ImageMagick-7

testExitCode "ImageMagick emcc link" $?
