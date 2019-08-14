> **[magica](../README.md)**

[Globals](../README.md) / ["util/fileUtil"](_util_fileutil_.md) /

# External module: "util/fileUtil"

## Index

### Functions

* [getFileName](_util_fileutil_.md#getfilename)
* [getFilePath](_util_fileutil_.md#getfilepath)
* [isDir](_util_fileutil_.md#isdir)
* [isFile](_util_fileutil_.md#isfile)
* [readFile](_util_fileutil_.md#readfile)
* [writeFile](_util_fileutil_.md#writefile)

## Functions

###  getFileName

▸ **getFileName**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [util/fileUtil.ts:13](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/util/fileUtil.ts#L13)*

Returns file name / path of given file relative to emscripten FS root  (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

###  getFilePath

▸ **getFilePath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [util/fileUtil.ts:22](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/util/fileUtil.ts#L22)*

Returns absolute path of given file (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

###  isDir

▸ **isDir**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *boolean*

*Defined in [util/fileUtil.ts:32](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/util/fileUtil.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *boolean*

*Defined in [util/fileUtil.ts:40](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/util/fileUtil.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |

**Returns:** *boolean*

___

###  readFile

▸ **readFile**(`f`: string, `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *[File](../classes/_file_file_.file.md)*

*Defined in [util/fileUtil.ts:6](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/util/fileUtil.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |

**Returns:** *[File](../classes/_file_file_.file.md)*

___

###  writeFile

▸ **writeFile**(`f`: [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *void*

*Defined in [util/fileUtil.ts:28](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/util/fileUtil.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |

**Returns:** *void*