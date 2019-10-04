import { renderNode, render } from '../src/render'
import {writeFileSync} from 'fs'
import { objectKeys } from 'misc-utils-of-mine-generic';
import { extractObjects } from '../src/inspect'


const namesPace = 'Gtk'
const {library} =extractObjects('Gtk')
// console.log(objectKeys(gtk));

// let fnInfos2 = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

// debugger
//  writeFileSync('tmp.json', JSON.stringify(fnInfos2, null, 2))

// const t = parseNamespace['Button']
const s= `
type interface = any
type utf8 = string
type gboolean = boolean
type gfloat = number

export namespace ${namesPace} {
  ${library.map( renderNode).join('\n\n')}
}
`

  // ${renderNode(t)}
writeFileSync('tmp.ts', render({target: {Gtk: library}}))