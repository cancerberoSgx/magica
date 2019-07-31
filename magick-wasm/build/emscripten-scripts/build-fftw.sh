#!/bin/bash
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

emconfigure ./configure $AUTOCONF_COMMON CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH" \
  --disable-shared --disable-threads --enable-static --disable-doc --disable-fortran --disable-alloca  
  # --disable-shared --disable-doc --enable-static --disable-fortran --disable-alloca --disable-threads 
# 
testExitCode "fftw configure" $?

emcmake make install CFLAGS="$CFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "fftw make install" $?


