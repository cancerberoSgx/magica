import test from 'ava'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { addTemplateHelper, File, imageCompare } from '../src'
import { run } from '../src/main/run'

test('async templates so they works with await expressions (I can call main() or run() or imageInfo() from template js', async (t) => {
  const result = await run({
    script: `
<% 
var info = await imageInfo(inputFiles[0]) 
var bounds = info[0].image.geometry
%>
convert <%= inputFiles[0].name %> -resize <%= bounds.width+'x'+bounds.height %> tmp.png
      `,
    inputFiles: [await File.fromFile('test/assets/chala.tiff')],
  })
  t.true(await imageCompare(result.outputFiles[0], await File.fromFile('test/assets/chala.tiff')))
})


test('should be able to modify template context', async t => {
  addTemplateHelper({ name: 'greet', fnCompileTime: (s: string) => `hello ${s}`, fnRunTime: (o: any) => o })
  const result = await run({
    script: `
convert -font helvetica.ttf -pointsize 24 -background lightblue -fill navy 'label:<%=greet("Seba")%>' tmp.png
      `,
    inputFiles: ['test/assets/helvetica.ttf']
  })
  t.true(await imageCompare(result.outputFiles[0], await File.fromFile('test/assets/text2.png')))
})

test('ls compile time helper', async (t) => {
  const result = await run({
    script: `
convert wizard: bar.gif
convert rose: bar.gif '<%=( await ls({stdout: true, path: '/'})).join('_')%>.gif'
`,
  })
  t.deepEqual(result.commands, [['convert', 'wizard:', 'bar.gif'], ['convert', 'rose:', 'bar.gif', 'tmp_home_dev_proc_w2.gif']])
})

test('size helper', async (t) => {
  const result = await run({
    script: `
convert rose: bar.gif
<% 
var size = await size({file: inputFiles[0]})
%>
convert wizard: -resize <%= Math.round(size.width / 3) %>x<%= Math.round( size.height / 2) %> out.gif'
`,
    inputFiles: ['test/assets/n.png']
  })
  t.true(await imageCompare(result.outputFiles[0], await File.fromFile('test/assets/size1.gif')))
})

test('<$=$> expressions render at runtime', async t => {
  var result = await run({
    script: `
convert rose: -scale <$=44+9$>x88 foo.png
convert foo.png -rotate <$=30+6$> bar.png
    `
  })
  t.deepEqual(result.commands, [
    ['convert', 'rose:', '-scale', '53x88', 'foo.png'],
    ['convert', 'foo.png', '-rotate', '36', 'bar.png']])
})

test.only('custom commands', async (t) => {
  const script = `
  convert rose: bar.gif
  {  this.pushStdout('hello') }
  {  this.pushStdout(...FS.readdir('.')) } `
  var result = await run({
    script,
    protectOutputFiles: true,
  })
  t.deepEqual(result.stdout.filter(notUndefined), ['hello', 'bar.gif'])
  result = await run({
    script
  })
  t.deepEqual(result.stdout.filter(notUndefined), ['hello'])

})

test.skip('ls runtime helper', async (t) => {
  const result = await run({
    script: `
convert wizard: bar.gif 
identify '<$="bar.gif"$>'
`,
    debug: true,
    inputFiles: ['test/assets/n.png', 'test/assets/to_rotate.jpg', ... await File.resolve('test/assets/bridge.psd', { protected: true })]
  })
  t.deepEqual(result.commands, [['convert', 'wizard:', 'bar.gif'], ['convert', 'rose:', 'bar.gif', 'tmp_home_dev_proc_w2.gif']])
})

test.skip('spaces quotes and other bad chars', async (t) => {
  const result = await run({
    script: `     
<%=
function compileTimeFn(a){return a+buildTimeFn(a+1)}
%>
convert wizard: -rotate 33 bar.gif 
identify '<$="bar.gif"$>'
`,
    debug: true,
    inputFiles: ['test/assets/n.png', 'test/assets/to_rotate.jpg', ... await File.resolve('test/assets/bridge.psd', { protected: true })]
  })
  t.deepEqual(result.commands, [['convert', 'wizard:', 'bar.gif'], ['convert', 'rose:', 'bar.gif', 'tmp_home_dev_proc_w2.gif']])
})

