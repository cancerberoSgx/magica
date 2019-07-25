
PREFIX="$PWD/emscripten_prefix"
PORTS=""
CPPFLAGS="-I$PREFIX/include"
LDFLAGS="-L$PREFIX/lib -L$HOME/.emscripten_cache/asmjs"
MAKE_FLAGS="-s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0"
OPTIMIZATION_DEBUG=""
CFLAGS="$CPPFLAGS $MAKE_FLAGS"
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

mkdir -p $PREFIX/src
cd $PREFIX/src
git clone https://github.com/ImageMagick/tiff.git
cd tiff
# git fetch -a
# git checkout tags/Release-v4-0-9 -b wasm-im
autoreconf -fiv
emconfigure ./configure --prefix=$PREFIX CFLAGS="$FLAGS" --disable-shared
testExitCode "libtiff configure" $?
emcmake make $MAKE_FLAGS CFLAGS="$CFLAGS" CXXFLAGS="$CXXFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "libtiff make" $?
emcmake make install


