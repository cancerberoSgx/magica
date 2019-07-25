#!/bin/bash
source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf Magick.Native
git clone https://github.com/dlemstra/Magick.Native.git
cd Magick.Native

# #!/bin/bash
# set -e

# export PLATFORM="WASM"
# export CMAKE_COMMAND="emconfigure cmake"
# export CMAKE_OPTIONS="-D CMAKE_CXX_COMPILER=em++ -D CMAKE_C_COMPILER=emcc"
# getLibraryName() {
#     local quantum=$1
#     echo magick-$quantum
# }

echo "" > foo.cxx

# buildNative() {
# quantum="Q8"

# quantum_name=$quantum
# library_name=$(getLibraryName $quantum)
# hdri_enable=0
# depth=8
# if [ "$quantum" == "Q${QUANTUM_DEPTH}" ]; then
#     depth=${QUANTUM_DEPTH}
# elif [ "$quantum" == "Q${QUANTUM_DEPTH}-HDRI" ]; then
#     quantum_name="Q${QUANTUM_DEPTH}HDRI"
#     depth=${QUANTUM_DEPTH}
#     hdri_enable=1
# fi

mkdir $QUANTUM_NAME
cd $QUANTUM_NAME
emconfigure cmake -D DEPTH=$QUANTUM_DEPTH -D HDRI_ENABLE=$HDRI -D QUANTUM_NAME=$QUANTUM_NAME -D LIBRARY_NAME="magick-$QUANTUM_NAME" -D PLATFORM=WASM -D CMAKE_CXX_COMPILER=em++ -D CMAKE_C_COMPILER=emcc ..

make

cd ..
# }

# buildNative "Q8"

autoreconf -fiv
emconfigure ./configure --prefix="$PREFIX" \
  --without-threads --disable-shared --disable-openmp --enable-static  --without-lcms \
  --enable-delegate-build --without-magick-plus-plus --disable-docs --without-bzlib --without-webp \
  --without-heic --without-raw --without-perl --without-lzma --without-x --without-fontconfig  \
 --with-quantum-depth=$QUANTUM_DEPTH --enable-hdri=$HDRI \
   PKG_CONFIG_PATH="$PKG_CONFIG_PATH" CFLAGS="$CFLAGS" CXXFLAGS="$CFLAGS"
testExitCode "ImageMagick emconfigure" $?

emcmake make install
testExitCode "ImageMagick emcmake make install" $?

mkdir -p $PREFIX/wasm
echo "Module.arguments = ['-list', 'format']; " > $PREFIX/wasm/pre-js.js

LIBS="$PREFIX/lib/libMagickCore-7.Q${QUANTUM_DEPTH}${HDRI_LABEL}.a $PREFIX/lib/libMagickWand-7.Q${QUANTUM_DEPTH}${HDRI_LABEL}.a $PREFIX/lib/libpng16.a $PREFIX/lib/libturbojpeg.a $PREFIX/lib/libjpeg.a $PREFIX/lib/libtiffxx.a $PREFIX/lib/libfftw3.a $PREFIX/lib/libz.a $PREFIX/lib/libfreetype.a $PREFIX/lib/libtiff.a"

# LIBS=$PREFIX/lib/*.a

rm -rf $PREFIX/wasm/magick.js $PREFIX/wasm/magick.wasm $PREFIX/wasm/magick.html

./libtool --tag=CC --mode=link emcc $LDFLAGS $CFLAGS -s ERROR_ON_UNDEFINED_SYMBOLS=0 --pre-js "$PREFIX/wasm/pre-js.js" -o "$PREFIX/wasm/magick.html" utilities/magick.o $LIBS 
testExitCode "ImageMagick emcc link" $?
