**[magica](../README.md)**

[Globals](../README.md) › ["imageMagick/magickLoaded"](_imagemagick_magickloaded_.md)

# External module: "imageMagick/magickLoaded"

## Index

### Interfaces

* [Main](../interfaces/_imagemagick_magickloaded_.main.md)

### Variables

* [magickLoaded](_imagemagick_magickloaded_.md#const-magickloaded)

### Functions

* [getFS](_imagemagick_magickloaded_.md#getfs)
* [getStderr](_imagemagick_magickloaded_.md#getstderr)
* [getStdout](_imagemagick_magickloaded_.md#getstdout)
* [moduleLocateFile](_imagemagick_magickloaded_.md#modulelocatefile)
* [pushStderr](_imagemagick_magickloaded_.md#pushstderr)
* [pushStdout](_imagemagick_magickloaded_.md#pushstdout)
* [resetStderr](_imagemagick_magickloaded_.md#resetstderr)
* [resetStdout](_imagemagick_magickloaded_.md#resetstdout)

## Variables

### `Const` magickLoaded

• **magickLoaded**: *Deferred‹[Main](../interfaces/_imagemagick_magickloaded_.main.md), any›* =  new Deferred<Main>()

*Defined in [imageMagick/magickLoaded.ts:16](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L16)*

## Functions

###  getFS

▸ **getFS**(): *[FS](../interfaces/_file_emscriptenfs_.fs.md)*

*Defined in [imageMagick/magickLoaded.ts:22](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L22)*

**Returns:** *[FS](../interfaces/_file_emscriptenfs_.fs.md)*

___

###  getStderr

▸ **getStderr**(): *string[]*

*Defined in [imageMagick/magickLoaded.ts:55](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L55)*

**Returns:** *string[]*

___

###  getStdout

▸ **getStdout**(): *string[]*

*Defined in [imageMagick/magickLoaded.ts:40](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L40)*

**Returns:** *string[]*

___

###  moduleLocateFile

▸ **moduleLocateFile**(`path`: string, `prefix`: string): *string*

*Defined in [imageMagick/magickLoaded.ts:61](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`prefix` | string |

**Returns:** *string*

___

###  pushStderr

▸ **pushStderr**(...`s`: string[]): *void*

*Defined in [imageMagick/magickLoaded.ts:46](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`...s` | string[] |

**Returns:** *void*

___

###  pushStdout

▸ **pushStdout**(...`s`: string[]): *void*

*Defined in [imageMagick/magickLoaded.ts:31](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`...s` | string[] |

**Returns:** *void*

___

###  resetStderr

▸ **resetStderr**(): *void*

*Defined in [imageMagick/magickLoaded.ts:51](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L51)*

**Returns:** *void*

___

###  resetStdout

▸ **resetStdout**(): *void*

*Defined in [imageMagick/magickLoaded.ts:36](https://github.com/cancerberoSgx/magica/blob/c127d55/src/imageMagick/magickLoaded.ts#L36)*

**Returns:** *void*