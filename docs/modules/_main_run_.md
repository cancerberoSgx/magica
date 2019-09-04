**[magica](../README.md)**

[Globals](../README.md) › ["main/run"](_main_run_.md)

# External module: "main/run"

## Index

### Functions

* [run](_main_run_.md#run)
* [runOne](_main_run_.md#runone)

## Functions

###  run

▸ **run**<**T**>(`o`: [RunOptions](../interfaces/_types_.runoptions.md)): *Promise‹[RunResult](../interfaces/_types_.runresult.md)‹T››*

*Defined in [main/run.ts:26](https://github.com/cancerberoSgx/magica/blob/c127d55/src/main/run.ts#L26)*

Has a signature compatible with main, but if `script` is given instead of `command` option then it's
interpreted as a sequence of commands that are executed serially using [main](../interfaces/_imagemagick_magickloaded_.main.md#main)

The output files of command N are added as input files for command n+1 replacing files with the same name.
This way users can write script-like behavior for complex tasks that require more than one command to be
implemented.

Also it supports shell script comments (lines starting with `#` are ignored) and breaking a single command
in multiple lines using `\`.

See [RunOptions.script](../interfaces/_types_.runoptions.md#optional-script) option.

**Type parameters:**

▪ **T**: *[IFile](../interfaces/_types_.ifile.md)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *Promise‹[RunResult](../interfaces/_types_.runresult.md)‹T››*

the result of each command execution

___

###  runOne

▸ **runOne**(`script`: string, `input`: [File](../classes/_file_file_.file.md) | [File](../classes/_file_file_.file.md)[]): *Promise‹[IFile](../interfaces/_types_.ifile.md)›*

*Defined in [main/run.ts:111](https://github.com/cancerberoSgx/magica/blob/c127d55/src/main/run.ts#L111)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`script` | string | - |
`input` | [File](../classes/_file_file_.file.md) \| [File](../classes/_file_file_.file.md)[] |  [] |

**Returns:** *Promise‹[IFile](../interfaces/_types_.ifile.md)›*