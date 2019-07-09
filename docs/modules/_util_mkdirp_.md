> **[magica](../README.md)**

[Globals](../README.md) / ["util/mkdirp"](_util_mkdirp_.md) /

# External module: "util/mkdirp"

### Index

#### Functions

* [makeDirRecursive](_util_mkdirp_.md#makedirrecursive)
* [mkdirp](_util_mkdirp_.md#mkdirp)

## Functions

###  makeDirRecursive

▸ **makeDirRecursive**(`p`: string, `FS`: [FS](../interfaces/_emscriptenfs_.fs.md)): *void*

*Defined in [util/mkdirp.ts:18](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/util/mkdirp.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | string |
`FS` | [FS](../interfaces/_emscriptenfs_.fs.md) |

**Returns:** *void*

___

###  mkdirp

▸ **mkdirp**(`path`: string, `exists`: function, `mkdir`: function): *void*

*Defined in [util/mkdirp.ts:3](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/util/mkdirp.ts#L3)*

**Parameters:**

▪ **path**: *string*

▪ **exists**: *function*

▸ (`f`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

▪ **mkdir**: *function*

▸ (`f`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *void*