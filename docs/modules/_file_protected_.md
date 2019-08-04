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

▸ **getProtectedFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *`Promise<object>`*

*Defined in [file/protected.ts:11](https://github.com/cancerberoSgx/magica/blob/0188ba1/src/file/protected.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *`Promise<object>`*

___

###  isProtectedFile

▸ **isProtectedFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *boolean*

*Defined in [file/protected.ts:18](https://github.com/cancerberoSgx/magica/blob/0188ba1/src/file/protected.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *boolean*

___

###  protectFile

▸ **protectFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *void*

*Defined in [file/protected.ts:7](https://github.com/cancerberoSgx/magica/blob/0188ba1/src/file/protected.ts#L7)*

If string is given is assumes as the path and must exists

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *void*