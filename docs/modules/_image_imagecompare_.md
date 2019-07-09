> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageCompare"](_image_imagecompare_.md) /

# External module: "image/imageCompare"

### Index

#### Functions

* [imageCompare](_image_imagecompare_.md#imagecompare)

## Functions

###  imageCompare

▸ **imageCompare**(`img1`: [File](../classes/_file_.file.md), `img2`: [File](../classes/_file_.file.md), `fuzz`: number): *`Promise<boolean>`*

*Defined in [image/imageCompare.ts:7](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/image/imageCompare.ts#L7)*

Compare the two images and return true if they are equal visually. Optionally, a margin of error can be provided using `fuzz`

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`img1` | [File](../classes/_file_.file.md) | - |
`img2` | [File](../classes/_file_.file.md) | - |
`fuzz` | number | 0.015 |

**Returns:** *`Promise<boolean>`*