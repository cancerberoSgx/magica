> **[magica](../README.md)**

[Globals](../README.md) / ["util/base64"](_util_base64_.md) /

# External module: "util/base64"

## Index

### Functions

* [arrayBufferToBase64](_util_base64_.md#arraybuffertobase64)
* [base64ToUrl](_util_base64_.md#base64tourl)
* [dataToBase64](_util_base64_.md#datatobase64)
* [dataToUrl](_util_base64_.md#datatourl)
* [getDataUrlFileName](_util_base64_.md#getdataurlfilename)
* [isBase64](_util_base64_.md#isbase64)
* [urlToBase64](_util_base64_.md#urltobase64)
* [urlToData](_util_base64_.md#urltodata)

## Functions

###  arrayBufferToBase64

▸ **arrayBufferToBase64**(`buffer`: `ArrayBuffer`): *string*

*Defined in [util/base64.ts:45](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | `ArrayBuffer` |

**Returns:** *string*

___

###  base64ToUrl

▸ **base64ToUrl**(`base64`: string, `mimeType`: string, `fileName?`: undefined | string): *string*

*Defined in [util/base64.ts:14](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L14)*

Creates a DataUrl like `data:image/jpeg;name=hindenburg.jpg;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`base64` | string |
`mimeType` | string |
`fileName?` | undefined \| string |

**Returns:** *string*

___

###  dataToBase64

▸ **dataToBase64**(`data`: string): *string*

*Defined in [util/base64.ts:7](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |

**Returns:** *string*

___

###  dataToUrl

▸ **dataToUrl**(`data`: string, `mimeType`: string, `fileName?`: undefined | string): *string*

*Defined in [util/base64.ts:3](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string |
`mimeType` | string |
`fileName?` | undefined \| string |

**Returns:** *string*

___

###  getDataUrlFileName

▸ **getDataUrlFileName**(`url`: string): *string*

*Defined in [util/base64.ts:38](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L38)*

Extracts the name of a data url like `data:image/jpeg;name=hindenburg.jpg;base64,`..., if any.

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  isBase64

▸ **isBase64**(`str`: string): *boolean*

*Defined in [util/base64.ts:26](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *boolean*

___

###  urlToBase64

▸ **urlToBase64**(`s`: string): *string*

*Defined in [util/base64.ts:18](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *string*

___

###  urlToData

▸ **urlToData**(`s`: string): *string*

*Defined in [util/base64.ts:22](https://github.com/cancerberoSgx/magica/blob/1131304/src/util/base64.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *string*