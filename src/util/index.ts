import { getFileName, getFilePath, isDir, isFile, readFile, writeFile } from './fileUtil'
import { listFilesRecursively, ls } from './lsR'
import { mkdirp } from './mkdirp'
import { rmRf } from './rmRf'

export const fileUtil = {
  listFilesRecursively,
  rmRf,
  ls,
  isFile,
  isDir,
  readFile,
  writeFile,
  getFilePath,
  getFileName,
  mkdirp,
}
export { getMagica, Magica } from './magica'
