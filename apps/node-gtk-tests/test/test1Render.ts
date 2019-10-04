import { renderNode } from '../src/render'
import {writeFileSync} from 'fs'
import { objectKeys } from 'misc-utils-of-mine-generic';
const inspect = require('../src/inspect') as {infos: any[], parseNamespace: any}
const {namespace, dependencies} = inspect.parseNamespace('Gtk')
// console.log(objectKeys(gtk));

// let fnInfos2 = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

// debugger
//  writeFileSync('tmp.json', JSON.stringify(fnInfos2, null, 2))

const t = namespace['Button']
const s= `
type interface = any
type utf8 = string
type gboolean = boolean
type gfloat = number

export namespace ${t._ns} {
  ${renderNode(t)}
  ${dependencies.map( renderNode).join('\n\n')}
}
`

writeFileSync('tmp.ts', s)