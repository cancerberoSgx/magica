> **[magica](../README.md)**

[Globals](../README.md) / ["util/lsR"](_util_lsr_.md) /

# External module: "util/lsR"

## Index

### Interfaces

* [LsRVisitorFile](../interfaces/_util_lsr_.lsrvisitorfile.md)

### Functions

* [listFilesRecursively](_util_lsr_.md#listfilesrecursively)
* [ls](_util_lsr_.md#ls)
* [lsR](_util_lsr_.md#lsr)

## Functions

###  listFilesRecursively

▸ **listFilesRecursively**(`path`: string, `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *[LsRVisitorFile](../interfaces/_util_lsr_.lsrvisitorfile.md)[]*

*Defined in [util/lsR.ts:57](https://github.com/cancerberoSgx/magica/blob/0c53937/src/util/lsR.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |

**Returns:** *[LsRVisitorFile](../interfaces/_util_lsr_.lsrvisitorfile.md)[]*

___

###  ls

▸ **ls**(`p`: string, `FS`: [FS](../interfaces/_file_emscriptenfs_.fs.md)): *string[]*

*Defined in [util/lsR.ts:66](https://github.com/cancerberoSgx/magica/blob/0c53937/src/util/lsR.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | string |
`FS` | [FS](../interfaces/_file_emscriptenfs_.fs.md) |

**Returns:** *string[]*

___

###  lsR

▸ **lsR**(`o`: `Options`): *[LsRVisitorFile](../interfaces/_util_lsr_.lsrvisitorfile.md)[]*

*Defined in [util/lsR.ts:32](https://github.com/cancerberoSgx/magica/blob/0c53937/src/util/lsR.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | `Options` |

**Returns:** *[LsRVisitorFile](../interfaces/_util_lsr_.lsrvisitorfile.md)[]*