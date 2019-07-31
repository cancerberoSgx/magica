#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "fftw" ]; then
  rm -rf fft*
  wget http://www.fftw.org/fftw-3.3.8.tar.gz
  tar xvfz fftw-3.3.8.tar.gz
  rm *.tar.gz
  mv fftw* fftw
fi

cd fftw

chmod a+x ./configure

export CHOST=emcc && emconfigure ./configure CC=emcc --prefix=$PREFIX CFLAGS="$FLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH" \
  --disable-shared --disable-doc --enable-static --disable-fortran --disable-alloca --disable-threads 
testExitCode "fftw configure" $?

emcmake make install CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "fftw make" $?


