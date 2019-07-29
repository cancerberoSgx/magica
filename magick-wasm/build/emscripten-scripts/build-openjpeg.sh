#!/bin/bash

# see http://www.openjpeg.org/
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf openjpeg
git clone https://github.com/ImageMagick/openjpeg.git
cd openjpeg 

## Heads up ! I'm new to cmake and it's very strange - but seems that execute it twice does the trick.

# make clean
export CHOST=emcc && emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DBUILD_SHARED_LIBS=off -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$CFLAGS" -DCMAKE_LIBRARY_PATH="$PREFIX/lib"  -DBUILD_PKGCONFIG_FILES=on -DCFLAGS="$CFLAGS" -DPKG_CONFIG_PATH="$PKG_CONFIG_PATH" -DLDFLAGS="$LDFLAGS" -DZLIB_INCLUDE_DIR:PATH="$PREFIX/include" -DZLIB_LIBRARY:FILEPATH="$PREFIX/lib/libz.a" -DPNG_PNG_INCLUDE_DIR:PATH="$PREFIX/include" -DPNG_LIBRARY:FILEPATH="$PREFIX/lib/libpng.a" -DTIFF_INCLUDE_DIR:PATH="$PREFIX/include" -DTIFF_LIBRARY:FILEPATH="$PREFIX/lib/libtiff.a" 

export CHOST=emcc && emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DBUILD_SHARED_LIBS=off -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$CFLAGS" -DCMAKE_LIBRARY_PATH="$PREFIX/lib"  -DBUILD_PKGCONFIG_FILES=on -DCFLAGS="$CFLAGS" -DPKG_CONFIG_PATH="$PKG_CONFIG_PATH" -DLDFLAGS="$LDFLAGS" -DZLIB_INCLUDE_DIR:PATH="$PREFIX/include" -DZLIB_LIBRARY:FILEPATH="$PREFIX/lib/libz.a" -DPNG_PNG_INCLUDE_DIR:PATH="$PREFIX/include" -DPNG_LIBRARY:FILEPATH="$PREFIX/lib/libpng.a" -DTIFF_INCLUDE_DIR:PATH="$PREFIX/include" -DTIFF_LIBRARY:FILEPATH="$PREFIX/lib/libtiff.a" 

testExitCode "openjpeg configure" $?

emcmake make install CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"
# cp bin/libopenjp2.a $PREFIX/lib
testExitCode "openjpeg make install" $?


# $CMAKE_COMMAND . -DCMAKE_INSTALL_PREFIX=/usr/local -DBUILD_SHARED_LIBS=off -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$FLAGS"
# $MAKE install
# cp bin/libopenjp2.a /usr/local/lib

# export CHOST=emcc && emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DENABLE_SHARED=off \
#   -DWITH_SIMD=0 -DCMAKE_BUILD_TYPE=Release -DWITH_JPEG7=1 -DWITH_JPEG8=1 -DCMAKE_C_FLAGS="$CFLAGS"
# emcmake make install CFLAGS="$CFLAGS"
