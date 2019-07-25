PREFIX="$PWD/emscripten_prefix"


testExitCode () {
  name=$1
  exitCode=$2
  echo "
******** $name exit code: $exitCode *******
  "
  if [ "$exitCode" -ne "0" ]; then
    exit 1
  fi
}

cd $PREFIX/bin

node convert -list format
if [ "$?" -ne "0" ]; then
  exit 1
fi