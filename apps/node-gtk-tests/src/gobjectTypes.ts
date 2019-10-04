
// /**
//  * Using public APIs example:
//  * 
// ```js
//   import { equal } from 'assert';
//   const nodegtk = require('node-gtk');
//   const Gtk = nodegtk.require('Gtk')
//   const GObject = nodegtk.require('GObject')
//   nodegtk.startLoop();
//   Gtk.init()
//   const win = new Gtk.Window()
//   equal(GObject.typeName(win.__gtype__), "GtkWindow")
// ```
//  */
// export namespace nodeGtk {
//   /**
//    * Heads up ! everything inside [_GIRepository] namespace is consider internal APIs and might not be supported in the future. 
//    * 
//    * Also notice that functions starting with upper-case need to be manually bind to [this] context instead of calling them directly. The following example funciton will fetch all types from given library like `Gtk` and version like `3.0`. Notice that some types could reference names in other libraries like `Gdk`:
    
// ````
// import  from 'node-gtk'
// gi.startLoop();

// function parseNamespace(ns:string, ver:string) {
// currentParsedNamespaceDependencies.length=0
//   const namespace = Object.create(null);
//   const repo = GI.Repository_get_default();
//   if (!gi._isLoaded(ns, ver))
//     GI.Repository_require.call(repo, ns, ver, 0);
//   const nInfos = GI.Repository_get_n_infos.call(repo, ns);
//   for (let i = 0;i < nInfos;i++) {
//     const info = GI.Repository_get_info.call(repo, ns, i);
//     const baseinfo = getInfo(info);
//     const basename = name(info);
//     namespace[basename] = baseinfo;
//   }
//   return {namespace, dependencies: currentParsedNamespaceDependencies}
//   // return Object.values(m).map(format);
// }
// ```
//    * 
//    * 
//    * with theh [GIRepository] instance. i.e: `Repository_get_n_infos.call(Gtk ,)`
//    * @internal
//    */
//   export namespace _GIRepository {
//     /**
//      * Usage: 
//   ```js
//   if (!nodegtk._isLoaded(ns, ver))
//     GI.Repository_require.call(repo, ns, ver, 0);
//   ```
//      */
//     export declare function Repository_require(this: GiRepository, ns: string, ver: string, n: number): void
//     /**
//    * Usage: 
// ```js
// const nInfos = GI.Repository_get_n_infos.call(repo, ns);
//   for (let i = 0;i < nInfos;i++) {
//     const info = GI.Repository_get_info.call(repo, ns, i);
// ```
//    */
//     export declare function Repository_get_n_infos(this: GiRepository, ns: string): number
//     /**
//  * Usage: 
// ```js
// const nInfos = GI.Repository_get_n_infos.call(repo, ns);
// for (let i = 0;i < nInfos;i++) {
//   const info = GI.Repository_get_info.call(repo, ns, i);
// ```
//  */
//     export declare function Repository_get_info(this: GiRepository, ns: string, index: number): GiInfo | undefined

//     /**
//  * Usage: 
// ```js
// GI.Repository_require.call(repo, ns);
// ```
//  */
//     export declare function Repository_get_info(this: GiRepository, ns: string): void

//     export declare function Repository_get_version(this: GiRepository, ns: string): string
//     export declare function BaseInfo_get_name(this: GiInfo): string | undefined
//     export declare function BaseInfo_get_namespace(this: GiInfo): string | undefined
//     export declare function BaseInfo_get_type(this: GiInfo): BaseInfoType | undefined
//     export declare function info_type_to_string(infotype: BaseInfoType): string | undefined
//     export declare function type_info_get_tag(i: GiInfo): BaseInfoTag | undefined
//     export declare function type_tag_to_string(t: BaseInfoTag): string | undefined
//   }
//     export type BaseInfoType = number
//     export type BaseInfoTag = number
//   export declare function require(ns: string, ver: string): GiRepository
//   export declare function startLoop(): void


// export declare enum GIArrayType {
//   GI_ARRAY_TYPE_C,
//   GI_ARRAY_TYPE_ARRAY,
//   GI_ARRAY_TYPE_PTR_ARRAY,
//   GI_ARRAY_TYPE_BYTE_ARRAY
// } 
//   //TODO: 
//   // object_info_get_parent
// // struct_info_get_method
// // object_info_get_n_interfaces
// // object_info_get_n_properties
// // object_info_get_n_constants
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

// }
// export interface GiRepository {

// }

// export interface GiInfo {
//   parent: GiInfo|string
//   name: GiInfo|string
//   infoType: 'function'|'interface'|'object'
// }


