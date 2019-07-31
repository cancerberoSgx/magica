#!/bin/bash

# This file is auto-generated from src/templates

docker build -t magica-im emscripten-scripts/ && \
  docker run --tty --rm --workdir /code -v "$PWD":/code magica-im /bin/bash --login emscripten-scripts/build.sh
 