git submodules update --force

docker build -t magica-im . && docker run --rm --workdir /code -v "$PWD":/code magica-im bash ./build.sh

rm -rf dist
mkdir -p dist

cp ImageMagick/utilities/magick.{wasm,js} dist