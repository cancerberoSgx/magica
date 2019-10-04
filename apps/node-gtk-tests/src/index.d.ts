// /**
//  * Using public APIs example:
//  * 
// ```ts
// const * as ni = require('node-gtk');
// const Gtk = ni.require('Gtk')
// const GObject = ni.require('GObject')
// ni.startLoop();
// Gtk.init()
// const win = new Gtk.Window()
// console.log(GObject.typeName(win.__gtype__)) // "GtkWindow"
// ```
//  */
// declare module 'node-gtk' {

//   /**
//    * TODO
//    */
//   export interface GiRepository {

//   }

//   /**
//    * TODO
//    */
//   export interface GiInfo {
//     // parent: GiInfo|string
//     // name: GiInfo|string
//     // infoType: 'function'|'interface'|'object'
//   }


//   /**
//    * Heads up ! everything inside [_GIRepository] namespace is consider internal APIs and might not be supported in the future. 
//    * 
//    * Also notice that functions starting with upper-case need to be manually bind to [this] context instead of calling them directly. The following example funciton uses these functions to fetch all types from given library like `Gtk` and version like `3.0` and type metaata. Notice that some names might be actually referencing types belonging to other libraries like `Gdk`:
    
// ````
// import {startLoop, _GIRepository as GI} from 'node-gtk'

// ecport function extractLibrary(ns: string, ver: string) {
//   gi.startLoop();
//   const library: GI.GiInfo[] = [];
//   // create an empty reporidoty to load the objects and
//   // load the library if not already loaded. Notice the use of `call`
//   const repo = GI.Repository_get_default();
//   if (!gi._isLoaded(ns, ver)) {
//     GI.Repository_require.call(repo, ns, ver, 0);
//   }
//   const nInfos = GI.Repository_get_n_infos.call(repo, ns);
//   for (let i = 0; i < nInfos; i++) {
//     const info = GI.Repository_get_info.call(repo, ns, i);
//     library.push(extractBasicInfo(info));
//   }
//   return library;
// }
// function extractBasicInfo(info: GI.GiInfo): BasicInfo {
//   const typeId = GI.BaseInfo_get_type.call(info);
//   return {
//     name: GI.BaseInfo_get_name.call(info),
//     ns: GI.BaseInfo_get_namespace.call(info),
//     typeId,
//     typeName: GI.info_type_to_string(typeId)
//   };
// }
// interface BasicInfo {
//   name:string
//   ns: string
//   typeId: number
//   typeName: string
// }
// ``` 
//    * @internal
//    */
//   export namespace _GIRepository {
//     /**
//      * Usage: 
//   ```js
//   if (!nodegtk._isLoaded(ns, ver))
//     GI.Repository_require.call(repo, ns, ver, 0);
//   ```
//      * @internal
//      */
//     export declare function Repository_require(this: GiRepository, ns: string, ver: string, n: number): void

//     /**
//      * Usage: 
// ```js
// const nInfos = GI.Repository_get_n_infos.call(repo, ns);
//   for (let i = 0;i < nInfos;i++) {
//     const info = GI.Repository_get_info.call(repo, ns, i);
// ```
//    * @internal
//    */
//     export declare function Repository_get_n_infos(this: GiRepository, ns: string): number

//     /**
//      * Usage: 
// ```js
// const nInfos = GI.Repository_get_n_infos.call(repo, ns);
// for (let i = 0;i < nInfos;i++) {
//   const info = GI.Repository_get_info.call(repo, ns, i);
// ```
//     * @internal
//     */
//     export declare function Repository_get_info(this: GiRepository, ns: string, index: number): GiInfo | undefined

//     /**
//      * Usage: 
// ```js
// GI.Repository_require.call(repo, ns);
// ```
//     * @internal
//     */
//     export declare function Repository_get_info(this: GiRepository, ns: string): void
//     export declare function Repository_get_default(): GiRepository
//     export declare function Repository_get_version(this: GiRepository, ns: string): string
//     export declare function BaseInfo_get_name(this: GiInfo): string | undefined
//     export declare function BaseInfo_get_namespace(this: GiInfo): string | undefined
//     export declare function BaseInfo_get_type(this: GiInfo): number
//     export declare function BaseInfo_is_deprecated(this: GiInfo): boolean

