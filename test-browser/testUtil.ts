// import { stringifyJSON, Deferred } from 'misc-utils-of-mine-generic'

import { createReadStream } from "fs"
import { createServer, IncomingMessage, Server, ServerResponse } from "http"
import { join } from 'path';

export async function staticServer(basePath: string, port = 9999): Promise<Server> {
  const server = await createServer((req: IncomingMessage, res: ServerResponse) => {
    var stream = createReadStream(join(basePath, req.url || ''))
    stream.on('error', function() {
      res.writeHead(404)
      res.end()
    })
    stream.pipe(res)
  }).listen(port)
  // const p = new Deferred<Server>()
  return new Promise(async resolve=>{
    await server
    server.on('listening', () => {
      // p.resolve(server)
      resolve(server)
    })
  })
  // return p
}

export function assertEquals(a: any, b: any, s='') {
  const aS = stringifyJSON(a || '', 'JSON.stringify(a) thrown'), bS = stringifyJSON(b || '', 'JSON.stringify(b) thrown')
  assert(aS === bS, (s?(s+': '):'')+'Expected "' + aS + '" to equals "' + bS + '"')
}

export function assertIncludes(a: string, b: string, s='') {
  assert(a.includes(b), (s?(s+': '):'')+'Expected "' + a + '" to include "' + b + '"')
}

export function assert(t: boolean, msg: string, s='') {
  if (!t) {
    document.getElementById('assert')!.innerHTML += ((s?(s+': '):'')+msg)
  }
}

export function log(msg: string) {
  document.getElementById('logs')!.innerHTML += msg + '<br/>'
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
export function stringifyJSON<K = any>(s: K, defaultValue: string | undefined = undefined): string | undefined {
  try {
    return JSON.stringify(s)
  } catch (error) {
    return defaultValue
  }
}