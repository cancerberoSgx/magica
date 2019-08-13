import test from 'ava'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { File, magickLoaded, protectFile, RunResult } from '../src'
import { run } from '../src/main/run'
import { getFilePath, isFile } from '../src/util/fileUtil'
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
  t.deepEqual(result.stdout.filter(notUndefined), ['hello1', 'bar2.gif', 'hello2'])
})

test('custom commands support async ', async (t) => {
  var result = await run({
    script: `
    !js: async c=> {const f = c.File.asFile(c.files[0]) ; c.log(JSON.stringify(await f.size())) }
    `,
    inputFiles: [await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout, ['{"width":50,"height":50}'])
})

test.todo('custom commands and templates together')

test.todo('register new processor')


