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

*Defined in [types.ts:175](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/types.ts#L175)*

## Methods

### `Optional` fnCompileTime

▸ **fnCompileTime**(`context`: `O`): *`Promise<O2>`*

*Defined in [types.ts:176](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/types.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | `O` |

**Returns:** *`Promise<O2>`*

___

### `Optional` fnRuntime

▸ **fnRuntime**(`commandOptions`: `RO`, `commandIndex`: number, `runOptions`: `O`): *`Promise<void>`*

*Defined in [types.ts:177](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/types.ts#L177)*

**Parameters:**

Name | Type |
------ | ------ |
`commandOptions` | `RO` |
`commandIndex` | number |
`runOptions` | `O` |

**Returns:** *`Promise<void>`*