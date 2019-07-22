> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageInfo"](_image_imageinfo_.md) /

# External module: "image/imageInfo"

## Index

### Interfaces

* [ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)

### Functions

* [imageInfo](_image_imageinfo_.md#imageinfo)

## Functions

###  imageInfo

▸ **imageInfo**(`img`: [IFile](../interfaces/_types_.ifile.md) | string): *`Promise<ExtractInfoResult[]>`*

*Defined in [image/imageInfo.ts:9](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/image/imageInfo.ts#L9)*

Execute `convert $IMG info.json` to extract image metadata. Returns the parsed info.json file contents

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`img` | [IFile](../interfaces/_types_.ifile.md) \| string | could be a string in case you want to extract information of built in images like `rose:`  |

**Returns:** *`Promise<ExtractInfoResult[]>`*