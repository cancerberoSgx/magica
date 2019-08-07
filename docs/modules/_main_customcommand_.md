> **[magica](../README.md)**

[Globals](../README.md) / ["main/customCommand"](_main_customcommand_.md) /

# External module: "main/customCommand"

## Index

### Interfaces

* [CustomCommandContext](../interfaces/_main_customcommand_.customcommandcontext.md)

### Functions

* [dispatchCustomCommand](_main_customcommand_.md#dispatchcustomcommand)
* [isCustomCommand](_main_customcommand_.md#iscustomcommand)

## Functions

###  dispatchCustomCommand

▸ **dispatchCustomCommand**(`c`: string[], `o`: `Partial<Options>`, `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md), `files`: [File](../classes/_file_file_.file.md)[]): *`Promise<NativeResult>`*

*Defined in [main/customCommand.ts:76](https://github.com/cancerberoSgx/magica/blob/cc19f3a/src/main/customCommand.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`c` | string[] |
`o` | `Partial<Options>` |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |
`files` | [File](../classes/_file_file_.file.md)[] |

**Returns:** *`Promise<NativeResult>`*

___

###  isCustomCommand

▸ **isCustomCommand**(`c`: string[], `o`: `Partial<Options>`): *`Promise<boolean>`*

*Defined in [main/customCommand.ts:10](https://github.com/cancerberoSgx/magica/blob/cc19f3a/src/main/customCommand.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`c` | string[] |
`o` | `Partial<Options>` |

**Returns:** *`Promise<boolean>`*