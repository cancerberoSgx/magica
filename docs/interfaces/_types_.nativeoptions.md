**[magica](../README.md)**

[Globals](../README.md) › ["types"](../modules/_types_.md) › [NativeOptions](_types_.nativeoptions.md)

# Interface: NativeOptions

## Hierarchy

* BaseOptions

  * **NativeOptions**

  * [Options](_types_.options.md)

## Index

### Properties

* [customCommandPrefix](_types_.nativeoptions.md#optional-customcommandprefix)
* [debug](_types_.nativeoptions.md#optional-debug)
* [disableNodeFs](_types_.nativeoptions.md#optional-disablenodefs)
* [emscriptenNodeFsRoot](_types_.nativeoptions.md#emscriptennodefsroot)
* [mainConcurrency](_types_.nativeoptions.md#mainconcurrency)
* [mainInterval](_types_.nativeoptions.md#maininterval)
* [nodeFsLocalRoot](_types_.nativeoptions.md#nodefslocalroot)
* [outputDir](_types_.nativeoptions.md#outputdir)
* [useNative](_types_.nativeoptions.md#optional-usenative)

## Properties

### `Optional` customCommandPrefix

• **customCommandPrefix**? : *undefined | string*

*Defined in [types.ts:64](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L64)*

___

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from void*

*Defined in [types.ts:68](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L68)*

___

### `Optional` disableNodeFs

• **disableNodeFs**? : *undefined | false | true*

*Defined in [types.ts:44](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L44)*

Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be
faster if read/write many images but consumes more memory.

___

###  emscriptenNodeFsRoot

• **emscriptenNodeFsRoot**: *string*

*Defined in [types.ts:33](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L33)*

Internal root FS directed path. This should rarely be configured by users.

___

###  mainConcurrency

• **mainConcurrency**: *number*

*Defined in [types.ts:58](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L58)*

main() commands are queued and this defines de limit of running commands at the same time. it's no so
important since the main() call is synch but files/urls are resolved also so this has an impact on those
async operations

___

###  mainInterval

• **mainInterval**: *0*

*Defined in [types.ts:62](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L62)*

main() commands are queued and this is the milliseconds to wait before starting a new main command

___

###  nodeFsLocalRoot

• **nodeFsLocalRoot**: *string*

*Defined in [types.ts:28](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L28)*

(Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of
memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT:
the content of this folder will be removed each time the tool is executed.

___

###  outputDir

• **outputDir**: *string*

*Defined in [types.ts:38](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L38)*

(CLI only). Output files will be written in this folder. By default is current directory.

___

### `Optional` useNative

• **useNative**? : *undefined | false | true*

*Defined in [types.ts:51](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L51)*

If true and when running on node.js, and only if image magick commands are available in the local system,
it will execute the commands using the local native ImageMagick commands, instead of running them though
the emscripten port (which is slower and support less capabilities).