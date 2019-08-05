import test from 'ava'
import { File, imageCompare, run } from '../src'
import { filterResultStdErr } from './testUtil'

test('fft', async (t) => {
  const c = await run<File>({
    script: `
    convert -size 32x32 gradient: -chop 0x1 -rotate 90 -evaluate sine 16 sine4.png
    convert sine4.png -fft +delete -contrast-stretch 0 -evaluate log 100 sine4_spectrum.png`
  })
  t.deepEqual(undefined, c.error)
  t.deepEqual(filterResultStdErr(c), [])
  t.true(await imageCompare(await File.fromFile('test/assets/fft1.png'), c.outputFiles[0]))
})

test('lcms and -profile .icc profiles', async (t) => {
  const c = await run<File>({
    script: `
    convert  bluebells.png +profile "!veryverystrange,*" f1.png
    convert  bluebells.png -profile colorProfile2.icc f2.png
    convert  bluebells.png -profile colorProfile3.icc f3.png
 #   convert  bluebells.png -profile colorProfile2.icc -profile colorProfile3.icc -profile colorProfile2.icc -profile colorProfile3.icc  f4.png
    `,
    inputFiles: [
      await File.fromFile('test/assets/colorProfile2.icc'),
      await File.fromFile('test/assets/colorProfile3.icc'),
      await File.fromFile('test/assets/bluebells.png')
    ],
  })
  t.deepEqual(undefined, c.error)
  t.deepEqual(filterResultStdErr(c), [])

  // compare doesn't work for profiles... 
  // t.false(await imageCompare(c.results[1].outputFiles[0], c.results[2].outputFiles[0], 0.001))

  var i1 = await File.asFile(c.results[1].outputFiles[0]).infoOne()
  var i0 = await File.asFile(c.results[0].outputFiles[0]).infoOne()
  var i2 = await File.asFile(c.results[2].outputFiles[0]).infoOne()
  t.deepEqual(i0.profiles, undefined)
  t.deepEqual(i1.profiles, { icc: { length: 2924 } })
  t.deepEqual(i2.profiles, { icc: { length: 572, } })

  t.false(JSON.stringify(i0.properties).includes('icc:'))
  t.true(JSON.stringify(i1.properties).includes('Color LCD Calibrated2'))
  t.true(JSON.stringify(i2.properties).includes('"icc:description":"ACES CG Linear (Academy Color Encoding System AP1)"'))
  // console.log(i0.profiles, i0.properties);  
  // console.log(i2.profiles, i2.properties);
  // t.true(JSON.stringify(i0.properties).includes('Color LCD Calibrated2'))


  // var files = c.results.map(r=>r.outputFiles).flat()
  // writeFileSync('tmp_0.png', c.results[0].outputFiles[0].content)
  // writeFileSync('tmp_1.png', c.results[1].outputFiles[0].content)
  // writeFileSync('tmp_2.png', c.results[2].outputFiles[0].content)
  // files .forEach(f=>writeFileSync('tmp_'+f.name, f.content))
  // t.false(imageCompare(files[0], files[1]))



})

test.skip('autotrace', async (t) => {
  const result = await run<File>({
    script: `
    convert rose: p.pnm
    convert p.pnm -rotate 54 -scale 200% rose.svg`
  })
  // writeFileSync('tmpww.svg', result.outputFiles[0].content);
  t.deepEqual(filterResultStdErr(result), [])

  t.deepEqual(undefined, result.error)
  // t.true(await imageCompare(await File.fromFile('test/assets/fft1.png'), result.outputFiles[0]))
})
