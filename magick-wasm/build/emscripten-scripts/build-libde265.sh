#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
if [ ! -d "libde265" ]; then
  git clone https://github.com/ImageMagick/libde265.git  
fi


cd libde265

export CFLAGS=$(echo "$CFLAGS" | sed "s/-fno-rtti -fno-exceptions//") # configparam.cc:391:7: error: cannot use dynamic_cast with -fno-rtti
export CXXFLAGS="$CFLAGS"

# autoreconf -fiv
chmod +x ./configure
emconfigure ./configure --prefix=$PREFIX --disable-shared --disable-dec265  --disable-sherlock265   --disable-sse   --disable-arm \
  CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS" 
testExitCode "libde265 configure" $?
emcmake   make install
testExitCode "libde265 make install" $?