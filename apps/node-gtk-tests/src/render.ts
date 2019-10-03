import { Parsed, ParsedObject, Entity, Type } from './gobjectTypes'


export function render(o: Entity) {
  const ns: { [s: string]: Parsed[] } = {}
  const a = []
  visit(o, n => {
    ns[n._ns] = ns[n._ns] || []
    ns[n._ns].push(n)
  }, a)
  
  // console.log(a);
  // console.log(ns.Gtk);
  
  return `
type interface = any
type utf8 = string
type gboolean = boolean
type gfloat = number
${Object.keys(ns).map(n=>`
namespace ${n} {
${ns[n].map(n=>renderNode(n)+' asdas' ).join('\n ')}
}
`).join('\n\n')}
  `
}

function visit(o: Entity, f: (n: Entity) => void, visited: Entity[] = []) {
  _visit(o);
  (o.interfaces || []).forEach(i => {
    visit(i, f, visited)
  });
  (o.prerequisites || []).forEach(p => {
    visit(p, f, visited)
  });
  (o.interfaces || []).forEach(p => {
    visit(p, f, visited)
 p.iface_struct &&  visit(p.iface_struct, f, visited) 
 
  });
  (o.fields || []).forEach(p => {
    visit(p, f, visited)
    p.type.callback &&  visit(p.type.callback  , f, visited)
  });
  (o.methods || []).forEach(p => {
    visit(p, f, visited)
  })
  function _visit(n: Entity) {
    if(!n)return
    // console.log(n.name,n.type );
    
    if (!n.name || !n.type || !n.type._ns || !n.type.type|| !['interface', 'object', 'type', 'callback'].find(i=>n.type.type.startsWith(i))) {
      // console.log(n.name, n.type, n.type&& n.type._ns && n.type&&n.type.type);
      
      return
    }
    const k = {
      name: n.name, type: n.type.type, ns: n.type._ns
    }
    if (!visited.find(i => JSON.stringify(i) === JSON.stringify(k))) {
      f(n)
      visited.push(n)
    }
  }
}

export function renderNode(o: Parsed) {
  if (o.infoType === 'object') {
    return renderObject(o as ParsedObject)
  }
   if (o.infoType === 'field') {
    return renderObject(o as ParsedObject)
  }
  console.warn('NOT IMPL', o.type);
  
}

function renderObject(o: ParsedObject) {
  return `
declare class ${o.name}${o._parent&&o._parent.name ? ` extends ${o._parent._ns}.${o._parent.name}` : ''} ${o.interfaces && o.interfaces.length ? ` implements ${o.interfaces.map(i => `${i._ns}.${i.name}`).join(', ')}` : ''} {
  ${(o.properties||[]).map(p => `
${p.name}: ${p.type}
`.trim()).join('\n  ')}
}
  `
}
