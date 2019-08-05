#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "openexr" ]; then
  git clone https://github.com/ImageMagick/exr.git openexr
fi

export CFLAGS=$(echo "$CFLAGS" | sed "s/-fno-rtti -fno-exceptions//")
export CXXFLAGS="$CFLAGS"

cd openexr/ilmbase
# make clean 
chmod a+x ./configure ./bootstrap
emconfigure ./bootstrap
emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static  --disable-threading  \
  CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "openexr/ilmbase configure" $?
emcmake   make install
testExitCode "openexr/ilmbase make install" $?

cd ../openexr
# make clean 
chmod a+x ./configure
emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static  --disable-threading \
  CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "openexr/openexr configure" $?

emcmake make install  
testExitCode "openexr/openexr make install" $?
