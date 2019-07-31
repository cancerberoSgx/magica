# #!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
if [ ! -d "webp" ]; then
  # rm -rf webp
  git clone https://github.com/ImageMagick/webp.git
fi
cd webp

# if [ ! -d "build" ]; then
rm -rf build
  mkdir build
  cd build

  # -DENABLE_SIMD=off -DWEBP_ENABLE_SIMD=off\

  emconfigure cmake ../ -DCMAKE_INSTALL_PREFIX=$PREFIX -DENABLE_SHARED=off -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_C_FLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" -DCMAKE_LIBRARY_PATH="$PREFIX/lib"  -DBUILD_PKGCONFIG_FILES=on \
  -DENABLE_STATIC=on -DENABLE_THREADING=off -DENABLE_GL=off -DENABLE_SDL=off -DENABLE_LIBWEBPEXTRAS=off \
  -DCFLAGS="$CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0" -DPKG_CONFIG_PATH:PATH="$PKG_CONFIG_PATH" -DLDFLAGS="$LDFLAGS" \
  -DZLIB_INCLUDE_DIR:PATH="$PREFIX/include" -DZLIB_LIBRARY:FILEPATH="$PREFIX/lib/libz.a" \
  -DPNG_PNG_INCLUDE_DIR:PATH="$PREFIX/include" -DPNG_LIBRARY:FILEPATH="$PREFIX/lib/libpng.a" \
  -DTIFF_INCLUDE_DIR:PATH="$PREFIX/include" -DTIFF_LIBRARY:FILEPATH="$PREFIX/lib/libtiff.a" \
  -DJPEG_INCLUDE_DIR:PATH="$PREFIX/include" -DJPEG_LIBRARY:FILEPATH="$PREFIX/lib/libjpeg.a"
  testExitCode "webp configure" $?

  # cd ..

# fi

# cd build


emcmake make install CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "webp make install" $?

