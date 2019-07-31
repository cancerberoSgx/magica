#!/bin/bash
# This file is auto-generated from src/templates
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "libpng" ]; then
  git clone https://github.com/cancerberosgx/png.git libpng
else
  ( cd libpng ; make clean )
fi


cd libpng


export PNG_LIBS="$LDFLAGS"

libtoolize
autoreconf 
automake --add-missing

chmod a+x ./configure
export CHOST=emcc && emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "libpng configure" $?

emcmake make install  
testExitCode "libpng make install" $?
