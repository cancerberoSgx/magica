import { TODO } from 'misc-utils-of-mine-generic'

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
export namespace nodeGtk {
  /**
   * Heads up ! all these APIs are not public
   * @internal
   * 
   */
  export namespace _GIRepository {
    /**
     * Usage: 
  ```js
  if (!nodegtk._isLoaded(ns, ver))
    GI.Repository_require.call(repo, ns, ver, 0);
  ```
     */
    export declare function Repository_require(this: GiRepository, ns: string, ver: string, n: number): void
    /**
   * Usage: 
```js
const nInfos = GI.Repository_get_n_infos.call(repo, ns);
  for (let i = 0;i < nInfos;i++) {
    const info = GI.Repository_get_info.call(repo, ns, i);
```
   */
    export declare function Repository_get_n_infos(this: GiRepository, ns: string): number
    /**
 * Usage: 
```js
const nInfos = GI.Repository_get_n_infos.call(repo, ns);
for (let i = 0;i < nInfos;i++) {
  const info = GI.Repository_get_info.call(repo, ns, i);
```
 */
    export declare function Repository_get_info(this: GiRepository, ns: string, index: number): GiInfo | undefined

    /**
 * Usage: 
```js
GI.Repository_require.call(repo, ns);
```
 */
    export declare function Repository_get_info(this: GiRepository, ns: string): void

    export declare function Repository_get_version(this: GiRepository, ns: string): string
    export declare function BaseInfo_get_name(this: GiInfo): string | undefined
    export declare function BaseInfo_get_namespace(this: GiInfo): string | undefined
    export declare function BaseInfo_get_type(this: GiInfo): BaseInfoType | undefined
    export declare function info_type_to_string(infotype: BaseInfoType): string | undefined
    export declare function type_info_get_tag(i: GiInfo): BaseInfoTag | undefined
    export declare function type_tag_to_string(t: BaseInfoTag): string | undefined
    export type BaseInfoType = number
    export type BaseInfoTag = number
  }
  export declare function require(ns: string, ver: string): GiRepository
  export declare function startLoop(): void


  //TODO: 
  // object_info_get_parent
// struct_info_get_method
// object_info_get_n_interfaces
// object_info_get_n_properties
// object_info_get_n_constants
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

}
export interface GiRepository {

}

export interface GiInfo {

}




export interface ParsedBase {
  _info: {},
  _type: number,
  _ns: string,
}
export interface Parsed extends ParsedBase {
  name: string;
  // _info: Info;
  // _type: number;
  type: Type;
  infoType: string;
  _flags: number;
  is_gtype_struct: boolean,
  is_foreign: boolean,
  constructor: any,
  _tag: number;
  tag?: string;
}
export interface ParsedObject extends Entity {
}
export interface Parent extends ParsedBase {
  name: string
}
export interface Entity extends Parsed {
  prerequisites: Prerequisite[];
  properties: Property[];
  methods: Function[];
  fields: Field[];
  constructor: TODO
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

export interface GiInfo {
}

export interface Prerequisites {
}

export interface Property extends Entity {
  // name: string
}

export interface Type extends ParsedBase {
  // _info: {},
  // _type: number,
  // _ns: string,
  infoType: string,
  _tag: number,
  type: string,
  size: number
  // type: string;
  transfer: string
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

export interface Argument extends Parsed {
  nullable: boolean;
}

export interface Signal {
}

export interface Vfunc {
}

export interface Constant {
}
