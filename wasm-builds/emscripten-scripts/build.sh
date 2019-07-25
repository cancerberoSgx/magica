source emscripten-scripts/base.sh

rm -rf $PREFIX

sh emscripten-scripts/build-zlib.sh
testExitCode "build-zlib" $?

sh emscripten-scripts/build-png.sh
testExitCode "build-png" $?

sh emscripten-scripts/build-jpeg-turbo.sh
testExitCode "build-jpeg-turbo" $?

sh emscripten-scripts/build-tiff.sh
testExitCode "build-tiff" $?

sh emscripten-scripts/build-freetype.sh
testExitCode "build-freetype" $?

sh emscripten-scripts/build-fftw.sh
testExitCode "build-fftw" $?

sh emscripten-scripts/build-ImageMagick.sh
testExitCode "build-ImageMagick" $?
