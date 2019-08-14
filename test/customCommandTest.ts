import test from 'ava'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { rm } from 'shelljs'
import { File, getOptions, magickLoaded, protectFile, RunResult } from '../src'
import { run } from '../src/main/run'
import { getFilePath, isFile, removeFile } from '../src/util/fileUtil'
import { filterResultStdErr } from './testUtil'

test('custom commands & protected files', async (t) => {
  var result: RunResult

  result = await run({
    script: `
convert rose: bar.gif
!js: c=>c.log('hello1')
!js: c=>c.log(...c.FS.readdir('.') )
!js: c=>c.log('hello2')
    `,
    protectOutputFiles: true,
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout.filter(notUndefined), ['hello1', 'bar.gif', 'hello2'])
  protectFile(getFilePath('bar.gif'), false)
  const { FS } = await magickLoaded
  t.deepEqual(isFile(getFilePath('bar.gif'), FS), true)
  removeFile('bar.gif', FS)
  t.deepEqual(isFile(getFilePath('bar.gif'), FS), false)

  result = await run({
    script: `
!js: c=>c.log('hello1')
!js: c=>c.log(...c.FS.readdir('.') )
convert rose: bar2.gif
!js: c=>c.log(...c.FS.readdir('.') )
!js: c=>c.log('hello2')
    `,
    protectOutputFiles: false,
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout.filter(notUndefined), ['hello1', 'hello2'])
})

test('custom commands support async ', async (t) => {
  var result = await run({
    script: `
convert chala.tiff tmp_foo.png
!js: async c=> {console.log(c.outputFiles.length); const f = c.File.asFile(c.outputFiles[0]) ; c.log(JSON.stringify(await f.size())) }
    `,
    inputFiles: [await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout, ['{"width":50,"height":50}'])
})


test.serial('protectFile false to unprotect', async (t) => {
  rm('-rf', getOptions().nodeFsLocalRoot + '/*')
  const { FS } = await magickLoaded
  var result: RunResult
  var fn = (f: string) => `
!js: c=>c.log(...c.FS.readdir('.') )
convert rose: ${f}
!js: c=>c.log(...c.FS.readdir('.') )
  `.trim()

  result = await run({
    script: fn('bar1.gif'),
    protectOutputFiles: true,
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout.filter(notUndefined), ['bar1.gif'])
  t.deepEqual(isFile(getFilePath('bar1.gif'), FS), true)

  result = await run({
    script: fn('bar2.gif'),
    protectOutputFiles: true
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout.filter(notUndefined), ['bar1.gif', 'bar1.gif', 'bar2.gif'])
  t.deepEqual(isFile(getFilePath('bar1.gif'), FS), true)
  t.deepEqual(isFile(getFilePath('bar2.gif'), FS), true)

  protectFile(getFilePath('bar1.gif'), false)
  protectFile(getFilePath('bar2.gif'), false)

  result = await run({
    script: fn('bar3.gif')
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout.filter(notUndefined), ['bar1.gif', 'bar2.gif'])
})




// test('includeOutputFiles', async (t) => {
//   var result = await run({
//     script: `
//     convert rose: foo.png
//     !js: async c=> {const f = c.File.asFile(c.files[0]) ; c.log(JSON.stringify(await f.size())) }
//     `,
//     inputFiles: [await File.fromFile('test/assets/chala.tiff')],
//   })
//   t.deepEqual(filterResultStdErr(result), [])
//   t.deepEqual(result.stdout, ['{"width":50,"height":50}'])
// })

test.todo('custom commands and templates together')

test.todo('register new processor')


