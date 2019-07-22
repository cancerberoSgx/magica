> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [File](_types_.file.md) /

# Interface: File

Representation of input and output files. Use [File](_types_.file.md) class static methods to easily build files from
filesystem files or urls .

## Hierarchy

* **File**

## Implemented by

* [File](../classes/_file_file_.file.md)

## Index

### Properties

* [content](_types_.file.md#content)
* [name](_types_.file.md#name)

## Properties

###  content

• **content**: *`ArrayBufferView`*

*Defined in [types.ts:16](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L16)*

The content of the file.

___

###  name

• **name**: *string*

*Defined in [types.ts:11](https://github.com/cancerberoSgx/magica/blob/1a62845/src/types.ts#L11)*

Name for this file. Commands referencing this file must do so using this exact name.