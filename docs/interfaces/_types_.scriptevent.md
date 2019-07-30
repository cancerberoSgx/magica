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

*Defined in [types.ts:92](https://github.com/cancerberoSgx/magica/blob/5aa0082/src/types.ts#L92)*

___

### `Optional` commandResult

• **commandResult**? : *[Result](_types_.result.md)*

*Defined in [types.ts:93](https://github.com/cancerberoSgx/magica/blob/5aa0082/src/types.ts#L93)*

___

###  name

• **name**: *"beforeCommand" | "afterCommand" | "onScriptStart" | "onScriptEnd"*

*Defined in [types.ts:88](https://github.com/cancerberoSgx/magica/blob/5aa0082/src/types.ts#L88)*

___

###  scriptInterrupt

• **scriptInterrupt**: *boolean*

*Defined in [types.ts:91](https://github.com/cancerberoSgx/magica/blob/5aa0082/src/types.ts#L91)*

___

###  scriptOptions

• **scriptOptions**: *[RunOptions](_types_.runoptions.md)*

*Defined in [types.ts:90](https://github.com/cancerberoSgx/magica/blob/5aa0082/src/types.ts#L90)*

___

###  stopPropagation

• **stopPropagation**: *boolean*

*Defined in [types.ts:89](https://github.com/cancerberoSgx/magica/blob/5aa0082/src/types.ts#L89)*