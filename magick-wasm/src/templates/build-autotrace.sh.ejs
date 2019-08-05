#!/bin/bash

# This file is auto-generated from src/templates

# source emscripten-scripts/base.sh
PREFIX="$PWD/emscripten_prefix"

mkdir -p $PREFIX/src
cd $PREFIX/src

if [ ! -d "autotrace" ]; then
  wget https://ufpr.dl.sourceforge.net/project/autotrace/AutoTrace/0.31.1/autotrace-0.31.1.tar.gz
  tar xvfz autotrace-0.31.1.tar.gz
  mv autotrace-0.31.1 autotrace
  # git clone https://github.com/autotrace/autotrace.git
else  
  ( cd autotrace ; emcmake make clean )
fi

cd autotrace
# autoreconf -fiv
# autoreconf -vif 
# sh autogen.sh --prefix=$PREFIX
# emconfigure sh autogen.sh

emconfigure ./configure --prefix=$PREFIX --disable-shared --enable-static --without-magick --without-pstoedit  --without-png   
# emconfigure ./configure --prefix=$PREFIX 
# testExitCode "autotrace configure" $?

emcmake make install 


cp -r .libs/* $PREFIX/lib
cp autotrace.pc $PREFIX/lib/pkgconfig

mkdir -p  $PREFIX/include/autotrace
cp *.h $PREFIX/include/autotrace



# testExitCode "autotrace make install" $?