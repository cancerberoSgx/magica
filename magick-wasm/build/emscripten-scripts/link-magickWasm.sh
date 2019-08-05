#!/bin/bash
# This file is auto-generated from src/templates
source emscripten-scripts/base.sh

cd $PREFIX/src/ImageMagick

rm -rf $PREFIX/wasm
mkdir -p $PREFIX/wasm

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS \
  -o "$PREFIX/wasm/magick.html" utilities/magick.o  $PREFIX/lib/*.a \
  $PREFIX/src/ImageMagick/MagickWand/libMagickWand_7_*_la-compare.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-fourier.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-vision.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-module.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-magic.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-module.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-cipher.o \
  $PREFIX/src/ImageMagick/MagickCore/libMagickCore_7_*_la-magick.o 
# --embed-file $PREFIX/etc/ImageMagick-7@/etc/ImageMagick-7

mv $PREFIX/wasm/magick.js $PREFIX/wasm/magick2.js
echo "// @ts-nocheck
" > $PREFIX/wasm/magick.js
cat $PREFIX/wasm/magick2.js >> $PREFIX/wasm/magick.js
rm  $PREFIX/wasm/magick2.js

testExitCode "ImageMagick emcc link" $?
