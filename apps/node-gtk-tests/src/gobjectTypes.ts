
//  gtk

// const repo = GI.Repository_get_default();
//   if (!nodegtk._isLoaded(ns, ver))
//     GI.Repository_require.call(repo, ns, ver, 0);
//   const nInfos = GI.Repository_get_n_infos.call(repo, ns);
//   for (let i = 0;i < nInfos;i++) {
//     const info = GI.Repository_get_info.call(repo, ns, i);

// exports.require = giRequire
// exports.startLoop = internal.StartLoop
// exports.prependSearchPath = prependSearchPath
// exports.prependLibraryPath = prependLibraryPath
// exports.System = internal.System

/**
 * Using public APIs example:
 * 
```js
  import { equal } from 'assert';
  const nodegtk = require('node-gtk');
  const Gtk = nodegtk.require('Gtk')
  const GObject = nodegtk.require('GObject')
  nodegtk.startLoop();
  Gtk.init()
  const win = new Gtk.Window()
  equal(GObject.typeName(win.__gtype__), "GtkWindow")
```
 */
namespace nodeGtk {
/**
 * Heads up ! all these APIs are not public
 * @internal
 * 
 */
namespace _GIRepository {
  /**
   * Usage: 
```js
if (!nodegtk._isLoaded(ns, ver))
  GI.Repository_require.call(repo, ns, ver, 0);
```
   */
  export declare function Repository_require(this: _GIRepository, ns: string, ver: string , n:number): void
    /**
   * Usage: 
```js
const nInfos = GI.Repository_get_n_infos.call(repo, ns);
  for (let i = 0;i < nInfos;i++) {
    const info = GI.Repository_get_info.call(repo, ns, i);
```
   */
   export declare  function Repository_get_n_infos(this: _GIRepository, ns: string ):number
      /**
   * Usage: 
```js
const nInfos = GI.Repository_get_n_infos.call(repo, ns);
  for (let i = 0;i < nInfos;i++) {
    const info = GI.Repository_get_info.call(repo, ns, i);
```
   */
   export declare  function Repository_get_info(this: _GIRepository, ns: string , index: number): Info|undefined

      /**
   * Usage: 
```js
GI.Repository_require.call(repo, ns);
```
   */
   export declare  function Repository_get_info(this: _GIRepository, ns: string ): void
  
   export declare  function Repository_get_version(this: _GIRepository, ns: string):string
   export declare function BaseInfo_get_name(this:Info):string|undefined
      export declare function    BaseInfo_get_namespace(this:Info):string|undefined
  export declare function   BaseInfo_get_type(this:Info):BaseInfoType|undefined

  export declare function info_type_to_string(infotype: BaseInfoType):string|undefined
   export declare function type_info_get_tag(i:Info):BaseInfoTag|undefined
   export declare function type_tag_to_string(t: BaseInfoTag): string|undefined
type BaseInfoType = number
type BaseInfoTag = number
}

interface _GIRepository {
  
}

export interface Info{

}

  export declare function require(ns: string, ver: string ): _GIRepository
  export declare function startLoop():void
  
}

// function _isLoaded(ns: string, ver: string): boolean
  // function Repository_get_default(): Repository
  // BaseInfo_get_name
// }
// const name = (info) => GI.BaseInfo_get_name.call(info);
// const namespace = (info) => GI.BaseInfo_get_namespace.call(info);
// const getInfoType = (info) => GI.BaseInfo_get_type.call(info);
// const type_string = (infotype) => GI.info_type_to_string(infotype);
// const tag = (type_info) => GI.type_info_get_tag(type_info);
// const tag_string = (type_tag) => GI.type_tag_to_string(type_tag);
// const isDeprecated = (info) => GI.BaseInfo_is_deprecated.call(info)




export interface ParsedBase {
  name?:string
 "_info": {},
                    "_type": number,
                    "_ns": string,
}
export interface Parsed extends ParsedBase {
  name: string;
  // _info: Info;
  // _type: number;
  type: Type;
  infoType: string;
  _flags: number;
        "is_gtype_struct": boolean,
        "is_foreign": boolean,
        "constructor": any,
  _tag: number;
  tag?: string;
}
export interface ParsedObject extends Entity {
}
export interface Parent extends ParsedBase {
}
export interface Entity extends Parsed {
  prerequisites: Prerequisite[];
  properties: Property[];
  methods: Function[];
  fields: Field[];
  interfaces: Interface[];
  signals: Signal[];
  vfuncs: Vfunc[];
  constants: Constant[];
  _parent: Parent;
}

export interface Prerequisite extends Entity {
 
}
export interface Interface extends Entity {
  iface_struct: InterfaceStruct;
}
export interface InterfaceStruct extends Entity {
}
export interface Info {
}
export interface Prerequisites {
}
export interface Property extends Type {
  name: string
}
export interface Type  extends ParsedBase{

  // "_info": {},
  // "_type": number,
  // "_ns": string,
  "infoType": string,
  "_tag": number,
  "type": string,
  "size": number

  // type: string;
  "transfer": "NOTHING";
  isPointer: boolean;
}
export interface Function extends Entity {
  return_type: Type;
  n_args: 0;
  args: Argument[];
  // TODO: add as a global function too.!
  symbol: string;
}
export interface Field extends Entity {
  type: FieldType
  writable: boolean; //TODO: field.callback
}
export interface FieldType extends Type {
  callback?: Function
}
interface Argument extends Parsed {
  nullable: boolean;
}
export interface Signal {
}
export interface Vfunc {
}
export interface Constant {
}
