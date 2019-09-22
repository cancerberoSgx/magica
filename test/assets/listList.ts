import { writeFileSync } from 'fs'
import { notSame } from 'misc-utils-of-mine-generic'
import { run } from '../../src'

export async function listList() {
  const s = `// automatically generated file with IM lists. Uses wasm distribution to query lists and names using 'convert -list list' and then 'convert -list Xxx'
`
  const { stdout: lists } = await run({ script: 'convert -list list' })
  const body = await Promise.all(lists.map(name => ['Boolean', 'Cache', 'Function', 'Storage'].includes(name) ? name + '_' : name).map(async list => {
    const { stdout: names } = await run({ script: `convert -list ${list}` })
    return `
export enum ${list} {
  ${names.map(s => s.trim()).filter(s => isNaN(parseInt(s))).map(name => `'${name.replace(/'/gm, '\\\'')}' = '${name.replace(/'/gm, '\\\'')}'`).filter(notSame).join(',\n  ')}
}`
  }))


  return `// automatically generated file with convert -list. See test/assets/listList.ts. Uses wasm distribution to query lists and names using 'convert -list list' and then 'convert -list Xxx'

export namespace imList {

${body.join('\n\n')}

}

`

}

(async () => {
  writeFileSync('src/imageMagick/imLists.ts', await listList())
  // console.log(await listList());

})()
