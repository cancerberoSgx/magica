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

*Defined in [types.ts:147](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L147)*

The command sequence decoded from given script.

___

###  error

• **error**: *`Error` | undefined*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[error](_imagemagick_createmain_.nativeresult.md#error)*

*Defined in [imageMagick/createMain.ts:40](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/imageMagick/createMain.ts#L40)*

___

###  outputFiles

• **outputFiles**: *[IFile](_types_.ifile.md)[]*

*Overrides [Result](_types_.result.md).[outputFiles](_types_.result.md#outputfiles)*

*Defined in [types.ts:152](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L152)*

Las command output files

___

###  results

• **results**: *[Result](_types_.result.md)[]*

*Defined in [types.ts:142](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L142)*

Sequence of results for each command found in the script, in order.

___

###  returnValue

• **returnValue**: *any*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[returnValue](_imagemagick_createmain_.nativeresult.md#returnvalue)*

*Defined in [imageMagick/createMain.ts:37](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/imageMagick/createMain.ts#L37)*

___

###  stderr

• **stderr**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stderr](_imagemagick_createmain_.nativeresult.md#stderr)*

*Defined in [imageMagick/createMain.ts:39](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/imageMagick/createMain.ts#L39)*

___

###  stdout

• **stdout**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stdout](_imagemagick_createmain_.nativeresult.md#stdout)*

*Defined in [imageMagick/createMain.ts:38](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/imageMagick/createMain.ts#L38)*