import test, { ExecutionContext } from 'ava'
import { execSync } from 'child_process'
import { Deferred, sleep, waitForPredicate } from 'misc-utils-of-mine-generic'
import { join, resolve } from 'path'
import puppeteer from 'puppeteer'
import { staticServer } from './testUtil';
import { rm, mkdir } from 'shelljs';
import { writeFileSync, existsSync } from 'fs';


test.serial('browser tests', async t => {
  t.true(await testHtml('testBrowser.html', t, ['cp dist/src/imageMagick/compiled/*.wasm test/assets/* test-browser-outdir']))
})

// test.serial('umd bundle loading wasm using script src param', async t =>{
//   t.true(await testHtml('testBrowserUmdWasmLocationParam.html', t) )
// })




async function testHtml(htmlFile:string, t: ExecutionContext, extraCommands:string[]=[]){
  const testBrowserOutDir = 'test-browser-outdir'
  // t.notThrows(() => execSync('npm run build', { stdio: 'inherit' }), 'npm run build')
  t.notThrows(() => execSync(`rm -rf ${testBrowserOutDir}; mkdir -p ${testBrowserOutDir}`, { stdio: `inherit` }), `rm -rf ${testBrowserOutDir}`)
  extraCommands.forEach(c=>{
    t.notThrows(() => execSync(c, { stdio: `inherit` }), `extra command failed `+c)    
  })
  t.notThrows(() => execSync(`npx parcel build test-browser/${htmlFile} --public-url './' -d ${testBrowserOutDir} --no-source-maps --no-minify`, { stdio: `inherit` }), `npx parcel build`)
  
  const url = `http://localhost:8080/${htmlFile}`
  console.log(url)
  const server = await staticServer(resolve(`${testBrowserOutDir}`), 8080)
  await sleep(3000)
  

  
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  await page.goto(url, {timeout: 30000})//, {waitUntil: 'domcontentloaded'})
  await sleep(2000)
  // t.true(await page.evaluate(() => typeof (window as any).TEST_FINISH==='undefined'), 'expected TEST_FINISH to be undefined before test start')

  const timeout = 15000
  //@ts-ignore
  // await page.waitForFunction(()=>typeof window.TEST_FINISH!=='undefined' || !!document.getElementById('assert') && !!document.getElementById('assert').innerHTML.trim(), {timeout})
  var c = await waitForPredicate(()=>page.evaluate(()=>window.TEST_FINISH  || document.getElementById('assert') && document.getElementById('assert').innerHTML.trim()), {timeout})
  console.log('SJHSJSJKJKSJKSJKHSJKHS', c)
  await page.screenshot({path: 'tmp_'+Date.now()+'tmp_scc.png'})
  // t.true(await page.evaluate(() => typeof (window as any).TEST_FINISH!=='undefined'), 'expected TEST_FINISH not to be undefined after test ends')
  
  await sleep(1500)
  
  t.true(await page.evaluate(() => !!document.getElementById(`assert`)), 'assert container not found')
  const asserts = await page.evaluate(() => document.getElementById('assert')!.innerHTML.trim() + '')
  
  t.deepEqual(asserts.trim(), '')
  const logs = await page.evaluate(() => document.getElementById('logs')!.innerHTML.trim())
  console.log('***LOGS***', logs.replace(/<br\/\>/g, '\n'))
  
  await browser.close()
  server.close()
  return true
}


// const remoteWasm = 'https://unpkg.com/magica@0.2.3/dist/src/imageMagick/compiled/magick.wasm'
// var html = `
// <!DOCTYPE html>
// <html>
// <head>
//   <title>umd bundle test</title>
// </head>
// <body>  
//   <script src="../dist/src/imageMagick/compiled/magica.umd.js?MAGICA_WASM_LOCATION=${remoteWasm}"></script>
//   <script src="../test-browser/tests/umdWasmLocation.ts"></script>
// </body>
// </html>
// `
// t.notThrows(()=>  execSync('npm run build'))
// var f = 'tmp_umd-bundle-test-out'
// var f2 = `${f}/build`
// rm('-rf', f)
// mkdir('-p', f)
// writeFileSync(`${f}/index.html`, html)
// t.notThrows(()=>  execSync(`npx parcel build ${f}/index.html -d ${f2}`))
// t.true(existsSync(`${f2}/index.html`))