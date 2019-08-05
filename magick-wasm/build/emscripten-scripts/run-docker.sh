#!/bin/bash

# This file is auto-generated from src/templates

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

docker build -t magica-im "$DIR" && \
  docker run --tty --rm -t -i --workdir /code -v "$PWD":/code magica-im /bin/bash --login emscripten-scripts/build.sh
 