> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [RunResult](_types_.runresult.md) /

# Interface: RunResult

represent the result of executing a sequence of commands. In this case outputFiles are the output files of just the last command, while stdout, stderr are the concatenation of all commands output.

## Hierarchy

  * [Result](_types_.result.md)

  * **RunResult**

### Index

#### Properties

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

*Defined in [types.ts:114](https://github.com/cancerberoSgx/magica/blob/825f829/src/types.ts#L114)*

___

###  error

• **error**: *`Error` | undefined*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[error](_imagemagick_createmain_.nativeresult.md#error)*

*Defined in [imageMagick/createMain.ts:28](https://github.com/cancerberoSgx/magica/blob/825f829/src/imageMagick/createMain.ts#L28)*

___

###  outputFiles

• **outputFiles**: *[File](_types_.file.md)[]*

*Overrides [Result](_types_.result.md).[outputFiles](_types_.result.md#outputfiles)*

*Defined in [types.ts:118](https://github.com/cancerberoSgx/magica/blob/825f829/src/types.ts#L118)*

Las command output files

___

###  results

• **results**: *[Result](_types_.result.md)[]*

*Defined in [types.ts:113](https://github.com/cancerberoSgx/magica/blob/825f829/src/types.ts#L113)*

___

###  returnValue

• **returnValue**: *any*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[returnValue](_imagemagick_createmain_.nativeresult.md#returnvalue)*

*Defined in [imageMagick/createMain.ts:25](https://github.com/cancerberoSgx/magica/blob/825f829/src/imageMagick/createMain.ts#L25)*

___

###  stderr

• **stderr**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stderr](_imagemagick_createmain_.nativeresult.md#stderr)*

*Defined in [imageMagick/createMain.ts:27](https://github.com/cancerberoSgx/magica/blob/825f829/src/imageMagick/createMain.ts#L27)*

___

###  stdout

• **stdout**: *string[]*

*Inherited from [NativeResult](_imagemagick_createmain_.nativeresult.md).[stdout](_imagemagick_createmain_.nativeresult.md#stdout)*

*Defined in [imageMagick/createMain.ts:26](https://github.com/cancerberoSgx/magica/blob/825f829/src/imageMagick/createMain.ts#L26)*