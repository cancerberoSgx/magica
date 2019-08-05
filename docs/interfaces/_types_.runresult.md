> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [RunResult](_types_.runresult.md) /

# Interface: RunResult <**T**>

Represent the result of executing a sequence of commands. In this case outputFiles are the output files of
just the last command, while stdout, stderr are the concatenation of all commands output.

## Type parameters

▪ **T**: *[IFile](_types_.ifile.md)*

## Hierarchy

  * [Result](_types_.result.md)‹*`T`*›

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
* [times](_types_.runresult.md#optional-times)

## Properties

###  commands

• **commands**: *string[][]*

*Defined in [types.ts:180](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/types.ts#L180)*

The command sequence decoded from given script.

___

###  error

• **error**: *`Error` | undefined*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[error](_imagemagick_createmain_.nativeresult.md#error)*

*Defined in [imageMagick/createMain.ts:35](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/imageMagick/createMain.ts#L35)*

___

###  outputFiles

• **outputFiles**: *`T`[]*

*Inherited from [Result](_types_.result.md).[outputFiles](_types_.result.md#outputfiles)*

*Defined in [types.ts:90](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/types.ts#L90)*

___

###  results

• **results**: *[Result](_types_.result.md)[]*

*Defined in [types.ts:175](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/types.ts#L175)*

Sequence of results for each command found in the script, in order.

___

###  returnValue

• **returnValue**: *any*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[returnValue](_imagemagick_createmain_.nativeresult.md#returnvalue)*

*Defined in [imageMagick/createMain.ts:32](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/imageMagick/createMain.ts#L32)*

___

###  stderr

• **stderr**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stderr](_imagemagick_createmain_.nativeresult.md#stderr)*

*Defined in [imageMagick/createMain.ts:34](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/imageMagick/createMain.ts#L34)*

___

###  stdout

• **stdout**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stdout](_imagemagick_createmain_.nativeresult.md#stdout)*

*Defined in [imageMagick/createMain.ts:33](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/imageMagick/createMain.ts#L33)*

___

### `Optional` times

• **times**? : *undefined | object*

*Inherited from [Result](_types_.result.md).[times](_types_.result.md#optional-times)*

*Defined in [types.ts:91](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/types.ts#L91)*