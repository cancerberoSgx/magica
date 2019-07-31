import { Options, main } from './main';
import { defaultLibraries } from './template';

export function cli(o:Options) {
  if(o.help){
    printHelp()
    process.exit(0)
  }
  const librariesS = o.noLibraries ? '' : (o.libraries as any as string || defaultLibraries.join(','))
  o.libraries = librariesS.split(',') as any
  main(o)
}

function printHelp(){
  console.log(`
ImageMagick WASM builder

Usage: 

magick-wasm --type debug --quantumDepth 8 
  `);
  
}