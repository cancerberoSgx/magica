[magica](../README.md) › ["main/command"](_main_command_.md)

# External module: "main/command"

## Index

### Functions

* [arrayToCli](_main_command_.md#arraytocli)
* [arrayToCliOne](_main_command_.md#arraytoclione)
* [cliToArray](_main_command_.md#clitoarray)
* [processCommand](_main_command_.md#processcommand)

## Functions

###  arrayToCli

▸ **arrayToCli**(`command`: string[] | string[][]): *string*

*Defined in [main/command.ts:29](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/main/command.ts#L29)*

Generates a valid command line string from given `string[]` that is compatible with  {@link call}. Works with multiple
commands by separating  them with new lines and support comand splitting in new lines using `\`.
See {@link ExecuteCommand} for more information.

**Parameters:**

Name | Type |
------ | ------ |
`command` | string[] &#124; string[][] |

**Returns:** *string*

___

###  arrayToCliOne

▸ **arrayToCliOne**(`command`: string[]): *string*

*Defined in [main/command.ts:13](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/main/command.ts#L13)*

Generates a valid command line command from given `string[]` command. Works with a single command.

**Parameters:**

Name | Type |
------ | ------ |
`command` | string[] |

**Returns:** *string*

___

###  cliToArray

▸ **cliToArray**(`cliCommand`: string): *string[][]*

*Defined in [main/command.ts:73](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/main/command.ts#L73)*

Generates a command in the form of `string[][]` that is compatible with {@link call} from given command line string.
This works for strings containing multiple commands in different lines. and also respect `\` character for continue the same
command in a new line. See {@link ExecuteCommand} for more information.

**Parameters:**

Name | Type |
------ | ------ |
`cliCommand` | string |

**Returns:** *string[][]*

___

###  processCommand

▸ **processCommand**(`command`: string | string[]): *string[]*

*Defined in [main/command.ts:3](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/main/command.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`command` | string &#124; string[] |

**Returns:** *string[]*
