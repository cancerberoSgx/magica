import test from 'ava'
import { execSync } from 'child_process'
import { resolve } from 'path'
import puppeteer from 'puppeteer'
import { staticServer } from "./staticServer"

declare var window: any

test.serial('browser tests', async t => {
  const htmlFile = 'testMain.html'
  const testBrowserOutDir = 'tmp-browser-tests-output'
  t.notThrows(() => execSync(`rm -rf ${testBrowserOutDir}; mkdir -p ${testBrowserOutDir}`, { stdio: `inherit` }), `rm -rf ${testBrowserOutDir}`)
  t.notThrows(() => execSync(`cp dist/src/imageMagick/compiled/*.wasm test/assets/* ${testBrowserOutDir}`, { stdio: `inherit` }), `copy assets"`)
  t.notThrows(() => execSync(`npx parcel build test-browser/${htmlFile} --public-url './' -d ${testBrowserOutDir} --no-source-maps --no-minify`, { stdio: `inherit` }), `npx parcel build`)
  const url = `http://localhost:8080/${htmlFile}`
  const server = await staticServer(resolve(`${testBrowserOutDir}`), 8080)
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url)
  await page.evaluate(() => window.browserTest_ts_TEST_FINISH = undefined)
  await page.waitForFunction(() => !!window.browserTest_ts_TEST_FINISH || !!document.getElementById('assert') && !!document.getElementById('assert')!.innerHTML.trim(), { timeout: 10000 })
  t.true(await page.evaluate(() => !!document.getElementById(`assert`)), 'assert container not found')
  const asserts = await page.evaluate(() => document.getElementById('assert')!.innerHTML.trim() + '')
  t.deepEqual(asserts.trim(), '')
  t.true(await page.evaluate(() => !!document.getElementById(`logs`)), 'logs container not found')
  const logs = await page.evaluate(() => document.getElementById('logs')!.innerHTML.trim())
  console.log('  # LOGS:\n  * ', logs.replace(/<br>/g, '\n  * '))
  await browser.close()
  server.close()
})

