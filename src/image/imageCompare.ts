import { File } from '../file/file'
import { main } from '../main/main'
import { IFile } from '../types'

/**
 * Compare the two images and return true if they are equal visually. Optionally, a margin of error can be provided using `fuzz`
 */
export async function imageCompare(img1?: IFile, img2?: IFile, fuzz: number = 0.015): Promise<boolean> {
  if (!img1 || !img2) {
    return false
  }
  const identical = await imageCompareNumber(img1, img2)
  return identical <= fuzz
}

async function imageCompareNumber(img1: IFile, img2: IFile): Promise<number> {
  const result = await main({
    inputFiles: [img1, img2], command: ['convert', img1.name, img2.name, '-resize', '256x256^!', '-metric', 'RMSE', '-format', '%[distortion]', '-compare', 'info:info.txt'],
  })
  const n = File.toString(result.outputFiles[0])
  return parseFloat(n)
}
