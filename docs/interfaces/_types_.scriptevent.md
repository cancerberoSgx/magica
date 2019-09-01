**[magica](../README.md)**

[Globals](../README.md) › ["types"](../modules/_types_.md) › [ScriptEvent](_types_.scriptevent.md)

# Interface: ScriptEvent

## Hierarchy

* **ScriptEvent**

## Index

### Properties

* [commandOptions](_types_.scriptevent.md#optional-commandoptions)
* [commandResult](_types_.scriptevent.md#optional-commandresult)
* [name](_types_.scriptevent.md#name)
* [scriptInterrupt](_types_.scriptevent.md#scriptinterrupt)
* [scriptOptions](_types_.scriptevent.md#scriptoptions)
* [stopPropagation](_types_.scriptevent.md#stoppropagation)

## Properties

### `Optional` commandOptions

• **commandOptions**? : *Partial‹[Options](_types_.options.md)›*

*Defined in [types.ts:131](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L131)*

___

### `Optional` commandResult

• **commandResult**? : *[Result](_types_.result.md)*

*Defined in [types.ts:132](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L132)*

___

###  name

• **name**: *"beforeCommand" | "afterCommand" | "onScriptStart" | "onScriptEnd"*

*Defined in [types.ts:127](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L127)*

___

###  scriptInterrupt

• **scriptInterrupt**: *boolean*

*Defined in [types.ts:130](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L130)*

___

###  scriptOptions

• **scriptOptions**: *[RunOptions](_types_.runoptions.md)*

*Defined in [types.ts:129](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L129)*

___

###  stopPropagation

• **stopPropagation**: *boolean*

*Defined in [types.ts:128](https://github.com/cancerberoSgx/magica/blob/06c5192/src/types.ts#L128)*