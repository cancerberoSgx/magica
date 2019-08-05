#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "freetype" ]; then
  git clone https://github.com/ImageMagick/freetype.git
else
  ( cd freetype ; make clean )
fi
  
cd freetype

chmod a+x ./configure

export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX --disable-shared \
  --enable-static --disable-mmap --without-bzip2  --without-old-mac-fonts --without-fsspec \
  --without-ats --disable-largefile --disable-freetype-config --disable-biarch-config \
  CFLAGS="$CPPFLAGS" 

testExitCode "freetype configure" $?

emcmake make install

testExitCode "freetype make install" $?
