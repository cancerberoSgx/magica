import { renderNode } from '../src/render'
import {writeFileSync} from 'fs'
const inspect = require('../src/inspect') as {infos: any[], parseNamespace: any}
const gtk = inspect.parseNamespace('Gtk')
let fnInfos2 = inspect.infos.find(i => i.infoType === 'object' && i.name==='Button')//.slice(0, 10)

//  writeFileSync('tmp.json', JSON.stringify(fnInfos2, null, 2))

const s= `
type interface = any
type utf8 = string
type gboolean = boolean
type gfloat = number

${renderNode(fnInfos2)}`



writeFileSync('tmp.ts', s)