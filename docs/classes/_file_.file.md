> **[magica](../README.md)**

[Globals](../README.md) / ["file"](../modules/_file_.md) / [File](_file_.file.md) /

# Class: File

## Hierarchy

* **File**

## Implements

* [File](../interfaces/_types_.file.md)

### Index

#### Constructors

* [constructor](_file_.file.md#constructor)

#### Properties

* [content](_file_.file.md#content)
* [name](_file_.file.md#name)

#### Methods

* [fromFile](_file_.file.md#static-fromfile)
* [fromUrl](_file_.file.md#static-fromurl)
* [resolveOptions](_file_.file.md#static-resolveoptions)
* [toString](_file_.file.md#static-tostring)

## Constructors

###  constructor

\+ **new File**(`name`: string, `content`: `ArrayBufferView` | `ArrayBuffer`): *[File](_file_.file.md)*

*Defined in [file.ts:8](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`content` | `ArrayBufferView` \| `ArrayBuffer` |

**Returns:** *[File](_file_.file.md)*

## Properties

###  content

• **content**: *`ArrayBufferView`*

*Implementation of [File](../interfaces/_types_.file.md).[content](../interfaces/_types_.file.md#content)*

*Defined in [file.ts:8](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L8)*

___

###  name

• **name**: *string*

*Implementation of [File](../interfaces/_types_.file.md).[name](../interfaces/_types_.file.md#name)*

*Defined in [file.ts:10](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L10)*

## Methods

### `Static` fromFile

▸ **fromFile**(`f`: string, `o`: `O`): *`Promise<File>`*

*Defined in [file.ts:19](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | string | - |
`o` | `O` |  {} |

**Returns:** *`Promise<File>`*

___

### `Static` fromUrl

▸ **fromUrl**(`u`: string, `o`: `RequestInit` & `O`): *`Promise<File>`*

*Defined in [file.ts:14](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L14)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`u` | string | - |
`o` | `RequestInit` & `O` |  {} |

**Returns:** *`Promise<File>`*

___

### `Static` resolveOptions

▸ **resolveOptions**(`o`: `Partial<Options>`): *`Promise<File[]>`*

*Defined in [file.ts:30](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | `Partial<Options>` |

**Returns:** *`Promise<File[]>`*

___

### `Static` toString

▸ **toString**(`f`: [File](_file_.file.md)): *string*

*Defined in [file.ts:26](https://github.com/cancerberoSgx/magica/blob/cdb8012/src/file.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [File](_file_.file.md) |

**Returns:** *string*