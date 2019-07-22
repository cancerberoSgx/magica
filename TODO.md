
## TODO / Road map

- [ ] performance tests in the browser
- [ ] consume input image from stream (only node.js ?)and support stdin . same for output / stdout
- [ ] fix npm run test-js  
- [ ] verify support IM command quoted arguments
- [ ] verify mkdir -p for output files
- [ ] because options are global - sending commands concurrently could fail. Solution: queue or instance options
- [ ] verify montage and other commands than convert and identify (montage is special with files?)
- [ ] an easy to use API for web-workers
- [ ] verify web worker  passing files is optimal (verify transferable/shared array buffers/optimal)
- [ ] scripts/generateImEnum.ts we should execute our CLI to extract 
- [ ] remove all logic from imageMagick/compiled/nodeMagick.js to separate.ts file
- [ ] adapt executeVirtualCommand from wasm-imagemagick own branch
- [ ] test and document protected files feature
- [ ] improve errors thrown when there's a missing file, currently it fails silently.
- [w] document run script and supported syntax
  - [ ] document command preprocessor and script template
- [x] apidocs
- [?] Option for Node.js users to work/mount current directory - the tool should not copy input files just use them since are present in mount root ems
- [?] how high level scripts DDD can be integrated ? different project ?
- [x] template should allow to add custom functions to the context
- [x] adapt executeCommandPreprocessor and command template preprocessor from wasm-imagemagick own branch
- [x] travis
- [x] coverage
- [x] imageBuiltIn() to get all IM built-in images like rose:)
- [x] run() script like executions uses main to run several commands feeding from previous output supporting syntax sugar
  - [x] fix issue with long operations and add more tests
  - [x] support multiple line string commands like in src/main/command.ts
- [x] rich command syntax (src/main/command)
  - [x] end porting tests
- [x] imagePixelColor()
- [x] imageCompare()
- [x] extractImageInfo()
- [x] test from a real-app - check missing exported APIs - npm install usability
- [x] playground
- [x] webworker example & recipe (see test-browser/webWorker)
- [x] format tests
- [x] Performance tests (can we measure also memory consumption?)
- [x] browser tests
- [x] support input images from URLS both in node and browser.
- [x] node.js : work directly in user's filesystem without copying to emc FS: 
- [x] browser
- [x] CLI
- [x] CLI tests
- [x] Input file from url

### Ideas

- [ ] drawing svg. is not documented and seems the official way is doing it using mvg. But... what if we convert all shapes to paths, use svgo to reduce the number to (even single ) path and use draw to draw them. syntax seems to be compatible... This way we should have yet another method of rasterize a svg, but this time to any format. I wonder what the speed is compared to other rasterize methods, if we target .ma

- [ ] can we perform similar algorithm as geometrize with IM? this is interesting use-case since the objective is performance, reuse files so we need an api for:
  * prevent/ control file removal
  * commands to write/modify/access existing files
    two api alternatives:
       - Mode like / options - options.reuseFiles or options.preventFileRemove that wont write or remove files (user responsibility)
       - per file attribute "readonly"
           - an API to mark certain files or folders as readonly so they cannot me touched by convert commands. 
              - so i can create a folder and work there.
              - I can pass options.forceFileOverride to explicitly allow modifications by convert.
  * could start with random drawings and image compare (whole image or the local area)