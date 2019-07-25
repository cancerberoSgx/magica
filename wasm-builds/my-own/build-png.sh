#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf png
git clone https://github.com/ImageMagick/png.git
cd png

autoreconf -fiv
chmod a+x ./configure
export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX --disable-mips-msa --disable-arm-neon --disable-powerpc-vsx --disable-shared CFLAGS="$CFLAGS"
emcmake make install
