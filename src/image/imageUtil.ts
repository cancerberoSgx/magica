import { File } from '../file/file'
import { main } from '../main/main'
import { IFile } from '../types'
import { notUndefined, notFalsy } from 'misc-utils-of-mine-generic';

export async function imagePixelColor(img: IFile | undefined, x: number, y: number): Promise<string | undefined> {
  if (!img) { return }
  const { outputFiles } = await main({ inputFiles: [img], command: `convert ${img.name} -format %[pixel:p{${x},${y}}] info:info.txt` })
  return await File.asString(outputFiles[0]) || undefined
}

export async function colorCount(img: IFile | undefined): Promise<number | undefined> {
  if (!img) { return }
  const { outputFiles } = await main({ inputFiles: [img], command: `convert ${img.name} -unique-colors -format %w info:info.txt` })
  var s = await File.asString(outputFiles[0])
  return parseInt(s) || undefined
}

export function parseConvertVerbose(stdout: string[]) {
  // logo:=>bbb.rgba GIF 640x480=>800x754
  var r = /([^=]+)=>([^\s]+) ([a-zA-Z0-9]+) ([^=]+)=>([^\s]+)/
  return stdout.map(l => r.exec(l)).filter(notFalsy).map(m=>{
    var a = m[4].split('x')
    var b = m[5].split('x')
    return {
      inputName: m[1],
      outputName: m[2],
      inputFormat: m[3].toLowerCase(),
      inputSize: { width: parseInt(a[0]), height: parseInt(a[1]) },
      outputSize: { width: parseInt(b[0]), height: parseInt(b[1]) }
    }
  })
  // var m = stdout.map(l => r.exec(l)).find(notFalsy)
  // if (!m) {
  //   return
  // }
  
}