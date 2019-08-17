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
* [templateOptions](_main_template_template_.template.md#protected-templateoptions)
* [templateRuntimeOptions](_main_template_template_.template.md#protected-templateruntimeoptions)

### Methods

* [fnCompileTime](_main_template_template_.template.md#fncompiletime)
* [fnRuntime](_main_template_template_.template.md#fnruntime)

## Constructors

###  constructor

\+ **new Template**(): *[Template](_main_template_template_.template.md)*

*Defined in [main/template/template.ts:15](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/main/template/template.ts#L15)*

**Returns:** *[Template](_main_template_template_.template.md)*

## Properties

###  name

• **name**: *string* = "template"

*Implementation of [CommandPreprocessor](../interfaces/_types_.commandpreprocessor.md).[name](../interfaces/_types_.commandpreprocessor.md#name)*

*Defined in [main/template/template.ts:32](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/main/template/template.ts#L32)*

___

### `Protected` templateOptions

• **templateOptions**: *object*

*Defined in [main/template/template.ts:14](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/main/template/template.ts#L14)*

#### Type declaration:

___

### `Protected` templateRuntimeOptions

• **templateRuntimeOptions**: *object*

*Defined in [main/template/template.ts:15](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/main/template/template.ts#L15)*

#### Type declaration:

## Methods

###  fnCompileTime

▸ **fnCompileTime**(`context`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<RunOptions>`*

*Defined in [main/template/template.ts:34](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/main/template/template.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<RunOptions>`*

___

###  fnRuntime

▸ **fnRuntime**(`commandOptions`: [Options](../interfaces/_types_.options.md), `commandIndex`: number, `runOptions`: [RunOptions](../interfaces/_types_.runoptions.md)): *`Promise<void>`*

*Defined in [main/template/template.ts:51](https://github.com/cancerberoSgx/magica/blob/0133e5d/src/main/template/template.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`commandOptions` | [Options](../interfaces/_types_.options.md) |
`commandIndex` | number |
`runOptions` | [RunOptions](../interfaces/_types_.runoptions.md) |

**Returns:** *`Promise<void>`*