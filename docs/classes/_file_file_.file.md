> **[magica](../README.md)**

[Globals](../README.md) / ["file/file"](../modules/_file_file_.md) / [File](_file_file_.file.md) /

# Class: File

## Hierarchy

* **File**

## Implements

* [File](../interfaces/_types_.file.md)

### Index

#### Constructors

* [constructor](_file_file_.file.md#constructor)

#### Properties

* [content](_file_file_.file.md#content)
* [name](_file_file_.file.md#name)

#### Methods

* [asPath](_file_file_.file.md#static-aspath)
* [fromFile](_file_file_.file.md#static-fromfile)
* [fromUrl](_file_file_.file.md#static-fromurl)
* [resolveOptions](_file_file_.file.md#static-resolveoptions)
* [toString](_file_file_.file.md#static-tostring)

## Constructors

###  constructor

\+ **new File**(`name`: string, `content`: `ArrayBufferView` | `ArrayBuffer`): *[File](_file_file_.file.md)*

Defined in file/file.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`content` | `ArrayBufferView` \| `ArrayBuffer` |

**Returns:** *[File](_file_file_.file.md)*

## Properties

###  content

• **content**: *`ArrayBufferView`*

*Implementation of [File](../interfaces/_types_.file.md).[content](../interfaces/_types_.file.md#content)*

Defined in file/file.ts:8

___

###  name

• **name**: *string*

*Implementation of [File](../interfaces/_types_.file.md).[name](../interfaces/_types_.file.md#name)*

Defined in file/file.ts:10

## Methods

### `Static` asPath

▸ **asPath**(`f`: string | [File](_file_file_.file.md)): *string*

Defined in file/file.ts:47

**Parameters:**

Name | Type |
------ | ------ |
`f` | string \| [File](_file_file_.file.md) |

**Returns:** *string*

___

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: `O`): *`Promise<File>`*

Defined in file/file.ts:19

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | `O` |  {} |

**Returns:** *`Promise<File>`*

___

### `Static` fromUrl

▸ **fromUrl**(`u`: string, `o`: `RequestInit` & `O`): *`Promise<File>`*

Defined in file/file.ts:14

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`u` | string | - |
`o` | `RequestInit` & `O` |  {} |

**Returns:** *`Promise<File>`*

___

### `Static` resolveOptions

▸ **resolveOptions**(`o`: `Partial<Options>`): *`Promise<File[]>`*

Defined in file/file.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`o` | `Partial<Options>` |

**Returns:** *`Promise<File[]>`*

___

### `Static` toString

▸ **toString**(`f`: [File](_file_file_.file.md)): *string*

Defined in file/file.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`f` | [File](_file_file_.file.md) |

**Returns:** *string*