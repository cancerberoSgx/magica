#!/bin/bash

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf jpeg-turbo
git clone https://github.com/ImageMagick/jpeg-turbo.git
cd jpeg-turbo

export LDFLAGS="$LDFLAGS -m64"
export CFLAGS="$CFLAGS -m64"
emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DENABLE_SHARED=off \
  -DWITH_SIMD=0 -DCMAKE_BUILD_TYPE=Release -DWITH_JPEG7=1 -DWITH_JPEG8=1 -DWITH_MEM_SRCDST=0 -DCMAKE_C_FLAGS="$CFLAGS"
testExitCode "jpeg-turbo emconfigure" $?

emcmake make && emcmake make install
testExitCode "jpeg-turbo make install" $?
