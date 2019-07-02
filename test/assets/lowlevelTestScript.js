//@ts-nocheck

var { magickLoaded } = require('../../')
const { readFileSync } = require('fs')

magickLoaded.then(({ FS, main }) => {
  const format = getImageFormat({ FS, main, fileName: 'n.png', fileContent: readFileSync('test/assets/n.png') })
  process.stdout.write('The format is: ' + format+'\n');
})

function getImageFormat({ FS, main, fileName, fileContent }) {
  var internalName = fileName;
  FS.writeFile(internalName, fileContent);

  var command = ["identify", internalName];
  try {
    const { stdout, stderr } = main(command)
    var format = stdout.join('').split(/\s+/g)[1]
    return format.toLowerCase()
  }
  catch (e) {
    console.error('ERROR', e);
    throw e
  }
}


