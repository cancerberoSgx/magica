[magica](../README.md) › ["imageMagick/magickLoaded"](_imagemagick_magickloaded_.md)

# External module: "imageMagick/magickLoaded"

## Index

### Interfaces

* [Main](../interfaces/_imagemagick_magickloaded_.main.md)

### Variables

* [magickLoaded](_imagemagick_magickloaded_.md#const-magickloaded)

### Functions

* [getFS](_imagemagick_magickloaded_.md#getfs)
* [getMagick](_imagemagick_magickloaded_.md#getmagick)
* [getMain](_imagemagick_magickloaded_.md#getmain)
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

*Defined in [imageMagick/magickLoaded.ts:17](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L17)*

## Functions

###  getFS

▸ **getFS**(): *[FS](../interfaces/_file_emscriptenfs_.fs.md)*

*Defined in [imageMagick/magickLoaded.ts:31](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L31)*

**Returns:** *[FS](../interfaces/_file_emscriptenfs_.fs.md)*

___

###  getMagick

▸ **getMagick**(): *object*

*Defined in [imageMagick/magickLoaded.ts:24](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L24)*

**Returns:** *object*

___

###  getMain

▸ **getMain**(): *function*

*Defined in [imageMagick/magickLoaded.ts:38](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L38)*

**Returns:** *function*

▸ (`args`: string[]): *[NativeResult](../interfaces/_imagemagick_createmain_.nativeresult.md)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | string[] |

___

###  getStderr

▸ **getStderr**(): *string[]*

*Defined in [imageMagick/magickLoaded.ts:71](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L71)*

**Returns:** *string[]*

___

###  getStdout

▸ **getStdout**(): *string[]*

*Defined in [imageMagick/magickLoaded.ts:56](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L56)*

**Returns:** *string[]*

___

###  moduleLocateFile

▸ **moduleLocateFile**(`path`: string, `prefix`: string): *string*

*Defined in [imageMagick/magickLoaded.ts:77](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`prefix` | string |

**Returns:** *string*

___

###  pushStderr

▸ **pushStderr**(...`s`: string[]): *void*

*Defined in [imageMagick/magickLoaded.ts:62](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`...s` | string[] |

**Returns:** *void*

___

###  pushStdout

▸ **pushStdout**(...`s`: string[]): *void*

*Defined in [imageMagick/magickLoaded.ts:47](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`...s` | string[] |

**Returns:** *void*

___

###  resetStderr

▸ **resetStderr**(): *void*

*Defined in [imageMagick/magickLoaded.ts:67](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L67)*

**Returns:** *void*

___

###  resetStdout

▸ **resetStdout**(): *void*

*Defined in [imageMagick/magickLoaded.ts:52](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/imageMagick/magickLoaded.ts#L52)*

**Returns:** *void*
