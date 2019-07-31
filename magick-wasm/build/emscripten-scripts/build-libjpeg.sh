#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "libjpeg" ]; then
  git clone https://github.com/KnicKnic/libjpeg.git
fi

cd libjpeg

autoreconf -fvi

emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static  \
  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CC="emcc" CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" CPPFLAGS="$CFLAGS" 

testExitCode "libjpeg configure" $?

emcmake make install  CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"

testExitCode "libjpeg make install" $?