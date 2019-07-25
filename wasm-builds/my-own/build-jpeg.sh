
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
git clone https://github.com/libjpeg-turbo/libjpeg-turbo.git
cd libjpeg-turbo
git fetch -a
git checkout tags/2.0.2 -b wasm-im
emconfigure cmake . -DCMAKE_INSTALL_PREFIX=$PREFIX -DENABLE_SHARED=off -DWITH_SIMD=0 -DCMAKE_BUILD_TYPE=Release -DCMAKE_C_FLAGS="$CFLAGS"
emcmake make install

# https://gitlab.com/libtiff/libtiff