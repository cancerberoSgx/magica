[magica](../README.md) › ["file/emscriptenFs"](../modules/_file_emscriptenfs_.md) › [EmscriptenModule](_file_emscriptenfs_.emscriptenmodule.md)

# Interface: EmscriptenModule

## Hierarchy

* **EmscriptenModule**

## Index

### Properties

* [ALLOC_DYNAMIC](_file_emscriptenfs_.emscriptenmodule.md#alloc_dynamic)
* [ALLOC_NONE](_file_emscriptenfs_.emscriptenmodule.md#alloc_none)
* [ALLOC_NORMAL](_file_emscriptenfs_.emscriptenmodule.md#alloc_normal)
* [ALLOC_STACK](_file_emscriptenfs_.emscriptenmodule.md#alloc_stack)
* [ALLOC_STATIC](_file_emscriptenfs_.emscriptenmodule.md#alloc_static)
* [FAST_MEMORY](_file_emscriptenfs_.emscriptenmodule.md#fast_memory)
* [FHEAP](_file_emscriptenfs_.emscriptenmodule.md#fheap)
* [HEAP](_file_emscriptenfs_.emscriptenmodule.md#heap)
* [HEAP16](_file_emscriptenfs_.emscriptenmodule.md#heap16)
* [HEAP32](_file_emscriptenfs_.emscriptenmodule.md#heap32)
* [HEAP8](_file_emscriptenfs_.emscriptenmodule.md#heap8)
* [HEAPF32](_file_emscriptenfs_.emscriptenmodule.md#heapf32)
* [HEAPF64](_file_emscriptenfs_.emscriptenmodule.md#heapf64)
* [HEAPU16](_file_emscriptenfs_.emscriptenmodule.md#heapu16)
* [HEAPU32](_file_emscriptenfs_.emscriptenmodule.md#heapu32)
* [HEAPU8](_file_emscriptenfs_.emscriptenmodule.md#heapu8)
* [IHEAP](_file_emscriptenfs_.emscriptenmodule.md#iheap)
* [Runtime](_file_emscriptenfs_.emscriptenmodule.md#runtime)
* [TOTAL_MEMORY](_file_emscriptenfs_.emscriptenmodule.md#total_memory)
* [TOTAL_STACK](_file_emscriptenfs_.emscriptenmodule.md#total_stack)
* [arguments](_file_emscriptenfs_.emscriptenmodule.md#arguments)
* [environment](_file_emscriptenfs_.emscriptenmodule.md#environment)
* [filePackagePrefixURL](_file_emscriptenfs_.emscriptenmodule.md#filepackageprefixurl)
* [logReadFiles](_file_emscriptenfs_.emscriptenmodule.md#logreadfiles)
* [noExitRuntime](_file_emscriptenfs_.emscriptenmodule.md#noexitruntime)
* [noInitialRun](_file_emscriptenfs_.emscriptenmodule.md#noinitialrun)
* [onAbort](_file_emscriptenfs_.emscriptenmodule.md#onabort)
* [onRuntimeInitialized](_file_emscriptenfs_.emscriptenmodule.md#onruntimeinitialized)
* [postRun](_file_emscriptenfs_.emscriptenmodule.md#postrun)
* [preInit](_file_emscriptenfs_.emscriptenmodule.md#preinit)
* [preRun](_file_emscriptenfs_.emscriptenmodule.md#prerun)
* [preinitializedWebGLContext](_file_emscriptenfs_.emscriptenmodule.md#preinitializedwebglcontext)
* [preloadedAudios](_file_emscriptenfs_.emscriptenmodule.md#preloadedaudios)
* [preloadedImages](_file_emscriptenfs_.emscriptenmodule.md#preloadedimages)
* [wasmBinary](_file_emscriptenfs_.emscriptenmodule.md#wasmbinary)

### Methods

* [_free](_file_emscriptenfs_.emscriptenmodule.md#_free)
* [_malloc](_file_emscriptenfs_.emscriptenmodule.md#_malloc)
* [addOnExit](_file_emscriptenfs_.emscriptenmodule.md#addonexit)
* [addOnInit](_file_emscriptenfs_.emscriptenmodule.md#addoninit)
* [addOnPostRun](_file_emscriptenfs_.emscriptenmodule.md#addonpostrun)
* [addOnPreMain](_file_emscriptenfs_.emscriptenmodule.md#addonpremain)
* [addOnPreRun](_file_emscriptenfs_.emscriptenmodule.md#addonprerun)
* [addRunDependency](_file_emscriptenfs_.emscriptenmodule.md#addrundependency)
* [allocate](_file_emscriptenfs_.emscriptenmodule.md#allocate)
* [ccall](_file_emscriptenfs_.emscriptenmodule.md#ccall)
* [cwrap](_file_emscriptenfs_.emscriptenmodule.md#cwrap)
* [destroy](_file_emscriptenfs_.emscriptenmodule.md#destroy)
* [getPreloadedPackage](_file_emscriptenfs_.emscriptenmodule.md#getpreloadedpackage)
* [getValue](_file_emscriptenfs_.emscriptenmodule.md#getvalue)
* [instantiateWasm](_file_emscriptenfs_.emscriptenmodule.md#instantiatewasm)
* [intArrayFromString](_file_emscriptenfs_.emscriptenmodule.md#intarrayfromstring)
* [intArrayToString](_file_emscriptenfs_.emscriptenmodule.md#intarraytostring)
* [locateFile](_file_emscriptenfs_.emscriptenmodule.md#locatefile)
* [onCustomMessage](_file_emscriptenfs_.emscriptenmodule.md#oncustommessage)
* [print](_file_emscriptenfs_.emscriptenmodule.md#print)
* [printErr](_file_emscriptenfs_.emscriptenmodule.md#printerr)
* [removeRunDependency](_file_emscriptenfs_.emscriptenmodule.md#removerundependency)
* [setValue](_file_emscriptenfs_.emscriptenmodule.md#setvalue)
* [writeArrayToMemory](_file_emscriptenfs_.emscriptenmodule.md#writearraytomemory)
* [writeAsciiToMemory](_file_emscriptenfs_.emscriptenmodule.md#writeasciitomemory)
* [writeStringToMemory](_file_emscriptenfs_.emscriptenmodule.md#writestringtomemory)

## Properties

###  ALLOC_DYNAMIC

• **ALLOC_DYNAMIC**: *number*

*Defined in [file/emscriptenFs.ts:111](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L111)*

___

###  ALLOC_NONE

• **ALLOC_NONE**: *number*

*Defined in [file/emscriptenFs.ts:112](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L112)*

___

###  ALLOC_NORMAL

• **ALLOC_NORMAL**: *number*

*Defined in [file/emscriptenFs.ts:108](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L108)*

___

###  ALLOC_STACK

• **ALLOC_STACK**: *number*

*Defined in [file/emscriptenFs.ts:109](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L109)*

___

###  ALLOC_STATIC

• **ALLOC_STATIC**: *number*

*Defined in [file/emscriptenFs.ts:110](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L110)*

___

###  FAST_MEMORY

• **FAST_MEMORY**: *number*

*Defined in [file/emscriptenFs.ts:133](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L133)*

___

###  FHEAP

• **FHEAP**: *Float64Array*

*Defined in [file/emscriptenFs.ts:119](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L119)*

___

###  HEAP

• **HEAP**: *Int32Array*

*Defined in [file/emscriptenFs.ts:117](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L117)*

___

###  HEAP16

• **HEAP16**: *Int16Array*

*Defined in [file/emscriptenFs.ts:123](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L123)*

___

###  HEAP32

• **HEAP32**: *Int32Array*

*Defined in [file/emscriptenFs.ts:124](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L124)*

___

###  HEAP8

• **HEAP8**: *Int8Array*

*Defined in [file/emscriptenFs.ts:122](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L122)*

___

###  HEAPF32

• **HEAPF32**: *Float32Array*

*Defined in [file/emscriptenFs.ts:128](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L128)*

___

###  HEAPF64

• **HEAPF64**: *Float64Array*

*Defined in [file/emscriptenFs.ts:129](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L129)*

___

###  HEAPU16

• **HEAPU16**: *Uint16Array*

*Defined in [file/emscriptenFs.ts:126](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L126)*

___

###  HEAPU32

• **HEAPU32**: *Uint32Array*

*Defined in [file/emscriptenFs.ts:127](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L127)*

___

###  HEAPU8

• **HEAPU8**: *Uint8Array*

*Defined in [file/emscriptenFs.ts:125](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L125)*

___

###  IHEAP

• **IHEAP**: *Int32Array*

*Defined in [file/emscriptenFs.ts:118](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L118)*

___

###  Runtime

• **Runtime**: *any*

*Defined in [file/emscriptenFs.ts:100](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L100)*

___

###  TOTAL_MEMORY

• **TOTAL_MEMORY**: *number*

*Defined in [file/emscriptenFs.ts:132](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L132)*

___

###  TOTAL_STACK

• **TOTAL_STACK**: *number*

*Defined in [file/emscriptenFs.ts:131](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L131)*

___

###  arguments

• **arguments**: *string[]*

*Defined in [file/emscriptenFs.ts:77](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L77)*

___

###  environment

• **environment**: *EnvironmentType*

*Defined in [file/emscriptenFs.ts:78](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L78)*

___

###  filePackagePrefixURL

• **filePackagePrefixURL**: *string*

*Defined in [file/emscriptenFs.ts:88](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L88)*

___

###  logReadFiles

• **logReadFiles**: *boolean*

*Defined in [file/emscriptenFs.ts:87](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L87)*

___

###  noExitRuntime

• **noExitRuntime**: *boolean*

*Defined in [file/emscriptenFs.ts:86](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L86)*

___

###  noInitialRun

• **noInitialRun**: *boolean*

*Defined in [file/emscriptenFs.ts:85](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L85)*

___

###  onAbort

• **onAbort**: *function*

*Defined in [file/emscriptenFs.ts:82](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L82)*

#### Type declaration:

▸ (`what`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`what` | any |

___

###  onRuntimeInitialized

• **onRuntimeInitialized**: *function*

*Defined in [file/emscriptenFs.ts:83](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L83)*

#### Type declaration:

▸ (): *void*

___

###  postRun

• **postRun**: *Array‹function›*

*Defined in [file/emscriptenFs.ts:81](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L81)*

___

###  preInit

• **preInit**: *Array‹function›*

*Defined in [file/emscriptenFs.ts:79](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L79)*

___

###  preRun

• **preRun**: *Array‹function›*

*Defined in [file/emscriptenFs.ts:80](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L80)*

___

###  preinitializedWebGLContext

• **preinitializedWebGLContext**: *WebGLRenderingContext*

*Defined in [file/emscriptenFs.ts:84](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L84)*

___

###  preloadedAudios

• **preloadedAudios**: *any*

*Defined in [file/emscriptenFs.ts:152](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L152)*

___

###  preloadedImages

• **preloadedImages**: *any*

*Defined in [file/emscriptenFs.ts:151](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L151)*

___

###  wasmBinary

• **wasmBinary**: *ArrayBuffer*

*Defined in [file/emscriptenFs.ts:89](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L89)*

## Methods

###  _free

▸ **_free**(`ptr`: number): *void*

*Defined in [file/emscriptenFs.ts:155](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |

**Returns:** *void*

___

###  _malloc

▸ **_malloc**(`size`: number): *number*

*Defined in [file/emscriptenFs.ts:154](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`size` | number |

**Returns:** *number*

___

###  addOnExit

▸ **addOnExit**(`cb`: function): *void*

*Defined in [file/emscriptenFs.ts:138](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L138)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnInit

▸ **addOnInit**(`cb`: function): *void*

*Defined in [file/emscriptenFs.ts:136](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L136)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnPostRun

▸ **addOnPostRun**(`cb`: function): *void*

*Defined in [file/emscriptenFs.ts:139](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L139)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnPreMain

▸ **addOnPreMain**(`cb`: function): *void*

*Defined in [file/emscriptenFs.ts:137](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L137)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addOnPreRun

▸ **addOnPreRun**(`cb`: function): *void*

*Defined in [file/emscriptenFs.ts:135](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L135)*

**Parameters:**

▪ **cb**: *function*

▸ (): *any*

**Returns:** *void*

___

###  addRunDependency

▸ **addRunDependency**(`id`: any): *void*

*Defined in [file/emscriptenFs.ts:148](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *void*

___

###  allocate

▸ **allocate**(`slab`: any, `types`: string | string[], `allocator`: number, `ptr`: number): *number*

*Defined in [file/emscriptenFs.ts:114](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`slab` | any |
`types` | string &#124; string[] |
`allocator` | number |
`ptr` | number |

**Returns:** *number*

___

###  ccall

▸ **ccall**(`ident`: string, `returnType`: ValueType | null, `argTypes`: ValueType[], `args`: TypeCompatibleWithC[], `opts?`: CCallOpts): *any*

*Defined in [file/emscriptenFs.ts:102](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`ident` | string |
`returnType` | ValueType &#124; null |
`argTypes` | ValueType[] |
`args` | TypeCompatibleWithC[] |
`opts?` | CCallOpts |

**Returns:** *any*

___

###  cwrap

▸ **cwrap**(`ident`: string, `returnType`: ValueType | null, `argTypes`: ValueType[], `opts?`: CCallOpts): *function*

*Defined in [file/emscriptenFs.ts:103](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`ident` | string |
`returnType` | ValueType &#124; null |
`argTypes` | ValueType[] |
`opts?` | CCallOpts |

**Returns:** *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  destroy

▸ **destroy**(`object`: object): *void*

*Defined in [file/emscriptenFs.ts:91](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`object` | object |

**Returns:** *void*

___

###  getPreloadedPackage

▸ **getPreloadedPackage**(`remotePackageName`: string, `remotePackageSize`: number): *ArrayBuffer*

*Defined in [file/emscriptenFs.ts:92](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`remotePackageName` | string |
`remotePackageSize` | number |

**Returns:** *ArrayBuffer*

___

###  getValue

▸ **getValue**(`ptr`: number, `type`: string, `noSafe?`: undefined | false | true): *number*

*Defined in [file/emscriptenFs.ts:106](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |
`type` | string |
`noSafe?` | undefined &#124; false &#124; true |

**Returns:** *number*

___

###  instantiateWasm

▸ **instantiateWasm**(`imports`: WebAssemblyImports, `successCallback`: function): *WebAssemblyExports*

*Defined in [file/emscriptenFs.ts:93](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L93)*

**Parameters:**

▪ **imports**: *WebAssemblyImports*

▪ **successCallback**: *function*

▸ (`module`: WebAssemblyModule): *void*

**Parameters:**

Name | Type |
------ | ------ |
`module` | WebAssemblyModule |

**Returns:** *WebAssemblyExports*

___

###  intArrayFromString

▸ **intArrayFromString**(`stringy`: string, `dontAddNull?`: undefined | false | true, `length?`: undefined | number): *number[]*

*Defined in [file/emscriptenFs.ts:142](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`stringy` | string |
`dontAddNull?` | undefined &#124; false &#124; true |
`length?` | undefined &#124; number |

**Returns:** *number[]*

___

###  intArrayToString

▸ **intArrayToString**(`array`: number[]): *string*

*Defined in [file/emscriptenFs.ts:143](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`array` | number[] |

**Returns:** *string*

___

###  locateFile

▸ **locateFile**(`url`: string): *string*

*Defined in [file/emscriptenFs.ts:97](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *string*

___

###  onCustomMessage

▸ **onCustomMessage**(`event`: MessageEvent): *void*

*Defined in [file/emscriptenFs.ts:98](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | MessageEvent |

**Returns:** *void*

___

###  print

▸ **print**(`str`: string): *void*

*Defined in [file/emscriptenFs.ts:75](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *void*

___

###  printErr

▸ **printErr**(`str`: string): *void*

*Defined in [file/emscriptenFs.ts:76](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *void*

___

###  removeRunDependency

▸ **removeRunDependency**(`id`: any): *void*

*Defined in [file/emscriptenFs.ts:149](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | any |

**Returns:** *void*

___

###  setValue

▸ **setValue**(`ptr`: number, `value`: any, `type`: string, `noSafe?`: undefined | false | true): *void*

*Defined in [file/emscriptenFs.ts:105](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |
`value` | any |
`type` | string |
`noSafe?` | undefined &#124; false &#124; true |

**Returns:** *void*

___

###  writeArrayToMemory

▸ **writeArrayToMemory**(`array`: number[], `buffer`: number): *void*

*Defined in [file/emscriptenFs.ts:145](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`array` | number[] |
`buffer` | number |

**Returns:** *void*

___

###  writeAsciiToMemory

▸ **writeAsciiToMemory**(`str`: string, `buffer`: number, `dontAddNull`: boolean): *void*

*Defined in [file/emscriptenFs.ts:146](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L146)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |
`buffer` | number |
`dontAddNull` | boolean |

**Returns:** *void*

___

###  writeStringToMemory

▸ **writeStringToMemory**(`str`: string, `buffer`: number, `dontAddNull`: boolean): *void*

*Defined in [file/emscriptenFs.ts:144](https://github.com/cancerberoSgx/magica/blob/19bf60b/src/file/emscriptenFs.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |
`buffer` | number |
`dontAddNull` | boolean |

**Returns:** *void*
