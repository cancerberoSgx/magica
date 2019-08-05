#!/bin/bash

# This file is auto-generated from src/templates

export PREFIX="$PWD/emscripten_prefix"

export CPPFLAGS="-I$PREFIX/include -I$PREFIX/include/freetype2 -I$PREFIX/include/openjpeg-2.3 -I$PREFIX/include/libraw -I$PREFIX/include/libde265"

export EMCC_RELEASE_TYPE_FLAGS_DEBUG="-O0 --llvm-lto 0 --llvm-opts 0 --llvm-lto 0 -s ASSERTIONS=1 -s SAFE_HEAP=1 -s ALIASING_FUNCTION_POINTERS=0 -s DISABLE_EXCEPTION_CATCHING=0 -s NODEJS_CATCH_EXIT=1 -s EXCEPTION_DEBUG=1 -s ABORTING_MALLOC=0 -g -v"

# export EMCC_DEBUG=1

export EMCC_RELEASE_TYPE_FLAGS_PRODUCTION="-O3 --llvm-lto 3 --llvm-opts 3 -fno-rtti -fno-exceptions -fPIC -s DISABLE_EXCEPTION_CATCHING=1 -s NODEJS_CATCH_EXIT=0 -s ASSERTIONS=0 -s AGGRESSIVE_VARIABLE_ELIMINATION=1"

export EMCC_RELEASE_TYPE_FLAGS=$EMCC_RELEASE_TYPE_FLAGS_PRODUCTION

export LDFLAGS="-L$PREFIX/lib"

export PKG_CONFIG_PATH="$PREFIX/lib/pkgconfig"

export COMMON_CFLAGS="$CPPFLAGS -s BINARYEN_TRAP_MODE=clamp -s ALLOW_MEMORY_GROWTH=1 -Wno-almost-asm -s ERROR_ON_UNDEFINED_SYMBOLS=1 -Werror=implicit-function-declaration"

export CFLAGS="$COMMON_CFLAGS $EMCC_RELEASE_TYPE_FLAGS"

export CXXFLAGS="$CFLAGS"

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