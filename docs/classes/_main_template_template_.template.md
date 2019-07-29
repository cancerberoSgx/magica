> **[magica](../README.md)**

[Globals](../README.md) / ["main/template/template"](../modules/_main_template_template_.md) / [Template](_main_template_template_.template.md) /

# Class: Template

## Hierarchy

* **Template**

## Implements

* [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md)

## Index

### Constructors

* [constructor](_main_template_template_.template.md#constructor)

### Properties

* [name](_main_template_template_.template.md#name)

### Methods

* [fnCompileTime](_main_template_template_.template.md#fncompiletime)
* [fnRuntime](_main_template_template_.template.md#fnruntime)

## Constructors

###  constructor

\+ **new Template**(): *[Template](_main_template_template_.template.md)*

*Defined in [main/template/template.ts:13](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/template/template.ts#L13)*

**Returns:** *[Template](_main_template_template_.template.md)*

## Properties

###  name

• **name**: *string* = "template"

*Implementation of [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md).[name](../interfaces/_types_.commandpreprocessor.md#name)*

*Defined in [main/template/template.ts:23](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/template/template.ts#L23)*

## Methods

###  fnCompileTime

▸ **fnCompileTime**(`context`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<RunOptions>`*

*Defined in [main/template/template.ts:25](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/template/template.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<RunOptions>`*

___

###  fnRuntime

▸ **fnRuntime**(`commandOptions`: [Options](../interfaces/_types_.options.md), `commandIndex`: number, `runOptions`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<void>`*

*Defined in [main/template/template.ts:41](https://github.com/cancerberoSgx/magica/blob/94e3b58/src/main/template/template.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`commandOptions` | [Options](../interfaces/_types_.options.md) |
`commandIndex` | number |
`runOptions` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<void>`*