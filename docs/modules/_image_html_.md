[magica](../README.md) › ["image/html"](_image_html_.md)

# External module: "image/html"

## Index

### Functions

* [loadHtmlCanvasElement](_image_html_.md#loadhtmlcanvaselement)
* [loadHtmlImageElement](_image_html_.md#loadhtmlimageelement)
* [toDataUrl](_image_html_.md#todataurl)
* [toDataUrlSync](_image_html_.md#todataurlsync)

## Functions

###  loadHtmlCanvasElement

▸ **loadHtmlCanvasElement**(`f`: [File](../classes/_file_file_.file.md), `ctx`: CanvasRenderingContext2D, `dx`: number, `dy`: number, `dirtyX`: number | undefined, `dirtyY`: number | undefined, `dirtyWidth`: number | undefined, `dirtyHeight`: number | undefined): *Promise‹void›*

*Defined in [image/html.ts:31](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/image/html.ts#L31)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`f` | [File](../classes/_file_file_.file.md) | - |
`ctx` | CanvasRenderingContext2D | - |
`dx` | number | 0 |
`dy` | number | 0 |
`dirtyX` | number &#124; undefined |  undefined |
`dirtyY` | number &#124; undefined |  undefined |
`dirtyWidth` | number &#124; undefined |  undefined |
`dirtyHeight` | number &#124; undefined |  undefined |

**Returns:** *Promise‹void›*

___

###  loadHtmlImageElement

▸ **loadHtmlImageElement**(`o`: [File](../classes/_file_file_.file.md), `el?`: HTMLImageElement, `forceDataUrl`: boolean): *Promise‹HTMLImageElement›*

*Defined in [image/html.ts:20](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/image/html.ts#L20)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | [File](../classes/_file_file_.file.md) | - |
`el?` | HTMLImageElement | - |
`forceDataUrl` | boolean | false |

**Returns:** *Promise‹HTMLImageElement›*

___

###  toDataUrl

▸ **toDataUrl**(`o`: [File](../classes/_file_file_.file.md), `mime?`: undefined | string): *Promise‹string›*

*Defined in [image/html.ts:5](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/image/html.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | [File](../classes/_file_file_.file.md) |
`mime?` | undefined &#124; string |

**Returns:** *Promise‹string›*

___

###  toDataUrlSync

▸ **toDataUrlSync**(`o`: [IFile](../interfaces/_types_.ifile.md), `mime`: string): *string*

*Defined in [image/html.ts:13](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/image/html.ts#L13)*

Unsafe synchronous operation, please use [toDataUrl]

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | [IFile](../interfaces/_types_.ifile.md) | - |
`mime` | string |  `image/${getFileExtension(o.name)}` |

**Returns:** *string*
