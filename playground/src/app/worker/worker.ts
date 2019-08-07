import 'babel-polyfill'
import { addTemplateHelper, magickLoaded, run, RunOptions } from 'magica'

self.onmessage = async e => {
  if (!e.data.magicaId) {
    throw new Error('message data without magicaId')
  }
  const r = await run(e.data)
  postMessage({ ...r, magicaId: e.data.magicaId }, undefined as any)
}

magickLoaded.then(installTemplateExtensions)

function installTemplateExtensions() {
  addTemplateHelper<string, string | undefined, any, any, RunOptions & { fields: { [k: string]: string | undefined } }>({
    name: 'get',
    fnCompileTime(s: string) {
      return this.options.fields[s]
    },
    fnRunTime: (o: any) => o
  })
}
