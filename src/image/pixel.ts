import { File } from '../file';
import { main } from '../main/main';

export async function imagePixelColor(img: File, x: number, y: number): Promise<string> {
  const {outputFiles} = await main({inputFiles: [img], command: `convert ${img.name} -format %[pixel:p{${x},${y}}] info:info.txt`})
  return await File.toString(outputFiles[0])
}
