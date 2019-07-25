#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf freetype
git clone https://github.com/ImageMagick/freetype.git
cd freetype

chmod a+x ./configure
export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX --disable-shared \
  --without-bzip2 CFLAGS="$CPPFLAGS"
emcmake make install 
