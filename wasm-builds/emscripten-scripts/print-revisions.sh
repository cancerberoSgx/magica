#!/bin/bash

source emscripten-scripts/base.sh

echo "Packages repos and versions of wasm compilation">$CURRENT_DIR/versions.txt
date >>$CURRENT_DIR/versions.txt

cd $PREFIX/src/fftw-3.3.8
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt

cd $PREFIX/src/freetype
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt

cd $PREFIX/src/ImageMagick
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt

cd $PREFIX/src/jpeg-turbo
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt

cd $PREFIX/src/libpng
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt

cd $PREFIX/src/tiff
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt

cd $PREFIX/src/zlib
echo "`basename $PWD`: `git remote get-url --push origin` - `git log -1 --pretty=format:%h`"  >> $CURRENT_DIR/versions.txt
