#!/bin/bash

source emscripten-scripts/base.sh

cd ../..
rm -rf src/imageMagick/compiled/*
cp $PREFIX/wasm/magick.wasm $PREFIX/wasm/magick.js src/imageMagick/compiled/
npm run build
