> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageCompare"](_image_imagecompare_.md) /

# External module: "image/imageCompare"

## Index

### Functions

* [imageCompare](_image_imagecompare_.md#imagecompare)

## Functions

###  imageCompare

▸ **imageCompare**(`img1?`: [IFile](../interfaces/_types_.ifile.md), `img2?`: [IFile](../interfaces/_types_.ifile.md), `fuzz`: number): *`Promise<boolean>`*

*Defined in [image/imageCompare.ts:8](https://github.com/cancerberoSgx/magica/blob/1131304/src/image/imageCompare.ts#L8)*

Compare the two images and return true if they are equal visually. Optionally, a margin of error can be provided using `fuzz`

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`img1?` | [IFile](../interfaces/_types_.ifile.md) | - |
`img2?` | [IFile](../interfaces/_types_.ifile.md) | - |
`fuzz` | number | 0.015 |

**Returns:** *`Promise<boolean>`*