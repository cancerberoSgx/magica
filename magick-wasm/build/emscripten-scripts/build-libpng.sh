#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "libpng" ]; then
  # rm -rf libpng
  git clone https://github.com/cancerberosgx/png.git libpng

  # git clone https://github.com/ImageMagick/png.git libpng
  # git clone https://github.com/KnicKnic/libpng.git
  # https://github.com/glennrp/libpng.git
fi

cd libpng

# export PNG_LIBS="$LDFLAGS"

libtoolize
autoreconf 
automake --add-missing

chmod a+x ./configure
emconfigure ./configure $AUTOCONF_COMMON --disable-shared --enable-static PKG_CONFIG_PATH="$PKG_CONFIG_PATH" \
  CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" CPPFLAGS="$CPPFLAGS" 
testExitCode "libpng configure" $?

emcmake make install  
testExitCode "libpng make install" $?
