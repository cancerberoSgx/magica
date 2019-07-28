#!/bin/bash

export PREFIX="$PWD/emscripten_prefix"
export CPPFLAGS="-I$PREFIX/include -I$PREFIX/include/freetype2 -I$PREFIX/include/openjpeg-2.3 -UWIN32 -UWIN64 -UMAGICKCORE_WINDOWS_SUPPORT"

export EMCC_FLAGS_DEBUG="-s ASSERTIONS=2 -s SAFE_HEAP=1 -s DEMANGLE_SUPPORT=1 -s ALIASING_FUNCTION_POINTERS=0 -s DISABLE_EXCEPTION_CATCHING=0 -s NODEJS_CATCH_EXIT=1 --js-opts 0 -g4 "
# export EMCC_DEBUG=1
# export EMCC_FLAGS=$EMCC_FLAGS_DEBUG
# export EMCC_FLAGS_PRODUCTION="-O3"
export EMCC_FLAGS=$EMCC_FLAGS_DEBUG

export LDFLAGS="-L$PREFIX/lib"
export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig"
export CFLAGS="$CPPFLAGS -s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -Wno-error=implicit-function-declaration $EMCC_FLAGS"

export QUANTUM_DEPTH=8 # only works on IM 7
export HDRI=no # only works on IM 7

# export QUANTUM_NAME="Q16-HDRI"
# export HDRI_NUMBER=1
# export HDRI_LABEL="HDRI"

export CURRENT_DIR=$PWD

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

export -f testExitCode