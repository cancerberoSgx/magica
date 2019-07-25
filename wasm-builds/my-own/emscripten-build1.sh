# Run me from ImageMagick root folder like `sh emscripten-scripts/emscripten-build1.sh`

export PREFIX="$PWD/emscripten_prefix"
PORTS="-s USE_ZLIB=1 -s USE_LIBPNG=1 -s USE_FREETYPE=1"
# export EM_OPTIMIZATIONS_DEBUG="-O3"
export CPPFLAGS="-I$PREFIX/include -I$HOME/.emscripten_ports/freetype/FreeType-version_1/include -I$HOME/.emscripten_ports/.emscripten_ports/zlib/zlib-version_1 -I$HOME/.emscripten_ports/libpng/libpng-version_1 -s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 $PORTS -O3 -Werror=implicit-function-declaration  -UMAGICKCORE_WINDOWS_SUPPORT -UMAGICKCORE_HAVE_VSNPRINTF_L -UMAGICKCORE_HAVE_NEWLOCALE -DMAGICKCORE_HAVE_USLEEP -UMAGICKCORE_HAVE_GETEXECNAME -UMAGICKCORE_HAVE__NSGETEXECUTABLEPATH"
export LDFLAGS="-L$PREFIX/lib -L$HOME/.emscripten_cache/asmjs"
export CFLAGS="$CPPFLAGS"
export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig"
# export PNG_LIBS="$LDFLAGS"
# export JPEG_LIBS="$LDFLAGS"
export QUANTUM_DEPTH="16"
export CXXFLAGS="$CFLAGS"

testExitCode () {
  name=$1
  exitCode=$2
  echo "
******** $name exit code: $exitCode *******
  "
  if [ "$exitCode" -ne "0" ]; then
    exit 1
  fi
}

rm -rf $PREFIX
mkdir -p $PREFIX
mkdir -p $PREFIX/wasm

sh emscripten-scripts/build-jpeg.sh
sh emscripten-scripts/build-tiff.sh

emcc $PORTS --cflags
testExitCode "emcc PORTS" $?

# emconfigure autoconf 
# emconfigure autoreconf -fiv
autoconf
emconfigure ./configure \
  --prefix=$PREFIX --disable-shared --disable-docs \
  --without-threads --without-magick-plus-plus  --without-perl --without-x \
  --disable-largefile --disable-openmp --without-bzlib --without-dps \
  --without-jbig --without-openjp2 --without-lcms --without-wmf \
  --without-xml --without-fftw --without-flif --without-fpx --without-djvu \
  --without-raqm --without-gslib \
  --without-gvc --without-heic --without-lqr --without-openexr --without-pango \
  --without-raw --without-rsvg --without-webp \
  PKG_CONFIG_PATH="$PKG_CONFIG_PATH"#  CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS" 
testExitCode "emconfigure" $?

emcmake make   CFLAGS="$CFLAGS"  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" LDFLAGS="$LDFLAGS"  CXXFLAGS="$CFLAGS"
testExitCode "emcmake make" $?

emcmake make install  PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"  
testExitCode "emcmake make install " $?

echo "Module.arguments = ['-list', 'format']; " > $PREFIX/wasm/pre-js.js #a small snippet to make sure the generated html works

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS --pre-js "$PREFIX/wasm/pre-js.js" -o $PREFIX/wasm/magick.html utilities/magick.o $PREFIX/lib/libMagickCore-7.Q${QUANTUM_DEPTH}HDRI.a $PREFIX/lib/libMagickWand-7.Q${QUANTUM_DEPTH}HDRI.a $PREFIX/lib/libjpeg.a $PREFIX/lib/libtiff.a $PREFIX/lib/libtiffxx.a $PREFIX/lib/libturbojpeg.a $HOME/.emscripten_cache/asmjs/libz.a $HOME/.emscripten_cache/asmjs/libfreetype.a $HOME/.emscripten_cache/asmjs/libpng.bc 

testExitCode "emcc link" $?


