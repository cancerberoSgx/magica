source emscripten-scripts/base.sh

rm -rf $PREFIX

sh emscripten-scripts/build-zlib.sh
sh emscripten-scripts/build-png.sh
sh emscripten-scripts/build-jpeg-turbo.sh
sh emscripten-scripts/build-tiff.sh
sh emscripten-scripts/build-freetype.sh
sh emscripten-scripts/build-fftw.sh
