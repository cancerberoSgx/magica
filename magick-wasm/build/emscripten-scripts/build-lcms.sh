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
emconfigure ./configure --prefix=$PREFIX --disable-shared  CFLAGS="$FLAGS"
testExitCode "lcms configure" $?

emcmake make install  
testExitCode "lcms make install" $?