//    export declare function  GetTypeSize(...TODO: TODO[]):TODO
//     export declare function info_type_to_string(infotype: number): string | undefined
//     export declare function type_info_get_tag(i: GiInfo): number | undefined
//     export declare function type_tag_to_string(t: number): string | undefined
//     export declare function registered_type_info_get_type_name(i: GiInfo): string | undefined
//     export declare function registered_type_info_get_g_type(t: GiInfo): number
//  export declare function callable_info_get_n_args(info : GiInfo): number
//       export declare function object_info_get_parent(...TODO: TODO[]):TODO
//       export declare function struct_info_get_method(...TODO: TODO[]):TODO
//       export declare function object_info_get_n_interfaces(...TODO: TODO[]):TODO
//       export declare function object_info_get_n_properties(...TODO: TODO[]):TODO
//       export declare function object_info_get_n_constants(...TODO: TODO[]):TODO
// export declare function  function_info_get_flags(info : GiInfo): number
//  export declare function  union_info_get_n_methods(info : GiInfo): number
//  export declare function  union_info_get_method(info : GiInfo, i: number): TODO
//  export declare function isNoArgsConstructor(fn_info: TODO): TODO 
//  export declare function union_info_get_method(info : GiInfo, i: number): TODO
//   export declare function ustruct_info_get_n_methods(...TODO: TODO[]):TODO
//   export declare function utype_info_get_array_type(...TODO: TODO[]):TODO
//  export declare function utype_info_is_zero_terminated(...TODO: TODO[]):TODO
//  export declare function utype_info_get_array_fixed_size(...TODO: TODO[]):TODO
//  export declare function utype_info_is_pointer(...TODO: TODO[]):TODO

//  export declare function type_info_get_array_type(...TODO: TODO[]):TODO
//  export declare function type_info_is_zero_terminated(...TODO: TODO[]):TODO
//  export declare function type_info_get_array_fixed_size(...TODO: TODO[]):TODO
//  export declare function type_info_is_pointer(...TODO: TODO[]):TODO
//  export declare function type_info_get_interface(...TODO: TODO[]):TODO


//  export declare function value_info_get_value (...TODO: TODO[]):TODO
//  export declare function property_info_get_flags(...TODO: TODO[]):TODO
//  export declare function property_info_get_type(...TODO: TODO[]):TODO
//  export declare function property_info_get_ownership_transfer (...TODO: TODO[]):TODO


//   export declare function field_info_get_flags(...TODO: TODO[]):TODO
//   export declare function field_info_get_offset(...TODO: TODO[]):TODO
//  export declare function field_info_get_size(...TODO: TODO[]):TODO
//    export declare function  field_info_get_type(...TODO: TODO[]):TODO


// declare export function struct_info_get_size(...TODO:TODO[]):TODO
//   declare export function struct_info_get_alignment(...TODO:TODO[]):TODO
//   declare export function struct_info_is_gtype_struct(...TODO:TODO[]):TODO
//   declare export function struct_info_is_foreign(...TODO:TODO[]):TODO
//   declare export function union_info_get_size(...TODO:TODO[]):TODO
//   declare export function union_info_get_alignment(...TODO:TODO[]):TODO
//   declare export function  union_info_is_discriminated(...TODO:TODO[]):TODO


//   declare export function  struct_info_is_foreign(...TODO:TODO[]):TODO
//     declare export function  findBoxedConstructor(...TODO:TODO[]):TODO
//    declare export function  struct_info_get_n_methods(...TODO:TODO[]):TODO
//    declare export function  struct_info_get_method(...TODO:TODO[]):TODO
//     declare export function  struct_info_get_n_fields(...TODO:TODO[]):TODO
//     declare export function  struct_info_get_field(...TODO:TODO[]):TODO


// export declare const Transfer =TODO
//  export declare const FunctionInfoFlags = {
// IS_CONSTRUCTOR: number,
//  }
//  export declare const FieldInfoFlags = TODO

//   export declare const InfoType: {
//     UNION:TODO,
//     TYPE: TODO
//     ARRAY: TODO
//     CALLBACK:TODO
//   }
// export declare const TypeTag:TODO
// export declare const ArrayType:TODO

//   }

//   export declare function require(ns: string, ver: string): GiRepository
//   export declare function startLoop(): void
//   //TODO
//    export declare function  prependSearchPath(...TODO: TODO[]):TODO
//   export declare function prependLibraryPath(...TODO: TODO[]):TODO
// export declare const System : TODO

// export const _c: TODO
// }

// type TODO = any

// // export declare enum GIArrayType {
// //   GI_ARRAY_TYPE_C,
// //   GI_ARRAY_TYPE_ARRAY,
// //   GI_ARRAY_TYPE_PTR_ARRAY,
// //   GI_ARRAY_TYPE_BYTE_ARRAY
// // } 
//   //TODO: 

