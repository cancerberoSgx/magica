> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageInfo"](_image_imageinfo_.md) /

# External module: "image/imageInfo"

## Index

### Functions

* [imageInfo](_image_imageinfo_.md#imageinfo)

## Functions

###  imageInfo

▸ **imageInfo**(`img`: [File](../classes/_file_file_.file.md) | string): *`Promise<ExtractInfoResult[]>`*

*Defined in [image/imageInfo.ts:9](https://github.com/cancerberoSgx/magica/blob/1a62845/src/image/imageInfo.ts#L9)*

Execute `convert $IMG info.json` to extract image metadata. Returns the parsed info.json file contents

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`img` | [File](../classes/_file_file_.file.md) \| string | could be a string in case you want to extract information of built in images like `rose:`  |

**Returns:** *`Promise<ExtractInfoResult[]>`*