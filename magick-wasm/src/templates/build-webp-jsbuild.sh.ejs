# #!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "webp" ]; then
  git clone https://github.com/ImageMagick/webp.git
else
  ( cd webp/build && emcmake make uninstall )
  ( cd webp/build && emcmake make clean )
fi

mkdir -p webp/build
cd webp/build

emconfigure cmake ../ -DCMAKE_INSTALL_PREFIX=$PREFIX -DCMAKE_BUILD_TYPE=Release -DWEBP_BUILD_WEBP_JS=on \
  -DCMAKE_C_FLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" -DCMAKE_LIBRARY_PATH="$PREFIX/lib" 
 
testExitCode "webp configure" $?

emcmake make install CFLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" LDFLAGS="$LDFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"

testExitCode "webp make install" $?