import { File } from '../file/file'
import { main } from '../main/main'
import { IFile } from '../types'

export async function imagePixelColor(img: IFile | undefined, x: number, y: number): Promise<string | undefined> {
  if (!img) { return }
  const { outputFiles } = await main({ inputFiles: [img], command: `convert ${img.name} -format %[pixel:p{${x},${y}}] info:info.txt` })
  return await File.toString(outputFiles[0])
}
