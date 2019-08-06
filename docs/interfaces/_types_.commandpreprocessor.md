> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [CommandPreprocessor](_types_.commandpreprocessor.md) /

# Interface: CommandPreprocessor <**O, O2, RO**>

## Type parameters

▪ **O**: *[RunOptions](_types_.runoptions.md)*

▪ **O2**: *`O`*

▪ **RO**: *[Options](_types_.options.md)*

## Hierarchy

* **CommandPreprocessor**

## Implemented by

* [Template](../classes/_main_template_template_.template.md)

## Index

### Properties

* [name](_types_.commandpreprocessor.md#name)

### Methods

* [fnCompileTime](_types_.commandpreprocessor.md#optional-fncompiletime)
* [fnRuntime](_types_.commandpreprocessor.md#optional-fnruntime)

## Properties

###  name

• **name**: *string*

*Defined in [types.ts:189](https://github.com/cancerberoSgx/magica/blob/5e806b9/src/types.ts#L189)*

## Methods

### `Optional` fnCompileTime

▸ **fnCompileTime**(`context`: `O`): *`Promise<O2>`*

*Defined in [types.ts:190](https://github.com/cancerberoSgx/magica/blob/5e806b9/src/types.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | `O` |

**Returns:** *`Promise<O2>`*

___

### `Optional` fnRuntime

▸ **fnRuntime**(`commandOptions`: `RO`, `commandIndex`: number, `runOptions`: `O`): *`Promise<void>`*

*Defined in [types.ts:191](https://github.com/cancerberoSgx/magica/blob/5e806b9/src/types.ts#L191)*

**Parameters:**

Name | Type |
------ | ------ |
`commandOptions` | `RO` |
`commandIndex` | number |
`runOptions` | `O` |

**Returns:** *`Promise<void>`*