// import 'babel-polyfill'
import { run, addTemplateHelper, magickLoaded } from 'magica'

self.onmessage = async e => {
  if (!e.data.magicaId) {
    throw new Error('message data without magicaId')
  }
  const r = await run(e.data)
  postMessage({ ...r, magicaId: e.data.magicaId }, undefined as any)
}

magickLoaded.then(installTemplateExtensions)

function installTemplateExtensions() {
  addTemplateHelper({ 
    name: 'getField', 
    fnCompileTime (s: string)   {
      return this.options.fields[s]
    }, 
    fnRunTime: (o: any) => o 
  })
//   addTemplateHelper({ name: 'fieldGet', fnCompileTime: (id:string, defaultValue='') => {
//     var el = document.querySelector<HTMLInputElement>(`#field-${id}`)
//     if(!el) {
//       console.error('fieldGet ERROR: element not found', `#field-${id}`);      
//       return  defaultValue 
//     }
//     return el.value
//   }, 
//   fnRunTime: (o: any) => o 
// })
//   addTemplateHelper({ name: 'fieldDeclare', fnCompileTime: (o:FieldDeclareOptions) => {
//     var el = document.querySelector<HTMLElement>(`#field-${o.id}`)
//     if(el) {
//       console.error('fieldDeclare ERROR: element exists:', `#field-${o.id}`);      
//       return
//     }
//     var container = document.querySelector<HTMLElement>(`${o.container||'body'}`)
//     if(!container) {
//       console.error('fieldDeclare ERROR: container not found exists:', `${o.container||'body'}`);      
//       return
//     }
//     el = document.createElement('span')
//     el.innerHTML = `<label>${o.label||o.id}<input type="text" id="field-${o.id}" value="${o.defaultValue}"></label>`
//     container.append(el)
//   }, 
//   fnRunTime: (o: any) => o
//  })
// }
// interface Options {
//   type?:Type
//   label?:string
//   id:string
//   defaultValue?:string
// }
// type Type='string'
// interface FieldDeclareOptions extends Options{
//   container?: string
}
