#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf fftw-3.3.8
wget http://www.fftw.org/fftw-3.3.8.tar.gz
tar xvfz fftw-3.3.8.tar.gz
cd fftw-3.3.8

export CHOST=emcc && emconfigure ./configure CC=emcc --prefix=$PREFIX CFLAGS="$FLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH" \
  --disable-shared --disable-doc --enable-static --disable-fortran --disable-alloca --disable-threads 
testExitCode "fftw configure" $?

emcmake make install CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "fftw make" $?


