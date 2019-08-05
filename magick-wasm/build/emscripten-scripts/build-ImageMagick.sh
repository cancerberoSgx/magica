#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

SKIP_CONFIG=0
SKIP_BUILD=0

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "ImageMagick" ]; then
  SKIP_CONFIG=0
  SKIP_BUILD=0
  git clone https://github.com/ImageMagick/ImageMagick.git
elif [ "$SKIP_BUILD" -eq "0" ]; then
  ( cd ImageMagick ; make clean )
fi

cd ImageMagick

if [ "$SKIP_CONFIG" -eq "0" ]; then

  autoconf

  emconfigure ./configure --prefix="$PREFIX" \
    --without-threads --disable-shared --disable-openmp --enable-static --without-lcms \
    --disable-docs --without-bzlib --without-magick-plus-plus \
    --without-heic --without-raw --without-perl --without-lzma --without-x --with-autotrace \
    --disable-largefile --without-modules --without-jbig --without-dps --without-fontconfig \
    --with-quantum-depth=16 --enable-hdri=yes --with-utilities \
    PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CXXFLAGS" 

  testExitCode "ImageMagick emconfigure" $?

fi


if [ "$SKIP_BUILD" -eq "0" ]; then

  FINAL_CFLAGS=$CFLAGS
  
  emcmake make install PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$FINAL_CFLAGS" CXXFLAGS="$FINAL_CFLAGS"

  testExitCode "ImageMagick make install" $?

fi