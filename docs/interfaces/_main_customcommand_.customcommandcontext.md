> **[magica](../README.md)**

[Globals](../README.md) / ["main/customCommand"](../modules/_main_customcommand_.md) / [CustomCommandContext](_main_customcommand_.customcommandcontext.md) /

# Interface: CustomCommandContext

In [run]'s [script] property, or in commands given to [main], lines starting with `!js:` are be evaluated as a JavaScript function that accept one parameter context which is an object containing utilities that can be used asynchronously. This interface describes such an object. The expression  `!js:` can be configured using [Options].

```js
result = await run({
 script: `
   convert rose: foo.gif
   !js: c=>c.pushStdout(FS.readdir('.').join(', '))
   !js: async c=> {const f = c.File.asFile(c.files[0]) ; c.pushStdout(JSON.stringify(await f.size())) }
 `
})
```

## Hierarchy

* **CustomCommandContext**

## Index

### Properties

* [FS](_main_customcommand_.customcommandcontext.md#fs)
* [File](_main_customcommand_.customcommandcontext.md#file)
* [files](_main_customcommand_.customcommandcontext.md#files)
* [main](_main_customcommand_.customcommandcontext.md#main)
* [options](_main_customcommand_.customcommandcontext.md#options)
* [run](_main_customcommand_.customcommandcontext.md#run)

### Methods

* [error](_main_customcommand_.customcommandcontext.md#error)
* [isDirectory](_main_customcommand_.customcommandcontext.md#isdirectory)
* [isFile](_main_customcommand_.customcommandcontext.md#isfile)
* [log](_main_customcommand_.customcommandcontext.md#log)
* [readFile](_main_customcommand_.customcommandcontext.md#readfile)
* [writeFile](_main_customcommand_.customcommandcontext.md#writefile)

## Properties

###  FS

• **FS**: *[FS](_file_emscriptenfs_.fs.md)*

*Defined in [main/customCommand.ts:29](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L29)*

___

###  File

• **File**: *[File](../classes/_file_file_.file.md)*

*Defined in [main/customCommand.ts:34](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L34)*

___

###  files

• **files**: *[File](../classes/_file_file_.file.md)[]*

*Defined in [main/customCommand.ts:31](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L31)*

___

###  main

• **main**: *[main](../modules/_main_main_.md#main)*

*Defined in [main/customCommand.ts:40](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L40)*

___

###  options

• **options**: *`Partial<Options>`*

*Defined in [main/customCommand.ts:30](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L30)*

___

###  run

• **run**: *[run](../modules/_main_run_.md#run)*

*Defined in [main/customCommand.ts:39](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L39)*

## Methods

###  error

▸ **error**(...`s`: string[]): *void*

*Defined in [main/customCommand.ts:33](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`...s` | string[] |

**Returns:** *void*

___

###  isDirectory

▸ **isDirectory**(`f`: string): *boolean*

*Defined in [main/customCommand.ts:38](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`f`: string): *boolean*

*Defined in [main/customCommand.ts:36](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *boolean*

___

###  log

▸ **log**(...`s`: string[]): *void*

*Defined in [main/customCommand.ts:32](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`...s` | string[] |

**Returns:** *void*

___

###  readFile

▸ **readFile**(`f`: string): *[File](../classes/_file_file_.file.md)*

*Defined in [main/customCommand.ts:37](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *[File](../classes/_file_file_.file.md)*

___

###  writeFile

▸ **writeFile**(`f`: [File](../classes/_file_file_.file.md)): *void*

*Defined in [main/customCommand.ts:35](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/main/customCommand.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [File](../classes/_file_file_.file.md) |

**Returns:** *void*