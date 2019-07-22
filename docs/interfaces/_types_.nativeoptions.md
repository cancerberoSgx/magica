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

## Properties

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from void*

*Defined in [types.ts:45](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L45)*

___

### `Optional` disableNodeFs

• **disableNodeFs**? : *undefined | false | true*

*Defined in [types.ts:41](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L41)*

Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be
faster if read/write many images but consumes more memory.

___

###  emscriptenNodeFsRoot

• **emscriptenNodeFsRoot**: *string*

*Defined in [types.ts:30](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L30)*

Internal root FS directed path. This should rarely be configured by users.

___

###  nodeFsLocalRoot

• **nodeFsLocalRoot**: *string*

*Defined in [types.ts:25](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L25)*

(Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of
memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT:
the content of this folder will be removed each time the tool is executed.

___

###  outputDir

• **outputDir**: *string*

*Defined in [types.ts:35](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L35)*

(CLI only). Output files will be written in this folder. By default is current directory.