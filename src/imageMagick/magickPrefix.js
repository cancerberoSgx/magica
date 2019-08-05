// @ts-nocheck

const { magickLoaded, pushStdout, pushStderr, getOptions, moduleLocateFile, isNode } = require('../magickLoaded')
const { nodeFsLocalRoot, emscriptenNodeFsRoot, debug, disableNodeFs } = getOptions()

Module = typeof Module === 'undefined' ? {} : Module

Object.assign(Module, {
  noExitRuntime: true,  

  noInitialRun: true,   

  logReadFiles: debug,

  print: pushStdout,

  printErr: pushStderr,

  preRun: function () {
    debug && console.log('Module.preRun. isNode: ', isNode())
    if(!FS.isDir(emscriptenNodeFsRoot)) {
      FS.mkdir(emscriptenNodeFsRoot)
    }
    if (isNode() && !disableNodeFs) {
      if (!require('f'+'s').existsSync(nodeFsLocalRoot)) {
        require('f'+'s').mkdirSync(nodeFsLocalRoot, { recursive: true })
      }
      debug && console.log(`Mounting local folder "${nodeFsLocalRoot}" as emscripten root folder "${emscriptenNodeFsRoot}".`)
      FS.mount(NODEFS, { root: nodeFsLocalRoot }, emscriptenNodeFsRoot);
    }
    debug && console.log('Module.preRun <-- exiting')
  },

  onRuntimeInitialized: function () {
    debug && console.log('Emscripten Module.onRuntimeInitialized ')
    magickLoaded.resolve({
      FS, main: require('../createMain').createMain(Module, FS)
    })
  },

  onAbort: function(what){
    console.error('onAbort', what)
    console.trace()    
  },

  locateFile: moduleLocateFile
  
})
