> **[magica](../README.md)**

[Globals](../README.md) / ["file/file"](../modules/_file_file_.md) / [File](_file_file_.file.md) /

# Class: File

## Hierarchy

* **File**

## Implements

* [IFile](../interfaces/_types_.ifile.md)

## Index

### Constructors

* [constructor](_file_file_.file.md#constructor)

### Properties

* [_info](_file_file_.file.md#protected-_info)
* [content](_file_file_.file.md#content)
* [name](_file_file_.file.md#name)

### Accessors

* [info](_file_file_.file.md#info)

### Methods

* [asBase64](_file_file_.file.md#asbase64)
* [asDataUrl](_file_file_.file.md#asdataurl)
* [getPixelColor](_file_file_.file.md#getpixelcolor)
* [asPath](_file_file_.file.md#static-aspath)
* [fromBase64](_file_file_.file.md#static-frombase64)
* [fromDataUrl](_file_file_.file.md#static-fromdataurl)
* [fromFile](_file_file_.file.md#static-fromfile)
* [fromHtmlFileInputElement](_file_file_.file.md#static-fromhtmlfileinputelement)
* [fromUrl](_file_file_.file.md#static-fromurl)
* [resolve](_file_file_.file.md#static-resolve)
* [resolveOptions](_file_file_.file.md#static-resolveoptions)
* [toBase64](_file_file_.file.md#static-tobase64)
* [toDataUrl](_file_file_.file.md#static-todataurl)
* [toString](_file_file_.file.md#static-tostring)

## Constructors

###  constructor

\+ **new File**(`name`: string, `content`: `ArrayBufferView` | `ArrayBuffer`): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:11](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`content` | `ArrayBufferView` \| `ArrayBuffer` |

**Returns:** *[File](_file_file_.file.md)*

## Properties

### `Protected` _info

• **_info**: *[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md) | undefined*

*Defined in [file/file.ts:17](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L17)*

___

###  content

• **content**: *`ArrayBufferView`*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[content](../interfaces/_types_.ifile.md#content)*

*Defined in [file/file.ts:11](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L11)*

___

###  name

• **name**: *string*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[name](../interfaces/_types_.ifile.md#name)*

*Defined in [file/file.ts:13](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L13)*

## Accessors

###  info

• **get info**(): *`Promise<ExtractInfoResultImage>`*

*Defined in [file/file.ts:22](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L22)*

Get image information, like geometry, important numbers, mimeType, etc. The first time it calls `identify` command, but then it will cache ths value.

**Returns:** *`Promise<ExtractInfoResultImage>`*

## Methods

###  asBase64

▸ **asBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:46](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L46)*

Returns base64 representation of this image in an ecoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

###  asDataUrl

▸ **asDataUrl**(`mime`: `String`): *`String`*

*Defined in [file/file.ts:41](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L41)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.
TODO: - [ ] asDataUrl / base64 - obtain mimetype with IM if user don't give.
- [ ] store file mimetype in property for future use.

**Parameters:**

Name | Type |
------ | ------ |
`mime` | `String` |

**Returns:** *`String`*

___

###  getPixelColor

▸ **getPixelColor**(`x`: number, `y`: number): *`Promise<string>`*

*Defined in [file/file.ts:33](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *`Promise<string>`*

___

### `Static` asPath

▸ **asPath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:129](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L129)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:92](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L92)*

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

*Defined in [file/file.ts:97](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L97)*

Loads file from given data url string.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name` | string |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: `O`): *`Promise<File>`*

*Defined in [file/file.ts:74](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L74)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | `O` |  {} |

**Returns:** *`Promise<File>`*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: `HTMLInputElement`): *`Promise<Array<File>>`*

*Defined in [file/file.ts:104](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L104)*

Loads files from files in html input element of type "file"

**Parameters:**

Name | Type |
------ | ------ |
`el` | `HTMLInputElement` |

**Returns:** *`Promise<Array<File>>`*

___

### `Static` fromUrl

▸ **fromUrl**(`u`: string, `o`: `RequestInit` & `O`): *`Promise<File>`*

*Defined in [file/file.ts:69](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L69)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`u` | string | - |
`o` | `RequestInit` & `O` |  {} |

**Returns:** *`Promise<File>`*

___

### `Static` resolve

▸ **resolve**(`path`: `String`): *`Promise<File | null>`*

*Defined in [file/file.ts:59](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L59)*

Given a filesystem path or a url it will first check if the file exists (if applies) , if so returning that file, or if not loading the file from url.

**Parameters:**

Name | Type |
------ | ------ |
`path` | `String` |

**Returns:** *`Promise<File | null>`*

___

### `Static` resolveOptions

▸ **resolveOptions**(`o`: `Partial<Options>`): *`Promise<IFile[]>`*

*Defined in [file/file.ts:112](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | `Partial<Options>` |

**Returns:** *`Promise<IFile[]>`*

___

### `Static` toBase64

▸ **toBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:87](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L87)*

Returns base64 representation of this image in an ecoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

### `Static` toDataUrl

▸ **toDataUrl**(`file`: [File](_file_file_.file.md), `mime`: `String`): *string*

*Defined in [file/file.ts:52](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L52)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.   * TODO: - [ ] asDataUrl / base64 - obtain mimetype with IM if user don't give.
- [ ] store file mimetype in property for future use.

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |
`mime` | `String` |

**Returns:** *string*

___

### `Static` toString

▸ **toString**(`f`: [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:81](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/file/file.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*