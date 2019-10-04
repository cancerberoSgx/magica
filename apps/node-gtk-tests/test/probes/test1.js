const inspect = require('../../src/inspect')
const {namespace, dependencies} = inspect.parseNamespace('Gtk')

// debugger
// console.log(gt);

// require('fs').writeFileSync('tmp2.json', JSON.stringify(Object.values(gtk) , null, 2))

// let fnInfos = inspect.infos.filter(i => i.infoType === 'function' && i.return_tag !== 'void' && i.args.some(a => a.direction != 'IN'))
// let fnInfos = inspect.infos.filter(i => i.infoType === 'object')
// // debugger
// fnInfos.forEach(f => console.log(inspect.formatFunction(f)))
require('fs').writeFileSync('tmp-interface.json', JSON.stringify( namespace.map(d=>d.name), null, 2))

// require('fs').writeFileSync('tmp-interface.json', JSON.stringify(Object.values(gtk).filter(i=>i.infoType==='interface').map(inspect.format), null, 2))