[magica](../README.md) › ["file/file"](../modules/_file_file_.md) › [File](_file_file_.file.md)

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

* [asArrayBuffer](_file_file_.file.md#asarraybuffer)
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
* [fromArrayBuffer](_file_file_.file.md#static-fromarraybuffer)
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

*Defined in [file/file.ts:36](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L36)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`content` | ArrayBufferView | - |
`isProtected` | boolean | false |
`url?` | undefined &#124; string | - |
`width?` | undefined &#124; number | - |
`height?` | undefined &#124; number | - |

**Returns:** *[File](_file_file_.file.md)*

## Properties

### `Protected` _info

• **_info**: *[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)[] | undefined*

*Defined in [file/file.ts:35](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L35)*

___

### `Protected` `Optional` _pixels

• **_pixels**? : *[Rgba](../interfaces/_types_.rgba.md)[]*

*Defined in [file/file.ts:36](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L36)*

___

###  content

• **content**: *ArrayBufferView*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[content](../interfaces/_types_.ifile.md#content)*

*Defined in [file/file.ts:38](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L38)*

___

### `Optional` height

• **height**? : *undefined | number*

*Defined in [file/file.ts:34](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L34)*

Stores size for those image formats that don't store size information such as RGBA

___

###  name

• **name**: *string*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[name](../interfaces/_types_.ifile.md#name)*

*Defined in [file/file.ts:38](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L38)*

___

### `Optional` url

• **url**? : *undefined | string*

*Defined in [file/file.ts:26](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L26)*

___

### `Optional` width

• **width**? : *undefined | number*

*Defined in [file/file.ts:30](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L30)*

Stores size for those image formats that don't store size information such as RGBA

## Methods

###  asArrayBuffer

▸ **asArrayBuffer**(): *Promise‹ArrayBuffer | SharedArrayBuffer›*

*Defined in [file/file.ts:142](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L142)*

Returns base64 representation of this image in an encoded format like PNG

**Returns:** *Promise‹ArrayBuffer | SharedArrayBuffer›*

___

###  asBase64

▸ **asBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:128](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L128)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

###  asDataUrl

▸ **asDataUrl**(`mime?`: undefined | string): *Promise‹string›*

*Defined in [file/file.ts:121](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L121)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`mime?` | undefined &#124; string |

**Returns:** *Promise‹string›*

___

###  asHTMLImageData

▸ **asHTMLImageData**(): *Promise‹ImageData›*

*Defined in [file/file.ts:148](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L148)*

**Returns:** *Promise‹ImageData›*

___

###  asRGBAImageData

▸ **asRGBAImageData**(): *Promise‹RGBAImageData›*

*Defined in [file/file.ts:153](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L153)*

**Returns:** *Promise‹RGBAImageData›*

___

###  equals

▸ **equals**(`file?`: [File](_file_file_.file.md)): *Promise‹boolean›*

*Defined in [file/file.ts:135](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L135)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file?` | [File](_file_file_.file.md) |

**Returns:** *Promise‹boolean›*

___

###  info

▸ **info**(): *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)[]›*

*Defined in [file/file.ts:63](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L63)*

Get image information, like geometry, important numbers, mimeType, etc.
The first time it calls `identify` command, but then it will cache ths value.

**Returns:** *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)[]›*

___

###  infoOne

▸ **infoOne**(): *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)›*

*Defined in [file/file.ts:51](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L51)*

Same as [info] but returning only the first image's data.

**Returns:** *Promise‹[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md)›*

___

###  mimeType

▸ **mimeType**(): *Promise‹string›*

*Defined in [file/file.ts:94](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L94)*

**Returns:** *Promise‹string›*

___

###  pixel

▸ **pixel**(`x`: number, `y`: number): *Promise‹string | undefined›*

*Defined in [file/file.ts:99](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Promise‹string | undefined›*

___

###  pixelCalculate

▸ **pixelCalculate**(): *Promise‹void›*

*Defined in [file/file.ts:114](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L114)*

it will compute all pixel colors so following [pixel] and [rgba] calls will be fast

**Returns:** *Promise‹void›*

___

###  rgba

▸ **rgba**(`x`: number, `y`: number): *Promise‹[Rgba](../interfaces/_types_.rgba.md) | undefined›*

*Defined in [file/file.ts:106](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *Promise‹[Rgba](../interfaces/_types_.rgba.md) | undefined›*

___

###  size

▸ **size**(): *Promise‹[Size](../interfaces/_types_.size.md)›*

*Defined in [file/file.ts:76](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L76)*

**Returns:** *Promise‹[Size](../interfaces/_types_.size.md)›*

___

###  sizeDepthArgs

▸ **sizeDepthArgs**(`onlyIfRGBA`: boolean): *Promise‹string›*

*Defined in [file/file.ts:168](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L168)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`onlyIfRGBA` | boolean | true |

**Returns:** *Promise‹string›*

___

###  widthXHeight

▸ **widthXHeight**(): *Promise‹string›*

*Defined in [file/file.ts:86](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L86)*

**Returns:** *Promise‹string›*

___

### `Static` asFile

▸ **asFile**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:296](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L296)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string &#124; [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` asPath

▸ **asPath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:300](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L300)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string &#124; [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

### `Static` asString

▸ **asString**(`f`: [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:226](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L226)*

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

*Defined in [file/file.ts:146](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | string &#124; [IFile](../interfaces/_types_.ifile.md) |
`b` | string &#124; [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *boolean*

___

### `Static` fileExists

▸ **fileExists**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *Promise‹boolean›*

*Defined in [file/file.ts:312](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L312)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string &#124; [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *Promise‹boolean›*

___

### `Static` fromArrayBuffer

▸ **fromArrayBuffer**(`b`: ArrayBuffer, `o`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹[File](_file_file_.file.md)›*

*Defined in [file/file.ts:198](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L198)*

Creates a File from given ArrayBuffer.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`b` | ArrayBuffer | - |
`o` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  {} |

**Returns:** *Promise‹[File](_file_file_.file.md)›*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:240](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L240)*

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

*Defined in [file/file.ts:247](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L247)*

Loads file from given data url string.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name` | string |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *undefined | [File](_file_file_.file.md)*

*Defined in [file/file.ts:210](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L210)*

Creates a File from given file system path. Only Node.js.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  {} |

**Returns:** *undefined | [File](_file_file_.file.md)*

___

### `Static` fromHTMLImageData

▸ **fromHTMLImageData**(`d`: ImageData, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:308](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L308)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d` | ImageData | - |
`name` | string | "img.rgba" |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: HTMLInputElement): *Promise‹Array‹[File](_file_file_.file.md)››*

*Defined in [file/file.ts:254](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L254)*

Loads files from files in html input element of type "file".

**Parameters:**

Name | Type |
------ | ------ |
`el` | HTMLInputElement |

**Returns:** *Promise‹Array‹[File](_file_file_.file.md)››*

___

### `Static` fromRGBAImageData

▸ **fromRGBAImageData**(`d`: RGBAImageData, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:304](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L304)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`d` | RGBAImageData | - |
`name` | string | "img.rgba" |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromUrl

▸ **fromUrl**(`url`: string, `o`: RequestInit & [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹undefined | [File](_file_file_.file.md)›*

*Defined in [file/file.ts:185](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L185)*

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

*Defined in [file/file.ts:171](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L171)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | [File](_file_file_.file.md) | - |
`onlyIfRGBA` | boolean | true |

**Returns:** *Promise‹string›*

___

### `Static` isFile

▸ **isFile**(`f`: any): *boolean*

*Defined in [file/file.ts:292](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L292)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | any |

**Returns:** *boolean*

___

### `Static` resolve

▸ **resolve**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹[File](_file_file_.file.md)[]›*

*Defined in [file/file.ts:273](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L273)*

Given paths, urls or files it will try to load them all and return a list of File for those succeed.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string &#124; [IFile](../interfaces/_types_.ifile.md) &#124; undefined &#124; undefined &#124; string &#124; [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  { protected: false } |

**Returns:** *Promise‹[File](_file_file_.file.md)[]›*

___

### `Static` resolveOne

▸ **resolveOne**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *Promise‹undefined | [File](_file_file_.file.md)›*

*Defined in [file/file.ts:265](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L265)*

Shortcut for [resolve] that returns the first result.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string &#124; [IFile](../interfaces/_types_.ifile.md) &#124; undefined &#124; undefined &#124; string &#124; [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  { protected: false } |

**Returns:** *Promise‹undefined | [File](_file_file_.file.md)›*

___

### `Static` toBase64

▸ **toBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:233](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L233)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

### `Static` toDataUrl

▸ **toDataUrl**(`file`: [File](_file_file_.file.md), `mime?`: undefined | string): *Promise‹string›*

*Defined in [file/file.ts:178](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/file.ts#L178)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |
`mime?` | undefined &#124; string |

**Returns:** *Promise‹string›*
