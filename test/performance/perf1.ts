import { deepEqual, ok } from 'assert'
import { serial, unique } from 'misc-utils-of-mine-generic'
import { main } from '../../src'
import { knownSupportedReadWriteImageFormats } from '../../src/image/support'
import { setOptions } from '../../src/options'

async function test() {

  console.log(process.memoryUsage())

  // HEADS UP, in node, with disabledNodeFs speed is 16 vs 26 because there are lots of small files written/read from fs, but memory consumtion is lot more:
  // {
  //   rss: 355467264,
  //   heapTotal: 174370816,
  //   heapUsed: 98058064,
  //   external: 286843065
  // }

  // {
  //   rss: 344264704,
  //   heapTotal: 126660608,
  //   heapUsed: 100813456,
  //   external: 281115650
  // }
  setOptions({ disableNodeFs: true })

  try {
    await serial(knownSupportedReadWriteImageFormats.map(format => async () => {
      // console.time(format)
      try {

        return await serial(['n.png', 'chala.tiff'].map(img => async () => {

          const command = `convert ${img} -rotate 180 -scale 128x128! ${unique('tmp')}.${format}`
          // console.log(command);
          try {
            let result = await main({
              command,
              inputFiles: [`test/assets/${img}`],
              debug: true
            })
            const outputFiles = result.outputFiles
            deepEqual(result.error, undefined)
            deepEqual(result.stderr.filter(s => !s.includes('UnableToOpenConfigureFile')), [])
            result = await main({
              command: `identify  ${outputFiles[0].name}`,
              inputFiles: outputFiles,
              debug: true
            })
              ;
            [format, '128x128'].forEach(s => assertIncludes(result.stdout.join('').toLowerCase(), s.toLowerCase()))
            deepEqual(result.error, undefined)
            deepEqual(result.stderr.filter(s => !s.includes('UnableToOpenConfigureFile')), [])

            await serial(
              knownSupportedReadWriteImageFormats
                .filter(f => f !== format).map(format2 => async () => {
                  try {
                    const command2 = `convert  ${outputFiles[0].name} -rotate 180 -scale 64x64! ${unique('tmp')}.${format2}`
                    let result2 = await main({
                      command: command2,
                      inputFiles: outputFiles,
                      debug: true
                    })
                    // writeFileSync('tmpperf/'+basename(result2.outputFiles[0].name), result2.outputFiles[0].content)
                    deepEqual(result2.error, undefined)
                    deepEqual(result2.stderr.filter(s => !s.includes('UnableToOpenConfigureFile')), [])
                    const c = `identify  ${result2.outputFiles[0].name}`

                    // tga/ico/otb to xcf convertion produces invalid output and identify fails silently  - no catch, no error, program ends abruptly - 
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
                        debug: true
                      })
                        ;
                      [format2, '64x64'].forEach(s => assertIncludes(result2.stdout.join('').toLowerCase(), s.toLowerCase()))
                      deepEqual(result2.error, undefined)
                      deepEqual(result2.stderr.filter(s => !s.includes('UnableToOpenConfigureFile')), [])
                    } catch (error) {
                      console.error('ERRRRRR', { error }, error);
                      ok(!error)
                      // throw error
                    }
                    return result2
                  } catch (error) {
                    console.error(error);
                    ok(!error)
                    // throw error
                  }
                }))
            return result

          } catch (error) {
            console.error(error);
            ok(!error)
            // throw error
          }
        }))
      } catch (error) {
        console.error(error);
        ok(!error)
        // throw error
      }
      // console.timeEnd(format)
    })
    )
  } catch (error) {
    console.error(error)
    ok(!error)
    // throw error
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
    // throw error
  }
  console.timeEnd('total time')
})()



export function assertIncludes(a: string, b: string) {
  ok(a.includes(b), 'Expected "' + a + '" to includes "' + b + '"')
}
