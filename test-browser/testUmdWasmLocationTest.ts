import test from 'ava'
import { execSync } from 'child_process'
import { resolve } from 'path'
import puppeteer from 'puppeteer'
import { staticServer } from "./staticServer"

declare var window: any

test.serial('browser tests', async t => {
  const htmlFile = 'testUmdWasmLocation.html'
  const port = 8081
  const testBrowserOutDir = 'tmp-browser-test-testUmdWasmLocation'
  t.notThrows(() => execSync(`rm -rf ${testBrowserOutDir}; mkdir -p ${testBrowserOutDir}`, { stdio: `inherit` }), `clean`)
  t.notThrows(() => execSync(`cp test-browser/${htmlFile} test/assets/helvetica.ttf test/assets/text.png test/assets/chala.tiff dist/src/imageMagick/compiled/magica.umd.js ${testBrowserOutDir}`, { stdio: `inherit` }), `copy statics"`)
  const url = `http://localhost:${port}/${htmlFile}`
  const server = await staticServer(resolve(`${testBrowserOutDir}`), port)
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  page.on('console', e => console.log(e.type(), e.text(), e.location(), e.args()))
  await page.goto(url)
  await page.evaluate(() => window.testUmdWasmLocationTEST_FINISH = undefined)
  await page.waitForFunction(() => !!window.testUmdWasmLocationTEST_FINISH || !!document.getElementById('assert') && !!document.getElementById('assert')!.innerHTML.trim(), { timeout: 30000 })
  t.true(await page.evaluate(() => !!document.getElementById(`assert`)), 'assert container not found')
  const asserts = await page.evaluate(() => document.getElementById('assert')!.innerHTML.trim() + '')
  t.deepEqual(asserts.trim(), '')
  t.true(await page.evaluate(() => !!document.getElementById(`logs`)), 'logs container not found')
  const logs = await page.evaluate(() => document.getElementById('logs')!.innerHTML.trim())
  console.log('\n  # LOGS:\n  * ', logs.replace(/<br>/g, '\n  * '))
  await browser.close()
  server.close()
})

