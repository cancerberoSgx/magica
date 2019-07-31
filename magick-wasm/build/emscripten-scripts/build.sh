#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

rm -rf $PREFIX

cd $CURRENT_DIR
source emscripten-scripts/build-zlib.sh
testExitCode "build-zlib" $?

cd $CURRENT_DIR
source emscripten-scripts/build-libjpeg.sh
testExitCode "build-libjpeg" $?

cd $CURRENT_DIR
source emscripten-scripts/build-libpng.sh
testExitCode "build-libpng" $?

cd $CURRENT_DIR
source emscripten-scripts/build-tiff.sh
testExitCode "build-tiff" $?

# # jpeg-turbo library supodsely implements libjpeg but it doesn't work on most images
# cd $CURRENT_DIR
# source emscripten-scripts/build-jpeg-turbo.sh
# testExitCode "build-jpeg-turbo" $?

# # This compiles buy I really want to understand the value of this library before include it
# cd $CURRENT_DIR
# source emscripten-scripts/build-openjpeg.sh
# testExitCode "build-openjpeg" $?

cd $CURRENT_DIR
source emscripten-scripts/build-freetype.sh
testExitCode "build-freetype" $?

cd $CURRENT_DIR
source emscripten-scripts/build-fftw.sh
testExitCode "build-fftw" $?

cd $CURRENT_DIR
source emscripten-scripts/build-webp.sh
testExitCode "build-webp" $?

cd $CURRENT_DIR
source emscripten-scripts/build-ImageMagick.sh
testExitCode "build-ImageMagick" $?

cd $CURRENT_DIR
source emscripten-scripts/link-magickWasm.sh
testExitCode "link-magickWasm" $?

cd $CURRENT_DIR
source emscripten-scripts/print-revisions.sh
testExitCode "print-revisions" $?
