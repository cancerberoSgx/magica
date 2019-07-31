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
  -DCMAKE_C_FLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" -DCMAKE_LIBRARY_PATH="$PREFIX/lib" -DWEBP_ENABLE_SIMD=off  -DWEBP_ENABLE_SHARED=off \
  -DZLIB_INCLUDE_DIR:PATH="$PREFIX/include" -DZLIB_LIBRARY:FILEPATH="$PREFIX/lib/libz.a" \
  -DPNG_PNG_INCLUDE_DIR:PATH="$PREFIX/include" -DPNG_LIBRARY:FILEPATH="$PREFIX/lib/libpng.a" \
  -DTIFF_INCLUDE_DIR:PATH="$PREFIX/include" -DTIFF_LIBRARY:FILEPATH="$PREFIX/lib/libtiff.a" \
  -DJPEG_INCLUDE_DIR:PATH="$PREFIX/include" -DJPEG_LIBRARY:FILEPATH="$PREFIX/lib/libjpeg.a"

testExitCode "webp configure" $?

emcmake make install #CFLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" LDFLAGS="$LDFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"

testExitCode "webp make install" $?


# -DWEBP_BUILD_ANIM_UTILS=off -DWEBP_BUILD_CWEBP=on -DWEBP_BUILD_DWEBP=on -DWEBP_BUILD_GIF2WEBP=off -DWEBP_BUILD_IMG2WEBP=off \
# -DWEBP_BUILD_VWEBP=off -DWEBP_BUILD_WEBPINFO=off -DWEBP_BUILD_EXTRAS=off  -DWEBP_BUILD_WEBPMUX=on \
# -DWEBP_ENABLE_STATIC=on -DWEBP_ENABLE_THREADING=off  -DWEBP_THREADING=off -DWEBP_ENABLE_GL=off -DENABLE_SDL=off -DENABLE_LIBWEBPEXTRAS=off \