import { objectKeys } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import {  IFile } from '../types'
import { isProtectedFile, protectFile } from '../file/protected'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOptions, setOptions } from '../options'
import { Options, Result } from '../types'
import { listFilesRecursively, ls } from '../util/lsR'
import { mkdirp } from '../util/mkdirp'
import { rmRf } from '../util/rmRf'
import { getFileDir } from '../util/util'
import { processCommand } from './command'

export async function main(o: Partial<Options>): Promise<Result> {
  // set global options that user might given
  objectKeys(getOptions())
    .filter(k => !!o[k])
    .forEach(k => setOptions({ [k]: o[k] }))

  const { emscriptenNodeFsRoot, debug } = getOptions()
  const { FS, main } = await magickLoaded
  debug && console.log('main call given options: ', o)
  const files = await File.resolveOptions(o)
  FS.chdir(emscriptenNodeFsRoot)
  files.forEach(f => {
    const dirName = getFileDir(f.name)
    if (dirName.trim()) {
      mkdirp(dirName, p => FS.analyzePath(p).exists, FS.mkdir)
    }
    FS.writeFile(f.name, f.content)
  })

  const beforeTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const returnValue = main(processCommand(o.command!))

  const afterTree = listFilesRecursively(emscriptenNodeFsRoot, FS)

  const diffTree = afterTree.filter(f => !beforeTree.find(b => b.path === f.path))
  const outputFiles: IFile[] = diffTree.map(f => ({
    name: f.path,
    content: FS.readFile(f.path)
  }))
    .filter(f => !isProtectedFile(f.name))

  if (o.protectOutputFiles) {
    outputFiles.forEach(protectFile)
    outputFiles.length = 0
  }
  else {
    ls(emscriptenNodeFsRoot, FS).forEach(f => rmRf(f, FS, f => !isProtectedFile(f)))
  }
  return {
    ...returnValue,
    outputFiles
  }
}


