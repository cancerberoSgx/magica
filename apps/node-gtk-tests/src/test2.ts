import { render } from './render'

const {writeFileSync} = require('fs')
// const fff = require('node-gtk')
// debugger;
const inspect = require('./inspect') as {infos: any[], parseNamespace: any}

// const 
// const gtk = inspect.parseNamespace('Gtk')
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
let fnInfos2 = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

 writeFileSync('tmp.json', JSON.stringify(fnInfos2, null, 2))


 let e = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

 writeFileSync('tmp2.ts', render(e))
