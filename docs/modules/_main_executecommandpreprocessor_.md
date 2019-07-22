> **[magica](../README.md)**

[Globals](../README.md) / ["main/executeCommandPreprocessor"](_main_executecommandpreprocessor_.md) /

# External module: "main/executeCommandPreprocessor"

## Index

### Functions

* [_preprocessCommand](_main_executecommandpreprocessor_.md#_preprocesscommand)
* [registerCommandPreprocessor](_main_executecommandpreprocessor_.md#registercommandpreprocessor)

## Functions

###  _preprocessCommand

▸ **_preprocessCommand**(`config`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<RunOptions>`*

*Defined in [main/executeCommandPreprocessor.ts:8](https://github.com/cancerberoSgx/magica/blob/f07fbfd/src/main/executeCommandPreprocessor.ts#L8)*

internal - executes all registered preprocessor on given config

**Parameters:**

Name | Type |
------ | ------ |
`config` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<RunOptions>`*

___

###  registerCommandPreprocessor

▸ **registerCommandPreprocessor**(`p`: [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md)): *void*

*Defined in [main/executeCommandPreprocessor.ts:16](https://github.com/cancerberoSgx/magica/blob/f07fbfd/src/main/executeCommandPreprocessor.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md) |

**Returns:** *void*