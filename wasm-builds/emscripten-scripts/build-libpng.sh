#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf libpng
git clone https://github.com/KnicKnic/libpng.git
cd libpng

export PNG_LIBS="$LDFLAGS"

# emcmake make clean
libtoolize
autoreconf 
automake --add-missing
chmod a+x ./configure
emconfigure ./configure --prefix=$PREFIX --disable-shared # PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS"
testExitCode "libpng configure" $?
emcmake make # CFLAGS="$CFLAGS"
testExitCode "libpng make" $?
emcmake make install # CFLAGS="$CFLAGS"
testExitCode "libpng make install" $?



# cd /code/libpng
# libtoolize
# autoreconf
# automake --add-missing
# emconfigure ./configure --prefix=/code/prefix --disable-shared
# testExitCode "libpng configure" $?
# emcmake make 
# testExitCode "libpng make" $?
# emcmake make install
