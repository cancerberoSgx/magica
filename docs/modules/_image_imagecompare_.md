> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageCompare"](_image_imagecompare_.md) /

# External module: "image/imageCompare"

## Index

### Functions

* [imageCompare](_image_imagecompare_.md#imagecompare)
* [imageCompareNumber](_image_imagecompare_.md#imagecomparenumber)

## Functions

###  imageCompare

▸ **imageCompare**(`img1?`: [IFile](../interfaces/_types_.ifile.md), `img2?`: [IFile](../interfaces/_types_.ifile.md), `fuzz`: number): *`Promise<boolean>`*

*Defined in [image/imageCompare.ts:8](https://github.com/cancerberoSgx/magica/blob/30321a6/src/image/imageCompare.ts#L8)*

Compare the two images and return true if they are equal visually. Optionally, a margin of error can be provided using `fuzz`

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`img1?` | [IFile](../interfaces/_types_.ifile.md) | - |
`img2?` | [IFile](../interfaces/_types_.ifile.md) | - |
`fuzz` | number | 0.015 |

**Returns:** *`Promise<boolean>`*

___

###  imageCompareNumber

▸ **imageCompareNumber**(`img1`: [IFile](../interfaces/_types_.ifile.md), `img2`: [IFile](../interfaces/_types_.ifile.md)): *`Promise<number>`*

*Defined in [image/imageCompare.ts:16](https://github.com/cancerberoSgx/magica/blob/30321a6/src/image/imageCompare.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`img1` | [IFile](../interfaces/_types_.ifile.md) |
`img2` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *`Promise<number>`*