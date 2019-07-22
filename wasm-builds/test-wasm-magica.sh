# tests generataed .wasm files using magica test suite. 


WASM_IMAGEMAGICK_DIR=build-wasm-imagemagick
MAGICA_DIR=tmp/wasm-magica-test
CWD=$PWD
cd $WASM_IMAGEMAGICK_DIR
sh docker-start.sh
cd $CWD

rm -rf $MAGICA_DIR
mkdir -p $MAGICA_DIR
cd $MAGICA_DIR
git clone https://github.com/cancerberoSgx/magica.git
cd magica
npm i && npm run build && npm test
if [ "$?" -ne "0" ]; then
  echo "Error executing npm i && npm test. Aborting."
  exit 1
fi
rm src/imageMagick/compiled/magick.{wasm,js}
cp $WASM_IMAGEMAGICK_DIR/magick.{wasm,js} src/imageMagick/compiled/
npm run build && npm test
if [ "$?" -ne "0" ]; then
  echo "Error executing npm i && npm test. Aborting."
  exit 1
fi