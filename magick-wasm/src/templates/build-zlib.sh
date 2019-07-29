#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf zlib
git clone https://github.com/ImageMagick/zlib.git
cd zlib

chmod a+x ./configure
export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX --static 
testExitCode "zlib configure" $?

emcmake make install CFLAGS="$CFLAGS"
testExitCode "zlib make install" $?
