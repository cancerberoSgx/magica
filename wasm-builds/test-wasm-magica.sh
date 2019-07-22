# tests generataed .wasm files using magica test suite. 

T=wasm-builds/build-wasm-imagemagick/dist
F=tmp/wasm-magica-test
rm -rf $F
mkdir $F
cd $F
git clone https://github.com/cancerberoSgx/magica.git
cd magica
npm i && npm run build && npm test
if [ "$?" -ne "0" ]; then
  echo "Error executing npm i && npm test. Aborting."
  exit 1
fi
rm src/imageMagick/compiled/magick.{wasm,js}
cp $T/magick.{wasm,js} src/imageMagick/compiled/
npm i && npm run build && npm test
if [ "$?" -ne "0" ]; then
  echo "Error executing npm i && npm test. Aborting."
  exit 1
fi