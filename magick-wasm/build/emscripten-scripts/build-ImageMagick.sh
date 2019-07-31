#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "ImageMagick" ]; then
  git clone https://github.com/ImageMagick/ImageMagick.git
else
  ( cd ImageMagick ; make clean )
fi

cd ImageMagick

autoconf

emconfigure ./configure --prefix="$PREFIX" \
  --without-threads --disable-shared --disable-openmp --enable-static --without-lcms \
  --disable-docs --without-bzlib --without-magick-plus-plus \
  --without-heic --without-raw --without-perl --without-lzma --without-x \
  --disable-largefile --without-modules --without-jbig --without-dps --without-fontconfig \
  --with-quantum-depth=16 --enable-hdri=yes --with-utilities \
   PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CXXFLAGS" 

testExitCode "ImageMagick emconfigure" $?

emcmake make install PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CXXFLAGS"

testExitCode "ImageMagick emcmake make install" $?