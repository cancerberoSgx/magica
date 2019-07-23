> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [ScriptEvent](_types_.scriptevent.md) /

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

• **commandOptions**? : *`Partial<Options>`*

*Defined in [types.ts:97](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L97)*

___

### `Optional` commandResult

• **commandResult**? : *[Result](_types_.result.md)*

*Defined in [types.ts:98](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L98)*

___

###  name

• **name**: *"beforeCommand" | "afterCommand" | "onScriptStart" | "onScriptEnd"*

*Defined in [types.ts:93](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L93)*

___

###  scriptInterrupt

• **scriptInterrupt**: *boolean*

*Defined in [types.ts:96](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L96)*

___

###  scriptOptions

• **scriptOptions**: *[RunOptions](_types_.runoptions.md)*

*Defined in [types.ts:95](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L95)*

___

###  stopPropagation

• **stopPropagation**: *boolean*

*Defined in [types.ts:94](https://github.com/cancerberoSgx/magica/blob/8ec8971/src/types.ts#L94)*