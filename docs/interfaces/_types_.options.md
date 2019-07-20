> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [Options](_types_.options.md) /

# Interface: Options

## Hierarchy

  * [NativeOptions](_types_.nativeoptions.md)

  * **Options**

  * [CliOptions](_types_.clioptions.md)

### Index

#### Properties

* [command](_types_.options.md#command)
* [debug](_types_.options.md#optional-debug)
* [disableNodeFs](_types_.options.md#optional-disablenodefs)
* [emscriptenNodeFsRoot](_types_.options.md#emscriptennodefsroot)
* [inputFiles](_types_.options.md#optional-inputfiles)
* [nodeFsLocalRoot](_types_.options.md#nodefslocalroot)
* [outputDir](_types_.options.md#outputdir)
* [protectOutputFiles](_types_.options.md#optional-protectoutputfiles)

## Properties

###  command

• **command**: *string | string[]*

*Defined in [types.ts:59](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L59)*

An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`

___

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from void*

*Defined in [types.ts:45](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L45)*

___

### `Optional` disableNodeFs

• **disableNodeFs**? : *undefined | false | true*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[disableNodeFs](_types_.nativeoptions.md#optional-disablenodefs)*

*Defined in [types.ts:41](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L41)*

Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be
faster if read/write many images but consumes more memory.

___

###  emscriptenNodeFsRoot

• **emscriptenNodeFsRoot**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[emscriptenNodeFsRoot](_types_.nativeoptions.md#emscriptennodefsroot)*

*Defined in [types.ts:30](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L30)*

Internal root FS directed path. This should rarely be configured by users.

___

### `Optional` inputFiles

• **inputFiles**? : *string | [File](_types_.file.md)[]*

*Defined in [types.ts:66](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L66)*

The list of input files referenced in given [command](_types_.options.md#command). It's important that the name of this files match
the file names given in the command. If string and a file exists (node.js) then that file will be used.
Otherwise it will be considered a url. In later cases, the filename will be the base name of file or url.

___

###  nodeFsLocalRoot

• **nodeFsLocalRoot**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[nodeFsLocalRoot](_types_.nativeoptions.md#nodefslocalroot)*

*Defined in [types.ts:25](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L25)*

(Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of
memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT:
the content of this folder will be removed each time the tool is executed.

___

###  outputDir

• **outputDir**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[outputDir](_types_.nativeoptions.md#outputdir)*

*Defined in [types.ts:35](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L35)*

(CLI only). Output files will be written in this folder. By default is current directory.

___

### `Optional` protectOutputFiles

• **protectOutputFiles**? : *undefined | false | true*

*Defined in [types.ts:54](https://github.com/cancerberoSgx/magica/blob/94207d7/src/types.ts#L54)*

Will register output files as protected files so they are not deleted in the future calls. Are managed by the user.

Notice that protected files are not returned as [[output files]]