#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "openjpeg" ]; then
  git clone https://github.com/ImageMagick/openjpeg.git
else
  ( cd openjpeg ; make clean )
fi
  
cd openjpeg 

emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DBUILD_SHARED_LIBS=off -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$CFLAGS" || true
emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DBUILD_SHARED_LIBS=off -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$CFLAGS"
testExitCode "openjpeg configure" $?

emcmake make install
cp bin/libopenjp2.a $PREFIX/lib
testExitCode "openjpeg make install" $?
