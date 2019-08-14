> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageUtil"](_image_imageutil_.md) /

# External module: "image/imageUtil"

## Index

### Functions

* [colorCount](_image_imageutil_.md#colorcount)
* [coordsToIndex](_image_imageutil_.md#coordstoindex)
* [getPixels](_image_imageutil_.md#getpixels)
* [getRgbaPixel](_image_imageutil_.md#getrgbapixel)
* [imagePixelColor](_image_imageutil_.md#imagepixelcolor)
* [isRgbaImage](_image_imageutil_.md#isrgbaimage)
* [parseConvertVerbose](_image_imageutil_.md#parseconvertverbose)
* [rgbaToString](_image_imageutil_.md#rgbatostring)

## Functions

###  colorCount

▸ **colorCount**(`img`: [IFile](../interfaces/_types_.ifile.md) | undefined): *`Promise<number | undefined>`*

*Defined in [image/imageUtil.ts:60](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | [IFile](../interfaces/_types_.ifile.md) \| undefined |

**Returns:** *`Promise<number | undefined>`*

___

###  coordsToIndex

▸ **coordsToIndex**(`width`: number, `x`: number, `y`: number): *number*

*Defined in [image/imageUtil.ts:19](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`x` | number |
`y` | number |

**Returns:** *number*

___

###  getPixels

▸ **getPixels**(`f`: [File](../classes/_file_file_.file.md)): *`Promise<Rgba[]>`*

*Defined in [image/imageUtil.ts:22](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [File](../classes/_file_file_.file.md) |

**Returns:** *`Promise<Rgba[]>`*

___

###  getRgbaPixel

▸ **getRgbaPixel**(`f`: [File](../classes/_file_file_.file.md), `x`: number, `y`: number): *[Rgba](../interfaces/_types_.rgba.md)*

*Defined in [image/imageUtil.ts:9](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L9)*

Returns given rgba image x,y pixel. If the image is not rgba the behavior is undefined.

**Parameters:**

Name | Type |
------ | ------ |
`f` | [File](../classes/_file_file_.file.md) |
`x` | number |
`y` | number |

**Returns:** *[Rgba](../interfaces/_types_.rgba.md)*

___

###  imagePixelColor

▸ **imagePixelColor**(`img`: [IFile](../interfaces/_types_.ifile.md) | undefined, `x`: number, `y`: number): *`Promise<string | undefined>`*

*Defined in [image/imageUtil.ts:37](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`img` | [IFile](../interfaces/_types_.ifile.md) \| undefined |
`x` | number |
`y` | number |

**Returns:** *`Promise<string | undefined>`*

___

###  isRgbaImage

▸ **isRgbaImage**(`f`: [File](../classes/_file_file_.file.md)): *undefined | false | true | `0`*

*Defined in [image/imageUtil.ts:56](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [File](../classes/_file_file_.file.md) |

**Returns:** *undefined | false | true | `0`*

___

###  parseConvertVerbose

▸ **parseConvertVerbose**(`stdout`: string[]): *object[]*

*Defined in [image/imageUtil.ts:67](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`stdout` | string[] |

**Returns:** *object[]*

___

###  rgbaToString

▸ **rgbaToString**(`c`: [Rgba](../interfaces/_types_.rgba.md)): *string*

*Defined in [image/imageUtil.ts:52](https://github.com/cancerberoSgx/magica/blob/c6ded1a/src/image/imageUtil.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`c` | [Rgba](../interfaces/_types_.rgba.md) |

**Returns:** *string*