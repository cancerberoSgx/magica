#!/bin/bash

docker build -t magica-im emscripten-scripts/ && docker run --rm --workdir /code -v "$PWD":/code magica-im /bin/bash --login emscripten-scripts/build.sh
