> **[magica](../README.md)**

[Globals](../README.md) / ["file/protected"](_file_protected_.md) /

# External module: "file/protected"

## Index

### Functions

* [getProtectedFile](_file_protected_.md#getprotectedfile)
* [isProtectedFile](_file_protected_.md#isprotectedfile)
* [protectFile](_file_protected_.md#protectfile)

## Functions

###  getProtectedFile

▸ **getProtectedFile**(`f`: string | [File](../classes/_file_file_.file.md)): *`Promise<object>`*

*Defined in [file/protected.ts:10](https://github.com/cancerberoSgx/magica/blob/1a62845/src/file/protected.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [File](../classes/_file_file_.file.md) |

**Returns:** *`Promise<object>`*

___

###  isProtectedFile

▸ **isProtectedFile**(`f`: string | [File](../classes/_file_file_.file.md)): *boolean*

*Defined in [file/protected.ts:17](https://github.com/cancerberoSgx/magica/blob/1a62845/src/file/protected.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [File](../classes/_file_file_.file.md) |

**Returns:** *boolean*

___

###  protectFile

▸ **protectFile**(`f`: string | [File](../classes/_file_file_.file.md)): *void*

*Defined in [file/protected.ts:6](https://github.com/cancerberoSgx/magica/blob/1a62845/src/file/protected.ts#L6)*

If string is given is assumes as the path and must exists

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [File](../classes/_file_file_.file.md) |

**Returns:** *void*