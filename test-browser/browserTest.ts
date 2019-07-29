import test from 'ava'
import { execSync } from 'child_process'
import { createReadStream } from "fs"
import { createServer, IncomingMessage, Server, ServerResponse } from "http"
import { Deferred, sleep } from 'misc-utils-of-mine-generic'
import { join, resolve } from 'path'
import puppeteer from 'puppeteer'

export async function staticServer(basePath: string, port = 9999): Promise<Server> {
  const server = await createServer((req: IncomingMessage, res: ServerResponse) => {
    var stream = createReadStream(join(basePath, req.url || ''))
    stream.on('error', function() {
      res.writeHead(404)
      res.end()
    })
    stream.pipe(res)
  }).listen(port)
  const p = new Deferred<Server>()
  await server
  server.on('listening', () => {
    p.resolve(server)
  })
  return p
}

test('browser tests', async t => {
  t.notThrows(() => execSync('npm run build', { stdio: 'inherit' }), 'npm run build')
  t.notThrows(() => execSync('rm -rf test-browser-outdir; mkdir -p test-browser-outdir ; cp dist/src/imageMagick/compiled/*.wasm test/assets/* test-browser-outdir', { stdio: 'inherit' }), 'copy dist/src/imageMagick/compiled/*.wasm')
  t.notThrows(() => execSync("npx parcel build test-browser/testBrowser.html --public-url './' -d test-browser-outdir --no-source-maps --no-minify", { stdio: 'inherit' }), 'npx parcel build')

  const server = await staticServer(resolve('test-browser-outdir'), 8080)
  const url = `http://localhost:8080/testBrowser.html`
  console.log(url)

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(url)
  await sleep(1500)

  t.true(await page.evaluate(() => !!document.getElementById('assert')), 'assert container not found')
  const asserts = await page.evaluate(() => document.getElementById('assert')!.innerHTML.trim() + '')
  t.deepEqual(asserts.trim(), '')
  const logs = await page.evaluate(() => document.getElementById('logs')!.innerHTML.trim())
  console.log('***LOGS***', logs.replace(/<br\/\>/g, '\n'))

  await browser.close()
  server.close()
})

