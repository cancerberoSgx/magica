# Run me from ImageMagick root folder like `sh emscripten-scripts/emscripten-build1.sh`

PREFIX="$PWD/emscripten_prefix"
PORTS="-s USE_ZLIB=1 -s USE_LIBPNG=1 -s USE_LIBJPEG=1 -s USE_FREETYPE=1"
export CPPFLAGS="-I$PREFIX/include -I$HOME/.emscripten_ports/freetype/FreeType-version_1/include -I$HOME/.emscripten_ports/.emscripten_ports/zlib/zlib-version_1 -I$HOME/.emscripten_ports/libpng/libpng-version_1 -I$HOME/.emscripten_ports/.emscripten_ports/libjpeg/jpeg-9c"
export LDFLAGS="-L$PREFIX/lib -L$HOME/.emscripten_cache/asmjs"
export MAKE_FLAGS="-s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 $PORTS"
export OPTIMIZATION_DEBUG=""#"-g -s ASSERTIONS=1"
export CFLAGS="$CPPFLAGS $MAKE_FLAGS"
# CXXFLAGS="$CFLAGS"
export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig"
export PNG_LIBS="$LDFLAGS"
# /Users/sebastiangurin/.emscripten_cache/asmjs/libfreetype.a
testExitCode ()
{
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

autoconf 

emcc $PORTS --cflags
testExitCode "emcc PORTS" $?

emconfigure ./configure \
  --prefix=$PREFIX --disable-shared --disable-docs --without-rsvg --without-raw  \
  --without-threads --without-magick-plus-plus --without-perl --without-x --with-quantum-depth=8 \
  --disable-largefile --disable-openmp --without-bzlib --without-dps --without-webp --without-ltdl \
  --without-jbig --without-openjp2 --without-lcms --without-wmf --without-openexr --without-pango \
  --without-xml --without-fftw --without-flif --without-fpx --without-djvu \
  --without-raqm --without-gslib --without-gvc --without-heic --without-lqr --with-zlib \
  PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "emconfigure" $?

emcmake make CFLAGS="$CFLAGS"
testExitCode "emcmake make" $?

emcmake make install
testExitCode "emcmake make install " $?

echo "Module.arguments = ['-version']; " > $PREFIX/wasm/pre-js.js #a small snippet to make sure the generated html works

./libtool --silent --tag=CC --mode=link emcc $LDFLAGS $CFLAGS --pre-js "$PREFIX/wasm/pre-js.js" -o $PREFIX/wasm/magick.html utilities/magick.o $PREFIX/lib/libMagickCore-7.Q8HDRI.a $PREFIX/lib/libMagickWand-7.Q8HDRI.a


# emcc --pre-js "$PREFIX/wasm/pre-js.js" $LDFLAGS $CFLAGS -o $PREFIX/wasm/magick.html utilities/magick.o $PREFIX/lib/libMagickCore-7.Q8HDRI.a $PREFIX/lib/libMagickWand-7.Q8HDRI.a
testExitCode "emcc link" $?
