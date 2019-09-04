**[magica](../README.md)**

[Globals](../README.md) › ["image/support"](_image_support_.md)

# External module: "image/support"

## Index

### Variables

* [knownSupportedReadOnlyImageFormats](_image_support_.md#const-knownsupportedreadonlyimageformats)
* [knownSupportedReadWriteImageFormats](_image_support_.md#const-knownsupportedreadwriteimageformats)
* [knownSupportedWriteOnlyImageFormats](_image_support_.md#const-knownsupportedwriteonlyimageformats)

### Functions

* [getConfigureFolders](_image_support_.md#getconfigurefolders)
* [imageBuiltIn](_image_support_.md#imagebuiltin)
* [listConfigure](_image_support_.md#listconfigure)
* [listFormat](_image_support_.md#listformat)

## Variables

### `Const` knownSupportedReadOnlyImageFormats

• **knownSupportedReadOnlyImageFormats**: *string[]* =  [
  // 'pix',
  'mat',
]

*Defined in [image/support.ts:96](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L96)*

list of image formats that are known to be supported by wasm-imagemagick but only for read operation. See `spec/formatSpec.ts`

___

### `Const` knownSupportedReadWriteImageFormats

• **knownSupportedReadWriteImageFormats**: *string[]* =  [
  'jpg', 'png',
  'psd',
  // 'webp',// should be working but it's not : ImageMagick/coders/webp.c
  'tiff', 'xcf', 'gif', 'bmp', 'tga', 'miff', 'ico', 'dcm', 'xpm', 'pcx',
  'fits',
  'ppm',
  'pgm',
  'pfm',
  'mng',
  'hdr',
  'dds', // generated using convert -define "dds:compression={dxt1, dxt5, none}" to_rotate.png  to_rotate.dds
  'otb', // generated using convert to_rotate.png  to_rotate.otb

  'txt', // generated using convert to_rotate.png  to_rotate.txt
  'psb',

  // 'rgb', // fails because  MustSpecifyImageSize `to_rotate.rgb'
]

*Defined in [image/support.ts:63](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L63)*

List of image formats that are known to be supported by wasm-imagemagick both for read and write. See `spec/formatSpec.ts`.

has some heuristic information regarding features (not) supported by wasm-imagemagick, for example, image formats

___

### `Const` knownSupportedWriteOnlyImageFormats

• **knownSupportedWriteOnlyImageFormats**: *string[]* =  [
  'ps', 'pdf',
  'epdf', // generated using convert to_rotate.png  to_rotate.epdf
  'svg',
  'djvu', // converted from png using online tool
]

*Defined in [image/support.ts:86](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L86)*

List of image formats that are known to be supported by wasm-imagemagick but only for write operation. See `spec/formatSpec.ts`

## Functions

###  getConfigureFolders

▸ **getConfigureFolders**(): *Promise‹string[]›*

*Defined in [image/support.ts:6](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L6)*

**Returns:** *Promise‹string[]›*

___

###  imageBuiltIn

▸ **imageBuiltIn**(`builtIn?`: images): *Promise‹[IFile](../interfaces/_types_.ifile.md)[]›*

*Defined in [image/support.ts:108](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L108)*

Gets ImageMagick built-in images like `rose:`, `logo:`, etc in the form of [File](../interfaces/_main_customcommand_.customcommandcontext.md#file)s.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`builtIn?` | images | if given it will resolve with with an array contianing only that image  |

**Returns:** *Promise‹[IFile](../interfaces/_types_.ifile.md)[]›*

___

###  listConfigure

▸ **listConfigure**(): *Promise‹ListConfigure›*

*Defined in [image/support.ts:26](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L26)*

returns the output of part of the information returned in `convert -list configure`, parsed.

**Returns:** *Promise‹ListConfigure›*

___

###  listFormat

▸ **listFormat**(): *Promise‹Format[]›*

*Defined in [image/support.ts:44](https://github.com/cancerberoSgx/magica/blob/c127d55/src/image/support.ts#L44)*

**Returns:** *Promise‹Format[]›*