> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [NativeOptions](_types_.nativeoptions.md) /

# Interface: NativeOptions

## Hierarchy

* `BaseOptions`

  * **NativeOptions**

  * [Options](_types_.options.md)

## Index

### Properties

* [debug](_types_.nativeoptions.md#optional-debug)
* [disableNodeFs](_types_.nativeoptions.md#optional-disablenodefs)
* [emscriptenNodeFsRoot](_types_.nativeoptions.md#emscriptennodefsroot)
* [nodeFsLocalRoot](_types_.nativeoptions.md#nodefslocalroot)
* [outputDir](_types_.nativeoptions.md#outputdir)
* [useNative](_types_.nativeoptions.md#optional-usenative)

## Properties

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from void*

*Defined in [types.ts:53](https://github.com/cancerberoSgx/magica/blob/c182367/src/types.ts#L53)*

___

### `Optional` disableNodeFs

• **disableNodeFs**? : *undefined | false | true*

*Defined in [types.ts:44](https://github.com/cancerberoSgx/magica/blob/c182367/src/types.ts#L44)*

Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be
faster if read/write many images but consumes more memory.

___

###  emscriptenNodeFsRoot

• **emscriptenNodeFsRoot**: *string*

*Defined in [types.ts:33](https://github.com/cancerberoSgx/magica/blob/c182367/src/types.ts#L33)*

Internal root FS directed path. This should rarely be configured by users.

___

###  nodeFsLocalRoot

• **nodeFsLocalRoot**: *string*

*Defined in [types.ts:28](https://github.com/cancerberoSgx/magica/blob/c182367/src/types.ts#L28)*

(Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of
memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT:
the content of this folder will be removed each time the tool is executed.

___

###  outputDir

• **outputDir**: *string*

*Defined in [types.ts:38](https://github.com/cancerberoSgx/magica/blob/c182367/src/types.ts#L38)*

(CLI only). Output files will be written in this folder. By default is current directory.

___

### `Optional` useNative

• **useNative**? : *undefined | false | true*

*Defined in [types.ts:49](https://github.com/cancerberoSgx/magica/blob/c182367/src/types.ts#L49)*

If true and when running on node.js, and only if image magick commands are available in the local system, it will execute the commands using the local native ImageMagick commands, instead of running them though the emscripten port (which is slower and support less capabilities).