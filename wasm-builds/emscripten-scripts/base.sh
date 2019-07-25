#!/bin/bash

export PREFIX="$PWD/emscripten_prefix"
export CPPFLAGS="-I$PREFIX/include -I$PREFIX/include/freetype2"
export LDFLAGS="-L$PREFIX/lib"
export CFLAGS="$CPPFLAGS -s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1"
export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig"
export QUANTUM_DEPTH="16"

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