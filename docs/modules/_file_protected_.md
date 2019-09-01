**[magica](../README.md)**

[Globals](../README.md) › ["file/protected"](_file_protected_.md)

# External module: "file/protected"

## Index

### Functions

* [isProtectedFile](_file_protected_.md#isprotectedfile)
* [protectFile](_file_protected_.md#protectfile)

## Functions

###  isProtectedFile

▸ **isProtectedFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *boolean*

*Defined in [file/protected.ts:13](https://github.com/cancerberoSgx/magica/blob/06c5192/src/file/protected.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *boolean*

___

###  protectFile

▸ **protectFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md), `protect`: boolean): *void*

*Defined in [file/protected.ts:7](https://github.com/cancerberoSgx/magica/blob/06c5192/src/file/protected.ts#L7)*

If string is given is assumes as the path and must exists

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) | - |
`protect` | boolean | true |

**Returns:** *void*