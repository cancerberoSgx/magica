// import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { setExample } from './app/dispatcher'
import { getInitialState } from './app/state'
import { getStore, _setStore } from './app/store'
import { App } from './ui/app'
import { createUrl, loadUrl, urlHasState } from './ui/common/urlState'
import {addTemplateHelper, magickLoaded} from 'magica'

async function main() {
  // magickLoaded.then(installTemplateExtensions)
  var s = await getInitialState()
  _setStore(s)
  render(<App />, document.getElementById('main'))
  if (urlHasState()) {
    await loadUrl()
  }
  else {
    await setExample(s.example)
  }
  getStore().add(() => {
    createUrl()
  })
}

main()

// function installTemplateExtensions() {
//   addTemplateHelper({ name: 'greet', fnCompileTime: (s: string) => `hello ${s}`, fnRunTime: (o: any) => o })
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
// }