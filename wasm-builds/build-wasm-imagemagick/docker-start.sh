git submodule update --init --recursive --force
git submodule update --remote --merge --force --recursive ImageMagick
cd ImageMagick
git fetch
git checkout master # or any other branch that you need the latest of
git merge origin/master
cd -  # go back to the top repo
# git status # should show that your submodule changed
git add ImageMagick
git commit -m "Updated my solution to use latest sub project."


docker build -t magica-im . && docker run --rm --workdir /code -v "$PWD":/code magica-im bash ./build.sh

rm -rf ./magick.{wasm,js}
cp ImageMagick/utilities/magick.{wasm,js} .