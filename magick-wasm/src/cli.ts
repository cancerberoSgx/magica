import { Options } from './main';

export function cli(o:Options) {
  if(o.help){
    printHelp()
    process.exit(0)
  }
}

function printHelp(){
  console.log(`
ImageMagick WASM builder

Usage: 

magick-wasm --type debug --quantumDepth 8 
  `);
  
}