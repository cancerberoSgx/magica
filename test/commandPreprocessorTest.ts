import test from 'ava'
import { File, imageCompare, addTemplatePreprocessorContextMutator } from '../src'
import { run } from '../src/main/run'
import { writeFileSync } from 'fs';

test('script template', async t => {
  const result = await run({
    script: `
      identify <%= inputFiles[1].name%>
      `,
    inputFiles: [await File.fromFile('test/assets/n.png'), await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(result.stdout, ['chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B 0.000u 0:00.000'])
})

test('script template with comments multi lines and spaces', async t => {
  const result = await run({
    script: `
      # c1 
      identify \\
      # c2
      <%= inputFiles[0].name%>
      # c3
      `,
    inputFiles: [await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(result.stdout, ['chala.tiff TIFF 50x50 50x50+0+0 8-bit sRGB 7824B 0.000u 0:00.000'])
})

test('async templates so they works with await expressions (I can call main() or run() or imageInfo() from template js', async t => {
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
  addTemplatePreprocessorContextMutator(c=>({...c, greet: (s:string)=>'hello '+s}))
  const result = await run({
    script: `
convert -font helvetica.ttf -pointsize 24 -background lightblue -fill navy 'label:<%=greet("Seba")%>' tmp.png
      `,
      inputFiles: ['test/assets/helvetica.ttf']
  })
  t.true(await imageCompare(result.outputFiles[0], await File.fromFile('test/assets/text2.png')))
})

test.todo('register new processor')
