import { assert, assertEquals, assertIncludes, log, sleep } from '../testUtil'
// import { getGlobal, basename, waitForPredicate, sleep } from 'misc-utils-of-mine-generic';
// import { Magica } from '../../src';
declare var window:any
(
 async function () {

  try {
    await test1()
  } catch (ex) {
    assert(false, ex.toString())
    console.error('ERRRRRRROR', ex);
  }


})()


async function test1(){

   await sleep(3500)
  //@ts-ignore
  log('11111111111HJSJSLJLKJSLDKJALSKDJ' +  window.Magica);
  
  await sleep(3500)
  //@ts-ignore
  log('11111111111HJSJSLJLKJSLDKJALSKDJ' +  window.Magica);
  await sleep(3500)
  //@ts-ignore
  log('11111111111HJSJSLJLKJSLDKJALSKDJ' +  window.Magica);
  await sleep(3500)
  //@ts-ignore
  log('11111111111HJSJSLJLKJSLDKJALSKDJ' +  window.Magica);
  await sleep(3500)
  //@ts-ignore
  log('11111111111HJSJSLJLKJSLDKJALSKDJ' +  window.Magica);
  await sleep(3500)
  //@ts-ignore
  log('11111111111HJSJSLJLKJSLDKJALSKDJ' +  window.Magica);
  //@ts-ignore
  // await    waitForPredicate(()=>typeof window.Magica!=='undefined', {timeout: 10000, timeoutError: 'Magica not found'})
  //@ts-ignore
  const M= window.Magica as Magica
  log('222sadfsdfsdfsdf2220000222222'+M)

  assert(typeof M!=='undefined', 'Expected Magica global')
  // assertEquals(typeof getGlobal().Magica, 'object')

  debugger
  


 let result = await M.run({script: 'identify rose:'})
 assertIncludes(result.stdout.join(' ') , 'XXXXXXXXXXrose:=>ROSE PNM 70x46 70x46+0+0 8-bit sRGB 9673B')
 assertEquals(result.error, undefined)
 assertEquals(result.stderr.filter((e:any )=> !e.includes('.xml\' @ warning')), [])
 

 await sleep(500)

 log('TEST_FINISH =true')
 window.TEST_FINISH = 'TEST_FINISH =true'
 // result = await run({
 //   script: `
 //   convert -font helvetica.ttf -pointsize 44 -background lightblue -fill navy label:Seba tmp.png
 //   `,
 //   inputFiles: ['helvetica.ttf']
 // })
 // log('UMD WASM LOCATION '+result.stderr.join(' ')+result.stdout.join(' '))
 // assertEquals(result.stderr.filter(e => !e.includes('.xml\' @ warning')), [])
 // assertEquals(result.error, undefined)
 // assert(await imageCompare(await File.fromUrl('text.png'), result.outputFiles[0]), 'text output')

 // let result2 = await main({
 //   command: 'convert chala.tiff -rotate 45 output.bmp',
 //   inputFiles: [await File.fromUrl('chala.tiff')]
 // })
 // assertIncludes(result2.outputFiles[0].name, 'output.bmp')
 // assertEquals(result2.outputFiles.map(f => basename(f.name)), ['output.b mp'])
 // assertEquals(result2.error, undefined)
 // assertEquals(result2.stderr.filter(e => !e.includes('.xml\' @ warning')), [])
}