//   // function _isLoaded(ns: string, ver: string): boolean
//   // function Repository_get_default(): Repository
//   // BaseInfo_get_name
//   // }
//   // const name = (info) => GI.BaseInfo_get_name.call(info);
//   // const namespace = (info) => GI.BaseInfo_get_namespace.call(info);
//   // const getInfoType = (info) => GI.BaseInfo_get_type.call(info);
//   // const type_string = (infotype) => GI.info_type_to_string(infotype);
//   // const tag = (type_info) => GI.type_info_get_tag(type_info);
//   // const tag_string = (type_tag) => GI.type_tag_to_string(type_tag);
//   // const isDeprecated = (info) => GI.BaseInfo_is_deprecated.call(info)


//   //  gtk

//   // const repo = GI.Repository_get_default();
//   //   if (!nodegtk._isLoaded(ns, ver))
//   //     GI.Repository_require.call(repo, ns, ver, 0);
//   //   const nInfos = GI.Repository_get_n_infos.call(repo, ns);
//   //   for (let i = 0;i < nInfos;i++) {
//   //     const info = GI.Repository_get_info.call(repo, ns, i);

//   // exports.require = giRequire
//   // exports.startLoop = internal.StartLoop
//   // exports.prependSearchPath = prependSearchPath
//   // exports.prependLibraryPath = prependLibraryPath
//   // exports.System = internal.System



// // export interface ParsedBase {
// //   _info: {},
// //   _type: number,
// //   _ns: string,
// // }
// // export interface Parsed extends ParsedBase {
// //   name: string;
// //   // _info: Info;
// //   // _type: number;
// //   infoType: string;
// //   _flags: number;
// //   is_gtype_struct: boolean,
// //   is_foreign: boolean,
// //   constructor: any,
// //   _tag: number;
// //   typeName: string
// //   tag?: string;
// //   isDeprecated?: boolean
// // }
// // export interface ParsedObject extends Entity {
// // }
// // export interface Parent extends ParsedBase {
// //   name: string
// // }
// // export interface Entity extends Parsed {
// //   prerequisites: Prerequisite[];
// //   properties: Property[];
// //   gtype: any
// //   methods: Function[];
// //   type: Type;
// //   fields: Field[];
// //   constructor: TODO
// //   interfaces: Interface[];
// //   signals: Signal[];
// //   vfuncs: Vfunc[];
// //   constants: Constant[];
// //   _typeInfo: GiInfo
// //   transfer: string
// //   _parent: Parent;
// // }

// // export interface Prerequisite extends Entity {

// // }

// // export interface Interface extends Entity {
// //   iface_struct: InterfaceStruct;
// //   // prerequisites: Prerequisite[]
// // }

// // export interface InterfaceStruct extends Entity {
// // }

// // // export interface GiInfo {
// // // }

// // // export interface Prerequisites extends Parsed {
// // // }

// // export interface Property extends Entity {
// //   // transfer: any
// //   writable: boolean; //TODO: field.callback
// //   // name: string
// // }



// // export interface Type extends Parsed {
// //   elementType: Type
// //   fixed_size: number
// //   zero_terminated: boolean
// //   array_type: nodeGtk.GIArrayType
// //   // _info: {},
// //   // _type: number,
// //   // _ns: string,
// //   infoType: string,
// //   _tag: number,
// //   type: string,
// //   size: number
// //   // type: string;
// //   isPointer: boolean;
// // }

// // export interface Function extends Entity {
// //   canThrow: boolean
// //   skipReturn: boolean
// //   mayReturnNull: boolean
// //   return_tag: any
// //   return_type: Type;
// //   n_args: 0;
// //   writable: boolean; //TODO: field.callback
// //   args: Argument[];
// //   // TODO: add as a global function too.!
// //   symbol: string;
// //   isMethod : boolean
// //   isConstructor: boolean
// //   isGetter: boolean
// //   isSetter: boolean
// // }

// // export interface Field extends Entity {
// //   readable: boolean
// //   type: FieldType
// //   writable: boolean; //TODO: field.callback
// // }

// // export interface FieldType extends Type {
// //   callback?: Function
// // }

// // export interface Argument extends Entity {
// //   direction: any
// //   lengthPos: any
// //   skip: boolean
// //   return_value: boolean
// //   caller_allocates: boolean
// //   nullable: boolean;
// // }

// // export interface Signal extends Parsed {
// // }

// // export interface Vfunc extends Parsed {
// // }

// // export interface Constant extends Parsed {
// //   value: any

// // }

// // export interface Struct extends Entity {
// //   discriminator_type: any
// //   alignment: any
// //   size: any

// // }

// // export interface Enum extends Entity {
// //   values: any[]

// //   gtype: any
// //   size: any

// // }
