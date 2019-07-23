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

*Defined in [types.ts:182](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L182)*

## Methods

### `Optional` fnCompileTime

▸ **fnCompileTime**(`context`: `O`): *`Promise<O2>`*

*Defined in [types.ts:183](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L183)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | `O` |

**Returns:** *`Promise<O2>`*

___

### `Optional` fnRuntime

▸ **fnRuntime**(`commandOptions`: `RO`, `commandIndex`: number, `runOptions`: `O`): *`Promise<void>`*

*Defined in [types.ts:184](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`commandOptions` | `RO` |
`commandIndex` | number |
`runOptions` | `O` |

**Returns:** *`Promise<void>`*