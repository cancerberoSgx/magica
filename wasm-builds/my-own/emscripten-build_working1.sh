# Run me from ImageMagick root folder like `sh emscripten-scripts/emscripten-build1.sh`

export PREFIX="$PWD/emscripten_prefix"
export PORTS="-s USE_ZLIB=1 -s USE_LIBPNG=1 -s USE_LIBJPEG=1 -s USE_FREETYPE=1"
export CPPFLAGS="-I$PREFIX/include -I$HOME/.emscripten_ports/freetype/FreeType-version_1/include"
export LDFLAGS="-L$PREFIX/lib -L$HOME/.emscripten_cache/asmjs"
export MAKE_FLAGS="-s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 $PORTS"
export CFLAGS="$CPPFLAGS $MAKE_FLAGS"
export CXXFLAGS="$CFLAGS"

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

emcc $PORTS --cflags
testExitCode "emcc PORTS" $?

emconfigure ./configure \
  --prefix=$PREFIX --disable-shared --disable-docs --without-rsvg --without-raw  --without-lzma --without-zstd \
  --without-threads --without-magick-plus-plus --without-perl --without-x --with-quantum-depth=8 \
  --disable-largefile --disable-openmp --without-bzlib --without-dps --without-webp --without-ltdl \
  --without-jbig --without-openjp2 --without-lcms --without-wmf --without-openexr --without-pango \
  --without-xml --without-fftw --without-flif --without-fpx --without-djvu \
  --without-raqm --without-gslib --without-gvc --without-heic --without-lqr 
  CFLAGS="$CFLAGS" LDFLAGS="$LDFLAGS" CPPFLAGS="$CPPFLAGS"
testExitCode "emconfigure" $?

emcmake make
testExitCode "emcmake make" $?

emcmake make install
testExitCode "emcmake make install " $?

echo "Module.arguments = ['-version']; " > $PREFIX/wasm/pre-js.js #a small snippet to make sure the generated html works
emcc --pre-js "$PREFIX/wasm/pre-js.js" $LDFLAGS $CFLAGS -o $PREFIX/wasm/magick.html utilities/magick.o $PREFIX/lib/libMagickCore-7.Q8HDRI.a $PREFIX/lib/libMagickWand-7.Q8HDRI.a
testExitCode "emcc link" $?
