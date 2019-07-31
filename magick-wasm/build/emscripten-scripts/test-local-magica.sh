#!/bin/bash

# This file is auto-generated from src/templates

source emscripten-scripts/base.sh

ls -lhk  $PREFIX/wasm/magick.wasm

cd $HOME/git/magica
rm -rf src/imageMagick/compiled/*
cp $PREFIX/wasm/magick.wasm $PREFIX/wasm/magick.js src/imageMagick/compiled/
npm run build
npm test