#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "tiff" ]; then
  git clone https://github.com/ImageMagick/tiff.git
else
  ( cd tiff ; make clean )
fi

cd tiff

autoreconf -fiv

export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX CFLAGS="$FLAGS" \
  --disable-shared PKG_CONFIG_PATH="$PKG_CONFIG_PATH"

testExitCode "libtiff configure" $?

emcmake make install CFLAGS="$CFLAGS" 

testExitCode "libtiff make install" $?


