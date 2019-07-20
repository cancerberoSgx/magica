> **[magica](../README.md)**

[Globals](../README.md) / ["main/executeCommandPreprocessor"](_main_executecommandpreprocessor_.md) /

# External module: "main/executeCommandPreprocessor"

### Index

#### Interfaces

* [CommandPreprocessor](../interfaces/_main_executecommandpreprocessor_.commandpreprocessor.md)

#### Functions

* [_preprocessCommand](_main_executecommandpreprocessor_.md#_preprocesscommand)
* [registerCommandPreprocessor](_main_executecommandpreprocessor_.md#registercommandpreprocessor)

## Functions

###  _preprocessCommand

▸ **_preprocessCommand**(`config`: [RunOptions](../interfaces/_types_.runoptions.md)): *[RunOptions](../interfaces/_types_.runoptions.md)*

*Defined in [main/executeCommandPreprocessor.ts:12](https://github.com/cancerberoSgx/magica/blob/94207d7/src/main/executeCommandPreprocessor.ts#L12)*

internal - executes all registered preprocessor on given config

**Parameters:**

Name | Type |
------ | ------ |
`config` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *[RunOptions](../interfaces/_types_.runoptions.md)*

___

###  registerCommandPreprocessor

▸ **registerCommandPreprocessor**(`p`: [CommandPreprocessor](../interfaces/_main_executecommandpreprocessor_.commandpreprocessor.md)): *void*

*Defined in [main/executeCommandPreprocessor.ts:20](https://github.com/cancerberoSgx/magica/blob/94207d7/src/main/executeCommandPreprocessor.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [CommandPreprocessor](../interfaces/_main_executecommandpreprocessor_.commandpreprocessor.md) |

**Returns:** *void*