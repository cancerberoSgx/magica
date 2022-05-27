// see http://www.fmwconcepts.com/imagemagick/ortoneffect/index.php
import { writeFileSync } from 'fs'
import { run } from '../../../src/main/run'
interface OrtonEffectConfig {
  source: string
  opacity: number
  blur: number
}
async function ortoneffect(config: OrtonEffectConfig) {
  const script = `
  convert ${config.source} ( -clone 0 -clone 0 -compose screen -composite -alpha set ) \\
  ( -clone 1 -blur 0x${config.blur} -alpha set -channel a -evaluate set ${config.opacity}% +channel ) \\
  -delete 0 -compose multiply -composite \\
  out.png
    `
    console.log(script);
    
  const result = await run({
    inputFiles: [config.source],
    script
  })
  result.outputFiles.forEach(f => writeFileSync(f.name, f.content))
  // console.log('RESULT', result);
  
}

;(async ()=>{
  try {
    await ortoneffect({source: 'Passion_Flower.jpeg', blur: 6, opacity: 100})
  } catch (error) {
    console.log('ERROR', error);
  }
})();