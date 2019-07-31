#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "freetype" ]; then
  # rm -rf freetype
  git clone https://github.com/ImageMagick/freetype.git
fi

cd freetype

chmod a+x ./configure
emconfigure ./configure $AUTOCONF_COMMON --disable-shared --enable-static \
  --disable-mmap --without-bzip2  --without-old-mac-fonts --without-fsspec \
  --without-ats --disable-largefile --disable-freetype-config --disable-biarch-config \
  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS"

testExitCode "freetype configure" $?

emcmake make install
testExitCode "freetype make install" $?
