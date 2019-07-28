# #!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf webp
git clone https://github.com/ImageMagick/webp.git
cd webp

rm -rf build
mkdir build
cd build
emconfigure cmake ../ -DCMAKE_INSTALL_PREFIX=$PREFIX -DENABLE_SHARED=off -DCMAKE_BUILD_TYPE=Release \
-DCMAKE_C_FLAGS="$CFLAGS" -DCMAKE_LIBRARY_PATH="$PREFIX/lib"  -DBUILD_PKGCONFIG_FILES=on \
-DCFLAGS="$CFLAGS" -DPKG_CONFIG_PATH:PATH="$PKG_CONFIG_PATH" -DLDFLAGS="$LDFLAGS" \
-DZLIB_INCLUDE_DIR:PATH="$PREFIX/include" -DZLIB_LIBRARY:FILEPATH="$PREFIX/lib/libz.a" \
-DPNG_PNG_INCLUDE_DIR:PATH="$PREFIX/include" -DPNG_LIBRARY:FILEPATH="$PREFIX/lib/libpng.a" \
-DTIFF_INCLUDE_DIR:PATH="$PREFIX/include" -DTIFF_LIBRARY:FILEPATH="$PREFIX/lib/libtiff.a"
-DJPEG_INCLUDE_DIR:PATH="$PREFIX/include" -DJPEG_LIBRARY:FILEPATH="$PREFIX/lib/libjpeg.a"
testExitCode "webp configure" $?

emcmake make install CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "webp make install" $?
