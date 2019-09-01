**[magica](../README.md)**

[Globals](../README.md) › ["file/file"](../modules/_file_file_.md) › [File](_file_file_.file.md)

# Class: File

Default File implementation with utilities for creating from file system or urls.

Also instances have utilities to cache and get image information like size, mimeType, image comparison,
interacting with HTML DOM, etc.

## Hierarchy

* **File**

## Implements

* [IFile](../interfaces/_types_.ifile.md)

## Index

### Constructors

* [constructor](_file_file_.file.md#constructor)

### Properties

* [_info](_file_file_.file.md#protected-_info)
* [_pixels](_file_file_.file.md#protected-optional-_pixels)
* [content](_file_file_.file.md#content)
* [height](_file_file_.file.md#optional-height)
* [name](_file_file_.file.md#name)
* [url](_file_file_.file.md#optional-url)
* [width](_file_file_.file.md#optional-width)

### Methods

* [asBase64](_file_file_.file.md#asbase64)
* [asDataUrl](_file_file_.file.md#asdataurl)
* [asHTMLImageData](_file_file_.file.md#ashtmlimagedata)
* [asRGBAImageData](_file_file_.file.md#asrgbaimagedata)
* [equals](_file_file_.file.md#equals)
* [info](_file_file_.file.md#info)
* [infoOne](_file_file_.file.md#infoone)
* [mimeType](_file_file_.file.md#mimetype)
* [pixel](_file_file_.file.md#pixel)
* [pixelCalculate](_file_file_.file.md#pixelcalculate)
* [rgba](_file_file_.file.md#rgba)
* [size](_file_file_.file.md#size)
* [sizeDepthArgs](_file_file_.file.md#sizedepthargs)
* [widthXHeight](_file_file_.file.md#widthxheight)
* [asFile](_file_file_.file.md#static-asfile)
* [asPath](_file_file_.file.md#static-aspath)
* [asString](_file_file_.file.md#static-asstring)
* [equals](_file_file_.file.md#static-equals)
* [fileExists](_file_file_.file.md#static-fileexists)
* [fromBase64](_file_file_.file.md#static-frombase64)
* [fromDataUrl](_file_file_.file.md#static-fromdataurl)
* [fromFile](_file_file_.file.md#static-fromfile)
* [fromHTMLImageData](_file_file_.file.md#static-fromhtmlimagedata)
* [fromHtmlFileInputElement](_file_file_.file.md#static-fromhtmlfileinputelement)
* [fromRGBAImageData](_file_file_.file.md#static-fromrgbaimagedata)
* [fromUrl](_file_file_.file.md#static-fromurl)
* [getSizeDepthArgs](_file_file_.file.md#static-getsizedepthargs)
* [isFile](_file_file_.file.md#static-isfile)
* [resolve](_file_file_.file.md#static-resolve)
* [resolveOne](_file_file_.file.md#static-resolveone)
* [toBase64](_file_file_.file.md#static-tobase64)
* [toDataUrl](_file_file_.file.md#static-todataurl)

## Constructors

###  constructor

\+ **new File**(`name`: string, `content`: ArrayBufferView, `isProtected`: boolean, `url?`: undefined | string, `width?`: undefined | number, `height?`: undefined | number): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:36](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`content` | ArrayBufferView | - |
`isProtected` | boolean | false |
`url?` | undefined \| string | - |
`width?` | undefined \| number | - |
`height?` | undefined \| number | - |

**Returns:** *[File](_file_file_.file.md)*

## Properties

### `Protected` _info

• **_info**: *[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)[] | undefined*

*Defined in [file/file.ts:35](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L35)*

___

### `Protected` `Optional` _pixels

• **_pixels**? : *[Rgba](../interfaces/_types_.rgba.md)[]*

*Defined in [file/file.ts:36](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L36)*

___

###  content

• **content**: *ArrayBufferView*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[content](../interfaces/_types_.ifile.md#content)*

*Defined in [file/file.ts:38](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L38)*

___

### `Optional` height

• **height**? : *undefined | number*

*Defined in [file/file.ts:34](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L34)*

Stores size for those image formats that don't store size information such as RGBA

___

###  name

• **name**: *string*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[name](../interfaces/_types_.ifile.md#name)*

*Defined in [file/file.ts:38](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L38)*

___

### `Optional` url

• **url**? : *undefined | string*

*Defined in [file/file.ts:26](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L26)*

___

### `Optional` width

• **width**? : *undefined | number*

*Defined in [file/file.ts:30](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L30)*

Stores size for those image formats that don't store size information such as RGBA

## Methods

###  asBase64

▸ **asBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:128](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L128)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

###  asDataUrl

▸ **asDataUrl**(`mime?`: undefined | string): *Promise‹string›*

*Defined in [file/file.ts:121](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L121)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`mime?` | undefined \| string |

**Returns:** *Promise‹string›*

___

###  asHTMLImageData

▸ **asHTMLImageData**(): *Promise‹ImageData›*

*Defined in [file/file.ts:141](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L141)*

**Returns:** *Promise‹ImageData›*

___

###  asRGBAImageData

▸ **asRGBAImageData**(): *Promise‹RGBAImageData›*

*Defined in [file/file.ts:146](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L146)*

**Returns:** *Promise‹RGBAImageData›*

___

###  equals

▸ **equals**(`file?`: [File](_file_file_.file.md)): *Promise‹boolean›*

*Defined in [file/file.ts:135](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L135)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file?` | [File](_file_file_.file.md) |

**Returns:** *Promise‹boolean›*

___

###  info

▸ **info**(): *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)[]›*

*Defined in [file/file.ts:63](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L63)*

Get image information, like geometry, important numbers, mimeType, etc.
The first time it calls `identify` command, but then it will cache ths value.

**Returns:** *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)[]›*

___

###  infoOne

▸ **infoOne**(): *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)›*

*Defined in [file/file.ts:51](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L51)*

Same as [info] but returning only the first image's data.

**Returns:** *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)›*

___

###  mimeType

▸ **mimeType**(): *Promise‹string›*

*Defined in [file/file.ts:94](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L94)*

**Returns:** *Promise‹string›*

___

###  pixel

▸ **pixel**(`x`: number, `y`: number): *Promise‹string | undefined›*

*Defined in [file/file.ts:99](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Promise‹string | undefined›*

___

###  pixelCalculate

▸ **pixelCalculate**(): *Promise‹void›*

*Defined in [file/file.ts:114](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L114)*

it will compute all pixel colors so following [pixel] and [rgba] calls will be fast

**Returns:** *Promise‹void›*

___

###  rgba

▸ **rgba**(`x`: number, `y`: number): *Promise‹[Rgba](../interfaces/_types_.rgba.md) | undefined›*

*Defined in [file/file.ts:106](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Promise‹[Rgba](../interfaces/_types_.rgba.md) | undefined›*

___

###  size

▸ **size**(): *Promise‹[Size](../interfaces/_types_.size.md)›*

*Defined in [file/file.ts:76](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L76)*

**Returns:** *Promise‹[Size](../interfaces/_types_.size.md)›*

___

###  sizeDepthArgs

▸ **sizeDepthArgs**(`onlyIfRGBA`: boolean): *Promise‹string›*

*Defined in [file/file.ts:158](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L158)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`onlyIfRGBA` | boolean | true |

**Returns:** *Promise‹string›*

___

###  widthXHeight

▸ **widthXHeight**(): *Promise‹string›*

*Defined in [file/file.ts:86](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L86)*

**Returns:** *Promise‹string›*

___

### `Static` asFile

▸ **asFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:274](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L274)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` asPath

▸ **asPath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:278](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L278)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

### `Static` asString

▸ **asString**(`f`: [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:204](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L204)*

Returns the file content as plain string. This is useful to read the content of a .json or .txt file
but not for images or other binary file content.

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

### `Static` equals

▸ **equals**(`a`: string | [IFile](../interfaces/_types_.ifile.md), `b`: string | [IFile](../interfaces/_types_.ifile.md)): *boolean*

*Defined in [file/file.ts:139](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | string \| [IFile](../interfaces/_types_.ifile.md) |
`b` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *boolean*

___

### `Static` fileExists

▸ **fileExists**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *Promise‹boolean›*

*Defined in [file/file.ts:290](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L290)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *Promise‹boolean›*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:218](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L218)*

Loads file from given base64 string.

**Parameters:**

Name | Type |
------ | ------ |
`base64` | string |
`name` | string |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromDataUrl

▸ **fromDataUrl**(`dataUrl`: string, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:225](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L225)*

Loads file from given data url string.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name` | string |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹undefined | [File](_file_file_.file.md)›*

*Defined in [file/file.ts:188](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L188)*

Creates a File from given file system path. Only Node.js.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  {} |

**Returns:** *Promise‹undefined | [File](_file_file_.file.md)›*

___

### `Static` fromHTMLImageData

▸ **fromHTMLImageData**(`d`: ImageData, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:286](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L286)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d` | ImageData | - |
`name` | string | "img.rgba" |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: HTMLInputElement): *Promise‹Array‹[File](_file_file_.file.md)››*

*Defined in [file/file.ts:232](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L232)*

Loads files from files in html input element of type "file".

**Parameters:**

Name | Type |
------ | ------ |
`el` | HTMLInputElement |

**Returns:** *Promise‹Array‹[File](_file_file_.file.md)››*

___

### `Static` fromRGBAImageData

▸ **fromRGBAImageData**(`d`: RGBAImageData, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:282](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L282)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d` | RGBAImageData | - |
`name` | string | "img.rgba" |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromUrl

▸ **fromUrl**(`url`: string, `o`: RequestInit & [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹undefined | [File](_file_file_.file.md)›*

*Defined in [file/file.ts:175](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L175)*

Creates a File from given url. In Node.js urls must be absolute!.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`o` | RequestInit & [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  {} |

**Returns:** *Promise‹undefined | [File](_file_file_.file.md)›*

___

### `Static` getSizeDepthArgs

▸ **getSizeDepthArgs**(`f`: [File](_file_file_.file.md), `onlyIfRGBA`: boolean): *Promise‹string›*

*Defined in [file/file.ts:161](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L161)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | [File](_file_file_.file.md) | - |
`onlyIfRGBA` | boolean | true |

**Returns:** *Promise‹string›*

___

### `Static` isFile

▸ **isFile**(`f`: any): *boolean*

*Defined in [file/file.ts:270](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L270)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | any |

**Returns:** *boolean*

___

### `Static` resolve

▸ **resolve**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹[File](_file_file_.file.md)[]›*

*Defined in [file/file.ts:251](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L251)*

Given paths, urls or files it will try to load them all and return a list of File for those succeed.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string \| [IFile](../interfaces/_types_.ifile.md) \| undefined \| undefined \| string \| [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  { protected: false } |

**Returns:** *Promise‹[File](_file_file_.file.md)[]›*

___

### `Static` resolveOne

▸ **resolveOne**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹undefined | [File](_file_file_.file.md)›*

*Defined in [file/file.ts:243](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L243)*

Shortcut for [resolve] that returns the first result.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string \| [IFile](../interfaces/_types_.ifile.md) \| undefined \| undefined \| string \| [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  { protected: false } |

**Returns:** *Promise‹undefined | [File](_file_file_.file.md)›*

___

### `Static` toBase64

▸ **toBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:211](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L211)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

### `Static` toDataUrl

▸ **toDataUrl**(`file`: [File](_file_file_.file.md), `mime?`: undefined | string): *Promise‹string›*

*Defined in [file/file.ts:168](https://github.com/cancerberoSgx/magica/blob/64330f2/src/file/file.ts#L168)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |
`mime?` | undefined \| string |

**Returns:** *Promise‹string›*