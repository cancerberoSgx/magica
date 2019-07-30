import test from 'ava'
import { writeFileSync } from 'fs'
import { File, run, imageCompare } from '../src'
import { imageBuiltIn } from '../src/image/imageBuiltIn'
import { imagePixelColor } from '../src/image/pixel'
import { listFormat } from '../src/image/support'

test('imagePixelColor', async t => {
  const c = await imagePixelColor(await File.fromFile('test/assets/n.png'), 20, 20)
  t.deepEqual(c, 'srgb(178,182,181)')
})

test('imageBuiltIn with no args should return all ', async t => {
  const c = await imageBuiltIn()
  t.deepEqual(c.map(f => f.name), ['rose:', 'logo:', 'wizard:', 'granite:', 'netscape:'])
})

test('imageBuiltIn with name should return only given ', async t => {
  const c = await imageBuiltIn('logo:')
  t.deepEqual(c.map(f => f.name), ['logo:'])
})

test('listFormat', async t => {
  const c = await listFormat()
  t.truthy(c.find(f => f.name.includes('GIF')))
})

test.skip('fft', async t => {
  const c = await run<File>({
    // debug: true,
    script: `
    convert -size 32x32 gradient: -chop 0x1 -rotate 90 -evaluate sine 16 sine4.png
    convert sine4.png -fft +delete -contrast-stretch 0 -evaluate log 100 sine4_spectrum.png`
  })
  // const a = c.outputFiles[0]
  // writeFileSync('tmp33.png', a.content)
  // console.log(c);
  // t.deepEqual([], c.stderr)
  
  // const expected = await File.fromFile('test/assets/fftsin.png')
  // const b =
  // console.log(a, b!.content.toString());
  // t.true(await a.equals2(await File.fromFile('test/assets/fftsin.png')))
  // t.true(await a.equals2(b))
  t.true(await imageCompare( await File.fromFile('test/assets/ttf1.png'), c.outputFiles[0]))

  // t.true(true)
  // t.true(await  a.equals2(expected))
  
  // console.log(c.stderr)
  // c.results.map(r=>r.outputFiles).flat().forEach((f, i)=>writeFileSync(i+'.png', f.content))//'tmp_fft2.jpg', c.outputFiles[1]. content)
})

