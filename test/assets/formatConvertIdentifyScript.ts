// this is a copy of test/performance/perf1.ts

import { deepEqual, ok } from 'assert'
import { serial, unique } from 'misc-utils-of-mine-generic'
import { main } from '../../src'
import { knownSupportedReadWriteImageFormats } from '../../src/image/support'
import { setOptions } from '../../src/options'

async function test() {
  console.log(process.memoryUsage())
  setOptions({ disableNodeFs: true })
  try {
    await serial(knownSupportedReadWriteImageFormats.map(format => async () => {
      try {
        return await serial(['n.png', 'chala.tiff'].map(img => async () => {
          const command = `convert ${img} -rotate 180 -scale 128x128! ${unique('tmp')}.${format}`
          try {
            let result = await main({
              command,
              inputFiles: [`test/assets/${img}`],
              // debug: true
            })
            const outputFiles = result.outputFiles
            deepEqual(result.error, undefined)
            deepEqual(result.stderr.filter(s => !s.includes('UnableToOpenConfigureFile') && !s.includes('Calling stub instead of')), [])
            result = await main({
              command: `identify  ${outputFiles[0].name}`,
              inputFiles: outputFiles,
              // debug: true
            })
              ;
            [format, '128x128'].forEach(s => assertIncludes(result.stdout.join('').toLowerCase(), s.toLowerCase()))
            deepEqual(result.error, undefined)
            deepEqual(result.stderr.filter(s => !s.includes('UnableToOpenConfigureFile') && !s.includes('Calling stub instead of')), [])

            await serial(
              knownSupportedReadWriteImageFormats
                .filter(f => f !== format).map(format2 => async () => {
                  try {
                    const command2 = `convert  ${outputFiles[0].name} -rotate 180 -scale 64x64! ${unique('tmp')}.${format2}`
                    let result2 = await main({
                      command: command2,
                      inputFiles: outputFiles,
                      // debug: true
                    })
                    deepEqual(result2.error, undefined)
                    deepEqual(result2.stderr.filter(s => !s.includes('UnableToOpenConfigureFile') && !s.includes('Calling stub instead of')), [])
                    const c = `identify  ${result2.outputFiles[0].name}`

                    // tga/ico/otb to xcf conversion produces invalid output and identify fails silently  - no catch, no error, program ends abruptly - 
                    // TODO: does this happens in the real CLI
                    if (command2.includes('.tga -rotate') && ['.dcm', '.xcf'].find(s => c.includes(s)) ||
                      command2.includes('.ico -rotate') && ['.dcm', '.xcf'].find(s => c.includes(s)) ||
                      command2.includes('.otb -rotate') && ['.dcm', '.xcf'].find(s => c.includes(s))
                    ) {
                      return
                    }
                    // console.log(c);
                    try {
                      result2 = await main({
                        command: c,
                        inputFiles: result2.outputFiles,
                        // debug: true
                      })
                        ;
                      [format2, '64x64'].forEach(s => assertIncludes(result2.stdout.join('').toLowerCase(), s.toLowerCase()))
                      console.log('Result for "' + c + '"', result2.stdout, result2.stderr, result2.error, result2.stderr.filter(s => !s.includes('UnableToOpenConfigureFile')));
                      deepEqual(result2.error, undefined)
                      deepEqual(result2.stderr.filter(s => !s.includes('UnableToOpenConfigureFile') && !s.includes('Calling stub instead of')), [])
                    } catch (error) {
                      console.error('ERRRRRR', { error }, error);
                      ok(!error)
                    }
                    return result2
                  } catch (error) {
                    console.error('ERRRRRR2', error);
                    ok(!error)
                  }
                }))
            return result
          } catch (error) {
            console.error('ERRRRRR33', error);
            ok(!error)
          }
        }))
      } catch (error) {
        console.error('ERRRRRR44', error);
        ok(!error)
      }
    })
    )
  } catch (error) {
    console.error('ERRRRRR55', error)
    ok(!error)
  }
  console.log(process.memoryUsage())

}
(async () => {
  console.time('total time')
  try {
    await test()
  } catch (error) {
    console.error(error)
    ok(!error)
  }
  console.timeEnd('total time')
})()



export function assertIncludes(a: string, b: string) {
  ok(a.includes(b), 'Expected "' + a + '" to includes "' + b + '"')
}
