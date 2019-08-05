> **[magica](../README.md)**

[Globals](../README.md) / ["image/imageBuiltIn"](_image_imagebuiltin_.md) /

# External module: "image/imageBuiltIn"

## Index

### Functions

* [imageBuiltIn](_image_imagebuiltin_.md#imagebuiltin)

## Functions

###  imageBuiltIn

▸ **imageBuiltIn**(`builtIn?`: `images`): *`Promise<IFile[]>`*

*Defined in [image/imageBuiltIn.ts:14](https://github.com/cancerberoSgx/magica/blob/cf74fdd/src/image/imageBuiltIn.ts#L14)*

Gets ImageMagick built-in images like `rose:`, `logo:`, etc in the form of [File](../interfaces/_main_customcommand_.customcommandcontext.md#file)s.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`builtIn?` | `images` | if given it will resolve with with an array contianing only that image  |

**Returns:** *`Promise<IFile[]>`*