//@ts-nocheck

var { magickLoaded, getOptions } = require('../../')
const { readFileSync } = require('fs')

function test() {
  magickLoaded.then(({ FS, main }) => {
    const format = getImageFormat({ FS, main, fileName: 'n.png', fileContent: readFileSync('test/assets/n.png') })
    process.stdout.write('The format is: ' + format + '\n');
  })
}

function getImageFormat({ FS, main, fileName, fileContent }) {
  const { emscriptenNodeFsRoot } = getOptions()
  var internalName = emscriptenNodeFsRoot + '/' + fileName;
  FS.writeFile(internalName, fileContent);

  var command = ["identify", fileName];

  try {
    const { stdout, stderr, error } = main(command)
    var format = stdout.join('').split(/\s+/g)[1]
    return format.toLowerCase()
  }
  catch (e) {
    console.error('ERROR', e);
    throw e
  }
}

test()