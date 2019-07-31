#!/bin/bash

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
if [ ! -d "tiff" ]; then
  # rm -rf tiff 
  git clone https://github.com/ImageMagick/tiff.git
fi

cd tiff

autoreconf -fiv
emconfigure ./configure $AUTOCONF_COMMON CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH" \
  --disable-shared --enable-static 
testExitCode "libtiff configure" $?

emcmake make install CFLAGS="$CFLAGS" 
testExitCode "libtiff make install" $?


