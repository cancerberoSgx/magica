#!/bin/bash

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf jpeg-turbo
git clone https://github.com/ImageMagick/jpeg-turbo.git
cd jpeg-turbo

export CHOST=emcc && emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DENABLE_SHARED=off \
  -DWITH_SIMD=0 -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$CFLAGS"
emcmake make install CFLAGS="$CFLAGS"
