import { equal } from 'assert';

const nodegtk = require('node-gtk');
const Gtk = nodegtk.require('Gtk', '3.0')
const GObject = nodegtk.require('GObject')
nodegtk.startLoop();
Gtk.init()
const win = new Gtk.Window()
equal(GObject.typeName(win.__gtype__), "GtkWindow")
debugger
// import { notSame } from 'misc-utils-of-mine-generic';


const GI = nodegtk._GIRepository;
  const repo = GI.Repository_get_default();
  if (!nodegtk._isLoaded('Gtk', '3.0'))
    GI.Repository_require.call(repo, 'Gtk', '3.0', 0);
  const nInfos = GI.Repository_get_n_infos.call(repo, 'Gtk');
  const aaa:any[] = []
  for (let i = 0;i < nInfos-1;i++) {


    const info = GI.Repository_get_info.call(repo, 'Gtk', i);
//     aaa.push(info)
// if(info.__gtype__===4361517008) {
//   console.log(GI.registered_type_info_get_type_name(info));
  
// }
    
    // if(info.__gtype__===17||info.)
    // console.log('info', info.__gtype__);
    
    equal(GObject.typeName(info.__gtype__), 'GIBaseInfo')
const namespace =  GI.BaseInfo_get_namespace.call(info);
const type = GI.BaseInfo_get_type.call(info);
// if(type===1||type===3)continue
// console.log({type: GI.info_type_to_string(type)});

const typeName = GI.registered_type_info_get_type_name(info)||GI.registered_type_info_get_g_type(info)||''

if(!typeName)continue
if((typeName+'').toLowerCase().includes('button'))
console.log({typeName, namespace, infoType:GI.BaseInfo_get_type.call(info), typeId: info.__gtype__});
// if((typeName||'a').substring(0,1).toUppw type_string, tag_string });
// console.log({tag_string});

    // debugger
  }
    // console.log(aaa.map(a=>a.__gtype__).filter(notSame));
    
// const info1 = nodegtk._GIRepository.Repository_get_info.call(Gtk, '3.0', 1);
// const a = nodegtk._GIRepository.BaseInfo_get_type.call(info1)

// debugger 
// console.log(Object.keys(gtk).map(i=>([i, gtk[i]._ns])))

// let s = inspect.infos
// .filter(i => i.infoType === 'function')
// .map(f=>inspect.format(f))
// .filter(f=>f.parent==='NULL')
// .map(f=>`declare export function ${f.name}(): ${f.returnType}`)
// .join('\n')
// writeFileSync('gtkNullFunctions.ts', s)

// s = inspect.infos
// .filter(i => i.infoType === 'interface')
// .filter((n,i,a)=>a.indexOf(n)===a.findIndex(i=>i.name===n.name&&i.parent===n.parent))
// .map(f=>inspect.format(f))
// // .filter(f=>f.parent==='NULL')
// .map(f=>`declare export interface ${f.name} { }`)
// .join('\n')
// writeFileSync('gtkInterfaces.ts', s)

// debugger
// console.log(gt);

// require('fs').writeFileSync('tmp2.json', JSON.stringify(Object.values(gtk) , null, 2))

// let fnInfos = inspect.infos.filter(i => i.infoType === 'function' && i.return_tag !== 'void' && i.args.some(a => a.direction != 'IN'))
// // let fnInfos = inspect.infos.filter(i => i.infoType === 'object')
// // // debugger
// fnInfos.forEach(f => console.log(inspect.formatFunction(f)))
// let fnInfos2 = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

//  writeFileSync('tmp.json', JSON.stringify(fnInfos2, null, 2))


//  let e = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

//  writeFileSync('tmp2.ts', render(e))
