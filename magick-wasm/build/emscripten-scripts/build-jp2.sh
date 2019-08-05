# #!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "jp2" ]; then
  git clone https://github.com/ImageMagick/jp2.git
fi

rm -rf jp2/build
mkdir -p jp2/build
cd jp2/build

emconfigure cmake ../ -DCMAKE_INSTALL_PREFIX=$PREFIX -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_C_FLAGS="$CFLAGS" -DCMAKE_LIBRARY_PATH="$PREFIX/lib" -DJAS_ENABLE_SHARED=false -DJAS_ENABLE_LIBJPEG=true -DJAS_ENABLE_DOC=false -DJAS_ENABLE_PROGRAMS=false

testExitCode "jp2 configure" $?

emcmake make install #CFLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" LDFLAGS="$LDFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"

testExitCode "jp2 make install" $?
