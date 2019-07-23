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
* [flags](_file_file_.file.md#protected-flags)
* [name](_file_file_.file.md#name)

### Methods

* [asBase64](_file_file_.file.md#asbase64)
* [asDataUrl](_file_file_.file.md#asdataurl)
* [info](_file_file_.file.md#info)
* [pixel](_file_file_.file.md#pixel)
* [size](_file_file_.file.md#size)
* [asFile](_file_file_.file.md#static-asfile)
* [asPath](_file_file_.file.md#static-aspath)
* [fromBase64](_file_file_.file.md#static-frombase64)
* [fromDataUrl](_file_file_.file.md#static-fromdataurl)
* [fromFile](_file_file_.file.md#static-fromfile)
* [fromHtmlFileInputElement](_file_file_.file.md#static-fromhtmlfileinputelement)
* [fromUrl](_file_file_.file.md#static-fromurl)
* [isFile](_file_file_.file.md#static-isfile)
* [resolve](_file_file_.file.md#static-resolve)
* [toBase64](_file_file_.file.md#static-tobase64)
* [toDataUrl](_file_file_.file.md#static-todataurl)
* [toString](_file_file_.file.md#static-tostring)

## Constructors

###  constructor

\+ **new File**(`name`: string, `content`: `ArrayBufferView` | `ArrayBuffer`, `flags`: `FileFlag`[]): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:17](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L17)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`content` | `ArrayBufferView` \| `ArrayBuffer` | - |
`flags` | `FileFlag`[] |  [] |

**Returns:** *[File](_file_file_.file.md)*

## Properties

### `Protected` _info

• **_info**: *[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md) | undefined*

*Defined in [file/file.ts:27](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L27)*

___

###  content

• **content**: *`ArrayBufferView`*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[content](../interfaces/_types_.ifile.md#content)*

*Defined in [file/file.ts:15](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L15)*

___

### `Protected` flags

• **flags**: *`FileFlag`[]* =  []

*Defined in [file/file.ts:17](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L17)*

___

###  name

• **name**: *string*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[name](../interfaces/_types_.ifile.md#name)*

*Defined in [file/file.ts:19](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L19)*

## Methods

###  asBase64

▸ **asBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:63](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L63)*

Returns base64 representation of this image in an ecoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

###  asDataUrl

▸ **asDataUrl**(`mime`: `String`): *`String`*

*Defined in [file/file.ts:58](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L58)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.
TODO: - [ ] asDataUrl / base64 - obtain mimetype with IM if user don't give.
- [ ] store file mimetype in property for future use.

**Parameters:**

Name | Type |
------ | ------ |
`mime` | `String` |

**Returns:** *`String`*

___

###  info

▸ **info**(): *`Promise<ExtractInfoResultImage>`*

*Defined in [file/file.ts:33](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L33)*

Get image information, like geometry, important numbers, mimeType, etc. The first time it calls `identify` command, but then it will cache ths value.
TODO: make it async

**Returns:** *`Promise<ExtractInfoResultImage>`*

___

###  pixel

▸ **pixel**(`x`: number, `y`: number): *`Promise<string | undefined>`*

*Defined in [file/file.ts:51](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *`Promise<string | undefined>`*

___

###  size

▸ **size**(): *`Promise<object>`*

*Defined in [file/file.ts:46](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L46)*

**Returns:** *`Promise<object>`*

___

### `Static` asFile

▸ **asFile**(`f`: [IFile](../interfaces/_types_.ifile.md)): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:148](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` asPath

▸ **asPath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:152](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:105](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L105)*

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

*Defined in [file/file.ts:110](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L110)*

Loads file from given data url string.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name` | string |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: `O` & `ResolveOptions`): *`Promise<undefined | File>`*

*Defined in [file/file.ts:83](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L83)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | `O` & `ResolveOptions` |  {} |

**Returns:** *`Promise<undefined | File>`*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: `HTMLInputElement`): *`Promise<Array<File>>`*

*Defined in [file/file.ts:117](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L117)*

Loads files from files in html input element of type "file"

**Parameters:**

Name | Type |
------ | ------ |
`el` | `HTMLInputElement` |

**Returns:** *`Promise<Array<File>>`*

___

### `Static` fromUrl

▸ **fromUrl**(`u`: string, `o`: `RequestInit` & `O` & `ResolveOptions`): *`Promise<undefined | File>`*

*Defined in [file/file.ts:73](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L73)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`u` | string | - |
`o` | `RequestInit` & `O` & `ResolveOptions` |  {} |

**Returns:** *`Promise<undefined | File>`*

___

### `Static` isFile

▸ **isFile**(`f`: any): *boolean*

*Defined in [file/file.ts:144](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | any |

**Returns:** *boolean*

___

### `Static` resolve

▸ **resolve**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: `ResolveOptions`): *`Promise<File[]>`*

*Defined in [file/file.ts:125](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L125)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string \| [IFile](../interfaces/_types_.ifile.md) \| undefined \| undefined \| string \| [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | `ResolveOptions` |  { flags: [] } |

**Returns:** *`Promise<File[]>`*

___

### `Static` toBase64

▸ **toBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:100](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L100)*

Returns base64 representation of this image in an ecoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

### `Static` toDataUrl

▸ **toDataUrl**(`file`: [File](_file_file_.file.md), `mime`: `String`): *string*

*Defined in [file/file.ts:69](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L69)*

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

*Defined in [file/file.ts:95](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/file/file.ts#L95)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*