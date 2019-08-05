#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "lcms" ]; then
  git clone https://github.com/ImageMagick/lcms.git
else
  ( cd lcms ; make clean )
fi

cd lcms

autoreconf -fiv

chmod a+x ./configure
emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static --without-threads \
  CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"

testExitCode "lcms configure" $?

emcmake make install  

testExitCode "lcms make install" $?
