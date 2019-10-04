import { Parsed, ParsedObject, Entity, Type, GiRepository } from './gobjectTypes'
import camelCase from 'lodash.camelcase'
export interface RenderOptions {
  o: Entity
  modules: { [a: string]: GiRepository }
}

export function render(options: RenderOptions) {
  const ns: { [s: string]: Parsed[] } = {}
  const a: any[] = []
  visit(options.o, n => {
    ns[n._ns] = ns[n._ns] || []
    ns[n._ns].push(n)
  }, a)
  return `
type interface = any
type utf8 = string
type gboolean = boolean
type gfloat = number
${Object.keys(ns).map(n => `
namespace ${n} {
${ns[n].map(n => renderNode(n) + ' asdas').join('\n ')}
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
    p.iface_struct && visit(p.iface_struct, f, visited)
  });
  (o.fields || []).forEach(p => {
    visit(p, f, visited)
    p.type.callback && visit(p.type.callback, f, visited)
  });
  (o.methods || []).forEach(p => {
    visit(p, f, visited)
  })
  function _visit(n: Entity) {
    if (!n) return
    if (!n.name || !n.type || !n.type._ns || !n.type.type || !['interface', 'object', 'type', 'callback'].find(i => n.type.type.startsWith(i))) {
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
  // if (o.infoType === 'field') {
  //   return renderObject(o as ParsedObject)
  // }
  console.warn('NOT IMPL', o.type);

}

function renderObject(o: ParsedObject) {
  // console.log(JSON.stringify(o, null, 2))
  
  return `
export namespace ${o._ns} {
  export declare class ${o.name}${o._parent && o._parent.name ? ` extends ${o._parent._ns}.${o._parent.name}` : ''} ${o.interfaces && o.interfaces.length ? ` implements ${o.interfaces.map(i => `${i._ns}.${i.name}`).join(', ')}` : ''} {
    ${(o.properties || []).map(p => `
    ${camelCase(p.name)}: ${printType(p)}
`.trim()).join('\n      ')}
  }
}
  `
}

function printType(p: Entity) {
  const s =  p.type.type.substring(0,1).match(/[A-Z]/) ?`${p.type._ns}.${p.type.type}`:`${p.type.type}`
  const a = s.split('.') // object.Width, enum.Bar, etc
  return a.pop()
}