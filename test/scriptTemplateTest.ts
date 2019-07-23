import test from 'ava'
import { addTemplatePreprocessorContextMutator, File, imageCompare } from '../src'
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
  addTemplatePreprocessorContextMutator({ name: 'greet', fsCompileTime: (s: string) => `hello ${s}`, fsRunTime: (o: any) => o })
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


test.only('template renderRuntimeArg', async t => {
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


test.skip('ls runtime helper', async (t) => {
  const result = await run({
    script: `
convert wizard: bar.gif 
identify '<$="bar.gif"$>'
`,
    debug: true,
    inputFiles: ['test/assets/n.png', 'test/assets/to_rotate.jpg', ... await File.resolve('test/assets/bridge.psd', { flags: ['protected'] })]
  })
  t.deepEqual(result.commands, [['convert', 'wizard:', 'bar.gif'], ['convert', 'rose:', 'bar.gif', 'tmp_home_dev_proc_w2.gif']])
})

