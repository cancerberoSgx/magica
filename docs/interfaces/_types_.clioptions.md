> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [CliOptions](_types_.clioptions.md) /

# Interface: CliOptions

## Hierarchy

  * [Options](_types_.options.md)

  * **CliOptions**

### Index

#### Properties

* [command](_types_.clioptions.md#command)
* [debug](_types_.clioptions.md#optional-debug)
* [disableNodeFs](_types_.clioptions.md#optional-disablenodefs)
* [emscriptenNodeFsRoot](_types_.clioptions.md#emscriptennodefsroot)
* [help](_types_.clioptions.md#optional-help)
* [input](_types_.clioptions.md#input)
* [inputFiles](_types_.clioptions.md#optional-inputfiles)
* [noRemove](_types_.clioptions.md#optional-noremove)
* [nodeFsLocalRoot](_types_.clioptions.md#nodefslocalroot)
* [outputDir](_types_.clioptions.md#outputdir)

## Properties

###  command

• **command**: *string | string[]*

*Inherited from [Options](_types_.options.md).[command](_types_.options.md#command)*

*Defined in [types.ts:37](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L37)*

An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`

___

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from void*

*Defined in [types.ts:29](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L29)*

___

### `Optional` disableNodeFs

• **disableNodeFs**? : *undefined | false | true*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[disableNodeFs](_types_.nativeoptions.md#optional-disablenodefs)*

*Defined in [types.ts:25](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L25)*

Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be faster if read/write many images but consumes more memory.

___

###  emscriptenNodeFsRoot

• **emscriptenNodeFsRoot**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[emscriptenNodeFsRoot](_types_.nativeoptions.md#emscriptennodefsroot)*

*Defined in [types.ts:16](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L16)*

Internal root FS directed path. This should rarely be configured by users.

___

### `Optional` help

• **help**? : *undefined | false | true*

*Defined in [types.ts:57](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L57)*

___

###  input

• **input**: *string[]*

*Defined in [types.ts:58](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L58)*

___

### `Optional` inputFiles

• **inputFiles**? : *string | [File](_types_.file.md)[]*

*Inherited from [Options](_types_.options.md).[inputFiles](_types_.options.md#optional-inputfiles)*

*Defined in [types.ts:41](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L41)*

The list of input files referenced in given [command](_types_.clioptions.md#command). It's important that the name of this files match the file names given in the command. If string and a file exists (node.js) then that file will be used. Otherwise it will be considered a url. In later cases, the filename will be the base name of file or url.

___

### `Optional` noRemove

• **noRemove**? : *undefined | false | true*

*Inherited from [Options](_types_.options.md).[noRemove](_types_.options.md#optional-noremove)*

*Defined in [types.ts:33](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L33)*

___

###  nodeFsLocalRoot

• **nodeFsLocalRoot**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[nodeFsLocalRoot](_types_.nativeoptions.md#nodefslocalroot)*

*Defined in [types.ts:12](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L12)*

(Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT: the content of this folder will be removed each time the tool is executed.

___

###  outputDir

• **outputDir**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[outputDir](_types_.nativeoptions.md#outputdir)*

*Defined in [types.ts:20](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/types.ts#L20)*

(CLI only). Output files will be written in this folder. By default is current directory.