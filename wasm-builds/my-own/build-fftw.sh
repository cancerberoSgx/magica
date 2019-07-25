source emscripten-scripts/base.sh

mkdir -p $PREFIX/src
cd $PREFIX/src
rm -rf fftw-3.3.8
wget http://www.fftw.org/fftw-3.3.8.tar.gz
tar xvfz fftw-3.3.8.tar.gz
cd fftw-3.3.8

export CHOST=emcc && emconfigure ./configure CC=emcc --prefix=$PREFIX CFLAGS="$FLAGS" --disable-shared --disable-doc  --enable-static   --disable-fortran --disable-alloca
testExitCode "fftw configure" $?
emcmake make $MAKE_FLAGS CFLAGS="$CFLAGS" CXXFLAGS="$CXXFLAGS" PKG_CONFIG_PATH="$PKG_CONFIG_PATH"
testExitCode "fftw make" $?
emcmake make install


