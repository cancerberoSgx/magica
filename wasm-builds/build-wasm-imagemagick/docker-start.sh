
git submodule update --init --recursive --force

git submodule update --remote --merge --force --recursive ImageMagick

docker build -t magica-im . && docker run --rm --workdir /code -v "$PWD":/code magica-im bash ./build.sh

rm -rf ./magick.{wasm,js}
cp ImageMagick/utilities/magick.{wasm,js} .