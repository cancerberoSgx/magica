import pMap from 'p-map'
import { File } from '..'
import { main } from '../main/main'
import { imageInfo } from './imageInfo'

let builtInImages: File[]
// export enum imageBuiltInNames {'rose:'='rose:', 'logo:'='logo:', 'wizard:'='wizard:', 'granite:'='granite:', 'netscape:'='netscape:'}
type images = 'rose:' | 'logo:' | 'wizard:' | 'granite:' | 'netscape:'
const names: images[] = ['rose:', 'logo:', 'wizard:', 'granite:', 'netscape:']
/**
 * Gets ImageMagick built-in images like `rose:`, `logo:`, etc in the form of {@link File}s. 
 * @param builtIn if given it will resolve with with an array contianing only that image 
 */
export async function imageBuiltIn(builtIn?: images): Promise<File[]> {
  if (!builtInImages) {
    builtInImages = await pMap(names, async name => { // TODO: see if we can just use serial
      const info = await imageInfo(name)
      const { outputFiles } = await main({ command: `convert ${name} ${`output1.${info[0].image!.format!.toLowerCase()}`}`, inputFiles: [] })
      outputFiles[0].name = name
      return outputFiles[0]
    })
  }
  return builtIn ? builtInImages.filter(i => i.name === builtIn) : builtInImages
}

// /**
//  * shortcut of {@link getBuiltInImages} to get a single image by name
//  */
// export async function getBuiltInImage(name: string): Promise<File> {
//   const images = await imageBuiltIn()
//   return images.find(f => f.name === name)
// }
