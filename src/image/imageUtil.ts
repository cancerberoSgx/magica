import { File } from '../file/file'
import { main } from '../main/main'
import { IFile } from '../types'

export async function imagePixelColor(img: IFile | undefined, x: number, y: number): Promise<string | undefined> {
  if (!img) { return }
  const { outputFiles } = await main({ inputFiles: [img], command: `convert ${img.name} -format %[pixel:p{${x},${y}}] info:info.txt` })
  return await File.toString(outputFiles[0]) || undefined
}

export async function colorCount(img: IFile | undefined): Promise<number | undefined> {
  if (!img) { return }
  const { outputFiles } = await main({ inputFiles: [img], command: `convert ${img.name} -unique-colors -format %w info:info.txt` })
  var s = await File.toString(outputFiles[0])
  return parseInt(s) || undefined
}
