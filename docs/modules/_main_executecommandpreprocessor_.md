> **[magica](../README.md)**

[Globals](../README.md) / ["main/executeCommandPreprocessor"](_main_executecommandpreprocessor_.md) /

# External module: "main/executeCommandPreprocessor"

## Index

### Functions

* [_compileTimePreprocess](_main_executecommandpreprocessor_.md#_compiletimepreprocess)
* [_runTimePreprocess](_main_executecommandpreprocessor_.md#_runtimepreprocess)
* [registerCommandPreprocessor](_main_executecommandpreprocessor_.md#registercommandpreprocessor)

## Functions

###  _compileTimePreprocess

▸ **_compileTimePreprocess**(`config`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<RunOptions>`*

*Defined in [main/executeCommandPreprocessor.ts:9](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/executeCommandPreprocessor.ts#L9)*

internal - executes all registered preprocessor on given config

**Parameters:**

Name | Type |
------ | ------ |
`config` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<RunOptions>`*

___

###  _runTimePreprocess

▸ **_runTimePreprocess**(`runOptions`: [RunOptions](../interfaces/_types_.runoptions.md), `commandOptions`: [Options](../interfaces/_types_.options.md), `commandIndex`: number): *`Promise<void>`*

*Defined in [main/executeCommandPreprocessor.ts:18](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/executeCommandPreprocessor.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`runOptions` | [RunOptions](../interfaces/_types_.runoptions.md) |
`commandOptions` | [Options](../interfaces/_types_.options.md) |
`commandIndex` | number |

**Returns:** *`Promise<void>`*

___

###  registerCommandPreprocessor

▸ **registerCommandPreprocessor**(`p`: [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md)): *void*

*Defined in [main/executeCommandPreprocessor.ts:28](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/executeCommandPreprocessor.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md) |

**Returns:** *void*