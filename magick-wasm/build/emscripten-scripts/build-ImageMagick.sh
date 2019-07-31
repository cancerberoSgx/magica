#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
if [ ! -d "ImageMagick" ]; then
  # rm -rf ImageMagick
  git clone https://github.com/ImageMagick/ImageMagick.git
  # git clone https://github.com/KnicKnic/ImageMagick.git
fi

cd ImageMagick

autoconf

emconfigure ./configure $AUTOCONF_COMMON \
  --without-threads --disable-shared --enable-static --disable-openmp --without-lcms \
  --disable-docs --without-bzlib --without-magick-plus-plus \
  --without-heic --without-raw --without-perl --without-lzma --without-x \
  --disable-largefile --without-modules --without-jbig --without-dps --without-fontconfig \
  --with-quantum-depth=$QUANTUM_DEPTH --enable-hdri=$HDRI --with-utilities \
   PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS"
# --enable-delegate-build --enable-zero-configuration --disable-installed  \

testExitCode "ImageMagick emconfigure" $?

emcmake make install PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"

testExitCode "ImageMagick make install" $?
