#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf libjpeg
git clone https://github.com/KnicKnic/libjpeg.git
# https://github.com/LuaDist/libjpeg.git
cd libjpeg

autoreconf -fvi
emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static   PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CC="emcc" CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" CPPFLAGS="$CFLAGS" 
testExitCode "libjpeg configure" $?
emcmake make install  CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"
testExitCode "libjpeg make install" $?

# libtoolize
# autoreconf 
# automake --add-missing
# chmod a+x ./configure
# emconfigure ./configure --prefix=$PREFIX --disable-shared PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"
# testExitCode "libpng configure" $?
# # emcmake make  CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"
# # testExitCode "libpng make" $?
# emcmake make install  CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS"
# testExitCode "libpng make install" $?



# cd /code/libpng
# libtoolize
# autoreconf
# automake --add-missing
# emconfigure ./configure --prefix=/code/prefix --disable-shared
# testExitCode "libpng configure" $?
# emcmake make 
# testExitCode "libpng make" $?
# emcmake make install
