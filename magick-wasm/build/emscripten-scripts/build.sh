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

# cd $CURRENT_DIR
# source emscripten-scripts/build-jpeg-turbo.sh
# testExitCode "build-jpeg-turbo" $?

cd $CURRENT_DIR
source emscripten-scripts/build-libpng.sh
testExitCode "build-libpng" $?

# cd $CURRENT_DIR
# source emscripten-scripts/build-autotrace.sh
# testExitCode "build-autotrace" $?

cd $CURRENT_DIR
source emscripten-scripts/build-lcms.sh
testExitCode "build-lcms" $?

# cd $CURRENT_DIR
# source emscripten-scripts/build-openexr.sh
# testExitCode "build-openexr" $?

# cd $CURRENT_DIR
# source emscripten-scripts/build-liblqr.sh
# testExitCode "build-liblqr" $?

cd $CURRENT_DIR
source emscripten-scripts/build-tiff.sh
testExitCode "build-tiff" $?

cd $CURRENT_DIR
source emscripten-scripts/build-openjpeg.sh
testExitCode "build-openjpeg" $?

cd $CURRENT_DIR
source emscripten-scripts/build-fftw.sh
testExitCode "build-fftw" $?

cd $CURRENT_DIR
source emscripten-scripts/build-freetype.sh
testExitCode "build-freetype" $?

cd $CURRENT_DIR
source emscripten-scripts/build-webp.sh
testExitCode "build-webp" $?

# cd $CURRENT_DIR
# source emscripten-scripts/build-jp2.sh
# testExitCode "build-jp2" $?

# cd $CURRENT_DIR
# source emscripten-scripts/build-libde265.sh
# testExitCode "build-libde265" $?

# cd $CURRENT_DIR
# source emscripten-scripts/build-libheif.sh
# testExitCode "build-libheif" $?

cd $CURRENT_DIR
source emscripten-scripts/build-raw.sh
testExitCode "build-raw" $?

cd $CURRENT_DIR
source emscripten-scripts/build-ImageMagick.sh
testExitCode "build-ImageMagick" $?

cd $CURRENT_DIR
source emscripten-scripts/link-magickWasm.sh
testExitCode "link-magickWasm" $?

cd $CURRENT_DIR
source emscripten-scripts/print-revisions.sh
testExitCode "print-revisions" $?
