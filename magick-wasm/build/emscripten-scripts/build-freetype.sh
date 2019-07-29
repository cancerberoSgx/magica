#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf freetype
git clone https://github.com/ImageMagick/freetype.git
cd freetype


chmod a+x ./configure

export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX --disable-shared \
  --enable-static --disable-mmap --without-bzip2  --without-old-mac-fonts --without-fsspec \
  --without-ats --disable-largefile --disable-freetype-config --disable-biarch-config \
  CFLAGS="$CPPFLAGS" 
testExitCode "freetype configure" $?

emcmake make install
testExitCode "freetype make install" $?
