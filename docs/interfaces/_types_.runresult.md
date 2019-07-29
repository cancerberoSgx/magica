> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [RunResult](_types_.runresult.md) /

# Interface: RunResult

Represent the result of executing a sequence of commands. In this case outputFiles are the output files of
just the last command, while stdout, stderr are the concatenation of all commands output.

## Hierarchy

  * [Result](_types_.result.md)

  * **RunResult**

## Index

### Properties

* [commands](_types_.runresult.md#commands)
* [error](_types_.runresult.md#error)
* [outputFiles](_types_.runresult.md#outputfiles)
* [results](_types_.runresult.md#results)
* [returnValue](_types_.runresult.md#returnvalue)
* [stderr](_types_.runresult.md#stderr)
* [stdout](_types_.runresult.md#stdout)

## Properties

###  commands

• **commands**: *string[][]*

*Defined in [types.ts:166](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/types.ts#L166)*

The command sequence decoded from given script.

___

###  error

• **error**: *`Error` | undefined*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[error](_imagemagick_createmain_.nativeresult.md#error)*

*Defined in [imageMagick/createMain.ts:43](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/imageMagick/createMain.ts#L43)*

___

###  outputFiles

• **outputFiles**: *[IFile](_types_.ifile.md)[]*

*Overrides [Result](_types_.result.md).[outputFiles](_types_.result.md#outputfiles)*

*Defined in [types.ts:171](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/types.ts#L171)*

Las command output files

___

###  results

• **results**: *[Result](_types_.result.md)[]*

*Defined in [types.ts:161](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/types.ts#L161)*

Sequence of results for each command found in the script, in order.

___

###  returnValue

• **returnValue**: *any*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[returnValue](_imagemagick_createmain_.nativeresult.md#returnvalue)*

*Defined in [imageMagick/createMain.ts:40](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/imageMagick/createMain.ts#L40)*

___

###  stderr

• **stderr**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stderr](_imagemagick_createmain_.nativeresult.md#stderr)*

*Defined in [imageMagick/createMain.ts:42](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/imageMagick/createMain.ts#L42)*

___

###  stdout

• **stdout**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stdout](_imagemagick_createmain_.nativeresult.md#stdout)*

*Defined in [imageMagick/createMain.ts:41](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/imageMagick/createMain.ts#L41)*