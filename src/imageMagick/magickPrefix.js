// @ts-nocheck

const { magickLoaded, pushStdout, pushStderr, getOptions } = require('../magickLoaded')
const {isNode} = require('misc-utils-of-mine-generic')

const { nodeFsLocalRoot, emscriptenNodeFsRoot, debug, disableNodeFs } = getOptions()

Module = typeof Module === 'undefined' ? {} : Module

Object.assign(Module, {
  noInitialRun: true,  // tell wasm runner to not execute application
  print: function (text) {
    pushStdout(text)
  },
  printErr: function (text) {
    pushStderr(text)
  },
  preRun: function () {
    debug && console.log('Module.preRun. isNode: ', isNode())
    FS.mkdir(emscriptenNodeFsRoot)
    if (isNode() && !disableNodeFs) {
      if (!require('f' + 's').existsSync(nodeFsLocalRoot)) {
        require('f' + 's').mkdirSync(nodeFsLocalRoot, { recursive: true })
      }
      debug && console.log(`Mounting local folder ${nodeFsLocalRoot} as emscripten root folder ${emscriptenNodeFsRoot}.`)
      FS.mount(NODEFS, { root: nodeFsLocalRoot }, emscriptenNodeFsRoot);
    }
    debug && console.log('Module.preRun <-- exiting')
  }
})

Module.onRuntimeInitialized = function () {
  debug && console.log('Emscripten Module.onRuntimeInitialized ')
  magickLoaded.resolve({
    FS, main: require('../createMain').createMain(Module)
  })
}; 