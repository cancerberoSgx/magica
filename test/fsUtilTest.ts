import test from 'ava'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { lsR, LsRVisitorFile } from '../src/util/lsR'
import { mkdirp } from '../src/util/mkdirp'

test('lsR', async t => {
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

test.todo('lsR break visit returning true')
test.todo('lsR incorrect args')

test('mkdirp', async t => {
  t.notThrows(() => execSync('rm -rf tmp/foo/bar'))
  t.false(existsSync('tmp/foo/bar'))
  mkdirp('tmp/foo/bar', existsSync, mkdirSync)
  t.true(existsSync('tmp/foo/bar'))
})

test.todo('mkdirp incorrect args')
