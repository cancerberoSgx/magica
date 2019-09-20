[magica](../README.md) › ["types"](../modules/_types_.md) › [IFile](_types_.ifile.md)

# Interface: IFile

Representation of input and output files. Use [File](_main_customcommand_.customcommandcontext.md#file) class static methods to easily build files from
filesystem files or urls .

## Hierarchy

* **IFile**

## Implemented by

* [File](../classes/_file_file_.file.md)

## Index

### Properties

* [content](_types_.ifile.md#content)
* [name](_types_.ifile.md#name)

## Properties

###  content

• **content**: *ArrayBufferView*

*Defined in [types.ts:16](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/types.ts#L16)*

The content of the file.

___

###  name

• **name**: *string*

*Defined in [types.ts:11](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/types.ts#L11)*

Name for this file. Commands referencing this file must do so using this exact name.
