// import { GiRepository } from './gobjectTypes'
import { Parsed, ParsedObject, Entity, Type, Interface, Function, Field, Property } from "./typeGenerationTypes"
import camelCase from 'lodash.camelcase'


export interface RenderOptions {
  // /**
  //  * If given it will render only this Node and its dependencies. If not given it will render all Entities found in given namespace. 
  //  */
  // target?: Entity[]
  target: { [a: string]: Parsed[] }
  // ns:string
}

/**
 * Public node-gtk object-instrospection to TypeScript API.
 */
export function render(options: RenderOptions) {
  // if(!options.target){throw 'target mandatory '}
  // console.log(options.target.name);
  
  // const ns: { [s: string]: Entity[] } = {}
  // const a: Entity[] = []//[[options.target._ns]]
  
  // // all
  // visit(options.target, n => {
  //   console.log( n.name);
  //   ns[n._ns] = ns[n._ns] || []    
  //   n.infoType==='object' && ns[n._ns].push(n)
  // }, a)

// writeFileSync('tmpttt.txt', JSON.stringify(ns, null, 2))
  
  return `// Auto generated file - Do not modify!

type interface_ = any
type class_ = any
type utf8 = string
type gboolean = boolean
type gfloat = number

${Object.keys(options.target).map(n => `
export namespace ${n} {
${options.target[n].map(renderNode).join('\n ')}
}
`).join('\n\n')}
  `
}

function visit(o: Entity, f: (n: Entity) => void, visited: Entity[] =[]) {
  _visit(o);
  o.interfaces=o.interfaces || []
  o.interfaces.forEach(i => {
    visit(i, f, o.interfaces)
    i.iface_struct && visit(i.iface_struct, f)
  });
  o.prerequisites = o.prerequisites || []
   o.prerequisites.forEach(p => {
    visit(p, f, o.prerequisites)
  });
  // o.interfaces =o.interfaces || []
  // o.interfaces .forEach(p => {
  //   visit(p, f, visited)
  // });
  o.fields=o.fields || []
  o.fields.forEach(p => {
    visit(p, f, visited)
    p.type.callback && visit(p.type.callback, f, o.fields)
  });
  o.methods=o.methods || []
  o.methods.forEach(p => {
    visit(p, f,  o.methods)
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
      !visited ? f(n) : visited.push(n)
     visited.push(n)
    }
  }
}

export function renderNode(o: Parsed) {
  // if (o.infoType === 'object') {
  //   return renderClass(o as ParsedObject)
  // }
    if (o.infoType === 'interface') {
    return renderInterface(o as any)
  }
  // if (o.infoType === 'field') {
  //   return renderObject(o as ParsedObject)
  // }
  if (o.infoType === 'object') {
    return renderObject(o as any)
  }
      //@ts-ignore
  return 'notImpl: any '+o.name+'-'+o.typeName+' - '+o._type+'- '+o.infoType+'- '+o.type+'-'+o._ns+'-'+printType(o)+'-'
  // console.warn('NOT IMPL', o);

}


function renderObject(o: ParsedObject) {
  // console.log(JSON.stringify(o, null, 2))
  
  return `
  export declare class ${o.name}${o._parent && o._parent.name ? ` extends ${o._parent._ns}.${o._parent.name}` : ''} ${o.interfaces && o.interfaces.length ? ` implements ${o.interfaces.map(i => `${i._ns}.${i.name}`).join(', ')}` : ''} {
    ${(o.properties || []).map(p => `
    ${camelCase(p.name)}: ${printType(p)}
`.trim()).join('\n      ')}
  }
  `
}


function renderClass(o: ParsedObject) {
  return `
export declare class ${o.name}${o._parent && o._parent.name ? ` extends ${o._parent._ns}.${o._parent.name}` : ''} ${o.interfaces && o.interfaces.length ? ` implements ${o.interfaces.map(i => `${i._ns}.${i.name}`).join(', ')}` : ''} {
  ${(o.properties || []).map(p => `
  ${camelCase(p.name)}: ${printType(p)}
`.trim()).join('\n      ')}

 
 }`
  
//  ${(o.methods || []).map(renderMethod).join('\n\n')}

//   ${(o.fields || []).map(renderField).join('\n\n')}
}
function renderInterface(o: Interface) {
  return `
  export interface ${o.name}${o._parent && o._parent.name ? ` extends ${o._parent._ns}.${o._parent.name}` : ''}  {
    ${(o.properties || []).map(p => renderProperty(p).trim()).join('\n      ')}
  }
  `
}


function renderProperty(p:  Property) {
  return     `${p.writable ? '' : 'readonly '}${camelCase(p.name)}: ${printType(p)}`
}

function renderField(o: Field) {
  if(o.type.callback){
    return renderMethod(o.type.callback)
  }else {
  return renderProperty(o)
  }
}

function renderMethod(o: Function) {
  return `
${o.writable?'':'readonly: '}${camelCase(o.name)}: ${printType(o)}
  `
}

function printType(p: Entity) {
      //@ts-ignore
      const t = p.type&&p.type.type||p.typeName
      if(!t){return 'any'}
  const s =  t.substring(0,1).match(/[A-Z]/) ?`${p.type&&p.type._ns||p._ns}.${t}`:`${t}`
  const a = s.split('.') // object.Width, enum.Bar, etc
  const final = a.pop()||''
  return typeMap[final]||final||'any'
}

const typeMap : {[a:string]:string}= {
  'interface': 'interface_',
  'class': 'class_'
}