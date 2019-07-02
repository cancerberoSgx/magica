import { existsSync } from 'fs'
import { isNode, objectKeys, serial } from 'misc-utils-of-mine-generic'
import { File } from '../file'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions, setOptions } from '../options'
import { Options, Result } from '../types'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { processCommand } from './command'

export async function main(o: Partial<Options>): Promise<Result> {
  // set options that user might given
  objectKeys(getOptions())
    .filter(k => !!o[k])
    .forEach(k => setOptions({ [k]: o[k] }))

  const { emscriptenNodeFsRoot, debug } = getOptions()
  const { FS, main } = await magickLoaded
  debug && console.log('main call given options: ', o)
  const files = await resolveInputFiles(o)
  FS.chdir(emscriptenNodeFsRoot)
  files.forEach(f => {
    const dirName = getFileDir(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    FS.writeFile(f.name, f.content)
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  let returnValue = main(processCommand(o.command!))

  const afterTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles = diffTree.map(f => ({
    name: f.path,
    content: FS.readFile(f.path)
  }))
  !o.noRemove && ls(emscriptenNodeFsRoot, FS).forEach(f => rmRf(f, FS))

  return {
    ...returnValue,
    outputFiles
  }
}

async function resolveInputFiles(o: Partial<Options>) {
  return await serial((o.inputFiles || []).map(f => async () => {
    if (typeof f === 'string') {
      if (isNode() && existsSync(f)) {
        return await File.fromFile(f)
      }
      else {
        return await File.fromUrl(f)
      }
    }
    else {
      return f
    }
  }))
}

