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
* [isProtected](_file_file_.file.md#protected-isprotected)
* [name](_file_file_.file.md#name)

### Methods

* [asBase64](_file_file_.file.md#asbase64)
* [asDataUrl](_file_file_.file.md#asdataurl)
* [equals](_file_file_.file.md#equals)
* [info](_file_file_.file.md#info)
* [mimeType](_file_file_.file.md#mimetype)
* [pixel](_file_file_.file.md#pixel)
* [size](_file_file_.file.md#size)
* [asFile](_file_file_.file.md#static-asfile)
* [asPath](_file_file_.file.md#static-aspath)
* [fileExists](_file_file_.file.md#static-fileexists)
* [fromBase64](_file_file_.file.md#static-frombase64)
* [fromDataUrl](_file_file_.file.md#static-fromdataurl)
* [fromFile](_file_file_.file.md#static-fromfile)
* [fromHtmlFileInputElement](_file_file_.file.md#static-fromhtmlfileinputelement)
* [fromUrl](_file_file_.file.md#static-fromurl)
* [isFile](_file_file_.file.md#static-isfile)
* [resolve](_file_file_.file.md#static-resolve)
* [resolveOne](_file_file_.file.md#static-resolveone)
* [toBase64](_file_file_.file.md#static-tobase64)
* [toDataUrl](_file_file_.file.md#static-todataurl)
* [toString](_file_file_.file.md#static-tostring)

## Constructors

###  constructor

\+ **new File**(`name`: string, `content`: `ArrayBufferView`, `isProtected`: boolean): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:17](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L17)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | - |
`content` | `ArrayBufferView` | - |
`isProtected` | boolean | false |

**Returns:** *[File](_file_file_.file.md)*

## Properties

### `Protected` _info

• **_info**: *[ExtractInfoResultImage](../interfaces/_image_imageinfo_.extractinforesultimage.md) | undefined*

*Defined in [file/file.ts:27](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L27)*

___

###  content

• **content**: *`ArrayBufferView`*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[content](../interfaces/_types_.ifile.md#content)*

*Defined in [file/file.ts:19](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L19)*

___

### `Protected` isProtected

• **isProtected**: *boolean*

*Defined in [file/file.ts:17](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L17)*

___

###  name

• **name**: *string*

*Implementation of [IFile](../interfaces/_types_.ifile.md).[name](../interfaces/_types_.ifile.md#name)*

*Defined in [file/file.ts:19](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L19)*

## Methods

###  asBase64

▸ **asBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:70](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L70)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

###  asDataUrl

▸ **asDataUrl**(`mime?`: `String`): *`Promise<string>`*

*Defined in [file/file.ts:63](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L63)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`mime?` | `String` |

**Returns:** *`Promise<string>`*

___

###  equals

▸ **equals**(`file?`: [File](_file_file_.file.md)): *`Promise<boolean>`*

*Defined in [file/file.ts:77](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L77)*

Returns base64 representation of this image in an encoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file?` | [File](_file_file_.file.md) |

**Returns:** *`Promise<boolean>`*

___

###  info

▸ **info**(): *`Promise<ExtractInfoResultImage>`*

*Defined in [file/file.ts:33](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L33)*

Get image information, like geometry, important numbers, mimeType, etc. The first time it calls `identify` command, but then it will cache ths value.
TODO: make it async

**Returns:** *`Promise<ExtractInfoResultImage>`*

___

###  mimeType

▸ **mimeType**(): *`Promise<string>`*

*Defined in [file/file.ts:51](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L51)*

**Returns:** *`Promise<string>`*

___

###  pixel

▸ **pixel**(`x`: number, `y`: number): *`Promise<string | undefined>`*

*Defined in [file/file.ts:56](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *`Promise<string | undefined>`*

___

###  size

▸ **size**(): *`Promise<Size>`*

*Defined in [file/file.ts:46](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L46)*

**Returns:** *`Promise<Size>`*

___

### `Static` asFile

▸ **asFile**(`f`: [IFile](../interfaces/_types_.ifile.md)): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:176](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` asPath

▸ **asPath**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:180](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L180)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*

___

### `Static` fileExists

▸ **fileExists**(`f`: string | [IFile](../interfaces/_types_.ifile.md)): *`Promise<boolean>`*

*Defined in [file/file.ts:184](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L184)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *`Promise<boolean>`*

___

### `Static` fromBase64

▸ **fromBase64**(`base64`: string, `name`: string): *[File](_file_file_.file.md)*

*Defined in [file/file.ts:126](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L126)*

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

*Defined in [file/file.ts:133](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L133)*

Loads file from given data url string.

**Parameters:**

Name | Type |
------ | ------ |
`dataUrl` | string |
`name` | string |

**Returns:** *[File](_file_file_.file.md)*

___

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *`Promise<undefined | File>`*

*Defined in [file/file.ts:100](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L100)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  {} |

**Returns:** *`Promise<undefined | File>`*

___

### `Static` fromHtmlFileInputElement

▸ **fromHtmlFileInputElement**(`el`: `HTMLInputElement`): *`Promise<Array<File>>`*

*Defined in [file/file.ts:140](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L140)*

Loads files from files in html input element of type "file"

**Parameters:**

Name | Type |
------ | ------ |
`el` | `HTMLInputElement` |

**Returns:** *`Promise<Array<File>>`*

___

### `Static` fromUrl

▸ **fromUrl**(`u`: string, `o`: `RequestInit` & [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *`Promise<undefined | File>`*

*Defined in [file/file.ts:90](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L90)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`u` | string | - |
`o` | `RequestInit` & [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  {} |

**Returns:** *`Promise<undefined | File>`*

___

### `Static` isFile

▸ **isFile**(`f`: any): *boolean*

*Defined in [file/file.ts:172](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L172)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | any |

**Returns:** *boolean*

___

### `Static` resolve

▸ **resolve**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *`Promise<File[]>`*

*Defined in [file/file.ts:153](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L153)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string \| [IFile](../interfaces/_types_.ifile.md) \| undefined \| undefined \| string \| [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  { protected: false } |

**Returns:** *`Promise<File[]>`*

___

### `Static` resolveOne

▸ **resolveOne**(`files`: string | [IFile](../interfaces/_types_.ifile.md) | undefined | undefined | string | [IFile](../interfaces/_types_.ifile.md)[], `options`: [ResolveOptions](../interfaces/_file_file_.resolveoptions.md)): *`Promise<undefined | File>`*

*Defined in [file/file.ts:148](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L148)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`files` | string \| [IFile](../interfaces/_types_.ifile.md) \| undefined \| undefined \| string \| [IFile](../interfaces/_types_.ifile.md)[] | - |
`options` | [ResolveOptions](../interfaces/_file_file_.resolveoptions.md) |  { protected: false } |

**Returns:** *`Promise<undefined | File>`*

___

### `Static` toBase64

▸ **toBase64**(`file`: [File](_file_file_.file.md)): *string*

*Defined in [file/file.ts:119](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L119)*

Returns base64 representation of this image in an ecoded format like PNG

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |

**Returns:** *string*

___

### `Static` toDataUrl

▸ **toDataUrl**(`file`: [File](_file_file_.file.md), `mime?`: `String`): *`Promise<string>`*

*Defined in [file/file.ts:85](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L85)*

Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.

**Parameters:**

Name | Type |
------ | ------ |
`file` | [File](_file_file_.file.md) |
`mime?` | `String` |

**Returns:** *`Promise<string>`*

___

### `Static` toString

▸ **toString**(`f`: [IFile](../interfaces/_types_.ifile.md)): *string*

*Defined in [file/file.ts:112](https://github.com/cancerberoSgx/magica/blob/6686cf2/src/file/file.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [IFile](../interfaces/_types_.ifile.md) |

**Returns:** *string*