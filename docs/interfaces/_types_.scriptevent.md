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

*Defined in [types.ts:103](https://github.com/cancerberoSgx/magica/blob/1131304/src/types.ts#L103)*

___

### `Optional` commandResult

• **commandResult**? : *[Result](_types_.result.md)*

*Defined in [types.ts:104](https://github.com/cancerberoSgx/magica/blob/1131304/src/types.ts#L104)*

___

###  name

• **name**: *"beforeCommand" | "afterCommand" | "onScriptStart" | "onScriptEnd"*

*Defined in [types.ts:99](https://github.com/cancerberoSgx/magica/blob/1131304/src/types.ts#L99)*

___

###  scriptInterrupt

• **scriptInterrupt**: *boolean*

*Defined in [types.ts:102](https://github.com/cancerberoSgx/magica/blob/1131304/src/types.ts#L102)*

___

###  scriptOptions

• **scriptOptions**: *[RunOptions](_types_.runoptions.md)*

*Defined in [types.ts:101](https://github.com/cancerberoSgx/magica/blob/1131304/src/types.ts#L101)*

___

###  stopPropagation

• **stopPropagation**: *boolean*

*Defined in [types.ts:100](https://github.com/cancerberoSgx/magica/blob/1131304/src/types.ts#L100)*