> **[magica](../README.md)**

[Globals](../README.md) / ["main/run"](_main_run_.md) /

# External module: "main/run"

## Index

### Functions

* [run](_main_run_.md#run)
* [runOne](_main_run_.md#runone)

## Functions

###  run

▸ **run**(`o`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<RunResult>`*

*Defined in [main/run.ts:24](https://github.com/cancerberoSgx/magica/blob/1a62845/src/main/run.ts#L24)*

Has a signature compatible with main, but if `script` is given instead of `command` option then it's
interpreted as a sequence of commands that are executed serially using [main](../interfaces/_imagemagick_magickloaded_.main.md#main)

The output files of command N are added as input files for command n+1 replacing files with the same name.
This way users can write script-like behavior for complex tasks that require more than one command to be
implemented.

Also it supports shell script comments (lines starting with `#` are ignored) and breaking a single command
in multiple lines using `\`.

See [RunOptions.script](../interfaces/_types_.runoptions.md#optional-script) option.

**Parameters:**

Name | Type |
------ | ------ |
`o` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<RunResult>`*

the result of each command execution

___

###  runOne

▸ **runOne**(`script`: string, `input`: [File](../classes/_file_file_.file.md) | [File](../classes/_file_file_.file.md)[]): *`Promise<File>`*

*Defined in [main/run.ts:68](https://github.com/cancerberoSgx/magica/blob/1a62845/src/main/run.ts#L68)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`script` | string | - |
`input` | [File](../classes/_file_file_.file.md) \| [File](../classes/_file_file_.file.md)[] |  [] |

**Returns:** *`Promise<File>`*