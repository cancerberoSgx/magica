#!/bin/bash

export PREFIX="$PWD/emscripten_prefix"
export CPPFLAGS="-I$PREFIX/include -I$PREFIX/include/freetype2"
export LDFLAGS="-L$PREFIX/lib"
export CFLAGS="$CPPFLAGS -s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 $EMCC_OPTIMIZATION_DEBUG"
export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig"

# export EMCC_OPTIMIZATION_DEBUG="-O3"
export EMCC_OPTIMIZATION_DEBUG="-s ASSERTIONS=2 -s SAFE_HEAP=1 -s DEMANGLE_SUPPORT=1 --js-opts 0 -g4 "
export EMCC_DEBUG=1
 
export QUANTUM_DEPTH="16"
# export QUANTUM_NAME="Q16-HDRI"
export HDRI=yes
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