#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
if [ ! -d "libjpeg" ]; then
  # rm -rf libjpeg
  git clone https://github.com/KnicKnic/libjpeg.git
  # # https://github.com/LuaDist/libjpeg.git
fi
cd libjpeg

autoreconf -fvi
emconfigure ./configure $AUTOCONF_COMMON --disable-shared --enable-static \
  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" CPPFLAGS="$CPPFLAGS" 
testExitCode "libjpeg configure" $?

emcmake make install CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"
testExitCode "libjpeg make install" $?
