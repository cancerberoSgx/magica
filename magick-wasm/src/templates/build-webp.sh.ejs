# #!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "webp" ]; then
  git clone https://github.com/ImageMagick/webp.git
else  
  ( mkdir -p webp/build; cd webp/build ; emcmake make clean )
fi

rm -rf webp/build
mkdir -p webp/build
cd webp/build

emconfigure cmake ../ -DCMAKE_INSTALL_PREFIX=$PREFIX -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_C_FLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" -DCMAKE_LIBRARY_PATH="$PREFIX/lib" -DWEBP_ENABLE_SIMD=off  -DWEBP_ENABLE_SHARED=off 

testExitCode "webp configure" $?

emcmake make install

testExitCode "webp make install" $?
