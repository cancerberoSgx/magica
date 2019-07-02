import test from 'ava'
import { readdirSync, statSync } from 'fs'
import { lsR, LsRVisitorFile } from '../src/util/lsR'

test('simple', async t => {
  const r: LsRVisitorFile[] = []
  const result = lsR({
    path: __dirname,
    isDir: f => statSync(f).isDirectory(),
    ls: readdirSync,
    visitor: o => !!r.push(o) && false
  })
  t.false(r.find(f => __filename.includes(f.path))!.isDir)
  t.false(result.find(f => __filename.includes(f.path))!.isDir)
})

test.todo('break visit returning true')
