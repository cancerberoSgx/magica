**[magica](../README.md)**

[Globals](../README.md) › ["main/template/template"](_main_template_template_.md)

# External module: "main/template/template"

## Index

### Classes

* [Template](../classes/_main_template_template_.template.md)

### Interfaces

* [TemplateHelper](../interfaces/_main_template_template_.templatehelper.md)

### Functions

* [addTemplateHelper](_main_template_template_.md#addtemplatehelper)

## Functions

###  addTemplateHelper

▸ **addTemplateHelper**<**O**, **R**, **RO**, **RR**, **CRO**>(`h`: [TemplateHelper](../interfaces/_main_template_template_.templatehelper.md)‹O, R, RO, RR, CRO›): *void*

*Defined in [main/template/template.ts:69](https://github.com/cancerberoSgx/magica/blob/64330f2/src/main/template/template.ts#L69)*

Allows to change the context object on which templates are evaluated to add new properties or functions
so they can be evaluated in command templates.

**Type parameters:**

▪ **O**

▪ **R**

▪ **RO**

▪ **RR**

▪ **CRO**: *[RunOptions](../interfaces/_types_.runoptions.md)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | [TemplateHelper](../interfaces/_main_template_template_.templatehelper.md)‹O, R, RO, RR, CRO› |

**Returns:** *void*