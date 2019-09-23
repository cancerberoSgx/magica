import { createReadStream } from "fs"
import { createServer, Server } from "http"
import { Fn } from 'misc-utils-of-mine-generic'
import { join } from 'path'

export function staticServer(basePath: string, port = 9999, onFound: Fn = () => { }, onNotFound: Fn = () => { }): Promise<Server> {
  return new Promise(async (resolve) => {
    const server = createServer((req, res) => {
      var url = resolveUrl(req.url)
      onFound && onFound(url)
      var stream = createReadStream(join(basePath, url || ''))
      stream.on('error', function() {
        onNotFound && onNotFound(url)
        res.writeHead(404)
        res.end()
      })
      stream.pipe(res)
    }).listen(port)
    server.on('listening', () => {
      resolve(server)
    })
  })
  function resolveUrl(url = '') {
    var i = url.indexOf('?')
    if (i != -1) {
      url = url.substr(0, i)
    }
    i = url.indexOf('#')
    if (i != -1) {
      url = url.substr(0, i)
    }
    return url
  }
}
