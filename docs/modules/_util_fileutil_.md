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
* [removeFile](_util_fileutil_.md#removefile)
* [writeFile](_util_fileutil_.md#writefile)

## Functions

###  getFileName

▸ **getFileName**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [util/fileUtil.ts:16](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L16)*

Returns file name / path of given file relative to emscripten FS root  (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

###  getFilePath

▸ **getFilePath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [util/fileUtil.ts:25](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L25)*

Returns absolute path of given file (in the context of emscripten FS)

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

###  isDir

▸ **isDir**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *boolean*

*Defined in [util/fileUtil.ts:39](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L39)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) | - |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |  getFS() |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *boolean*

*Defined in [util/fileUtil.ts:47](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L47)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) | - |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |  getFS() |

**Returns:** *boolean*

___

###  readFile

▸ **readFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *[File](../classes/_file_file_.file.md)*

*Defined in [util/fileUtil.ts:9](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L9)*

if given a file it ignores its contents and alwasys read again from FS

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) | - |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |  getFS() |

**Returns:** *[File](../classes/_file_file_.file.md)*

___

###  removeFile

▸ **removeFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *void*

*Defined in [util/fileUtil.ts:35](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L35)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) | - |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |  getFS() |

**Returns:** *void*

___

###  writeFile

▸ **writeFile**(`f`: [IFile](../interfaces/_types_.ifile.md), `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *void*

*Defined in [util/fileUtil.ts:31](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/util/fileUtil.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) | - |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |  getFS() |

**Returns:** *void*