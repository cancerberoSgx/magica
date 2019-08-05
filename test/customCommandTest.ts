import test from 'ava'
import { notUndefined } from 'misc-utils-of-mine-generic'
import { File } from '../src'
import { run } from '../src/main/run'
import { filterResultStdErr } from './testUtil'

test('custom commands & protected files', async (t) => {
  const script = `
  convert rose: bar.gif
  !js: c=>c.pushStdout('hello')
  !js: c=>c.pushStdout(...c.FS.readdir('.') )
  !js: c=>c.pushStdout('hello2')
  `
  var result = await run({
    script,
    protectOutputFiles: true,
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout.filter(notUndefined), ['hello', 'bar.gif', 'hello2'])
  result = await run({
    script
  })
  t.deepEqual(result.stdout.filter(notUndefined), ['hello', 'hello2'])
})

test('custom commands support async ', async (t) => {
  var result = await run({
    script: `
    !js: async c=> {const f = c.File.asFile(c.files[0]) ; c.pushStdout(JSON.stringify(await f.size())) }
    `,
    inputFiles: [await File.fromFile('test/assets/chala.tiff')],
  })
  t.deepEqual(filterResultStdErr(result), [])
  t.deepEqual(result.stdout, ['{"width":50,"height":50}'])
})

test.todo('custom commands and templates together')

test.todo('register new processor')


