#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "libde265" ]; then
  git clone https://github.com/ImageMagick/libde265.git  
fi

cd libde265

export CFLAGS=$(echo "$CFLAGS" | sed "s/-fno-rtti -fno-exceptions//") # error: cannot use dynamic_cast with -fno-rtti
export CXXFLAGS="$CFLAGS"

export SSE_OPTIONS="--disable-sse"

autoreconf -fiv

chmod +x ./configure  

emconfigure ./configure  --without-threads   \ 
  --prefix=$PREFIX --disable-shared --disable-dec265  $SSE_OPTIONS  \
  CFLAGS="$CFLAGS"  CXXFLAGS="$CFLAGS" 
# PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "libde265 configure" $?

emcmake make install
testExitCode "libde265 make install" $? 