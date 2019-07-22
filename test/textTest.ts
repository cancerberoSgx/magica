import test from 'ava'
import {   run, File } from '../src'
import { writeFileSync } from 'fs';

test.skip('should render text', async t => {
  try {
    
    const result = await run({
      // debug: true,
      script: `
convert -font helvetica.ttf -pointsize 44 -background lightblue -fill navy label:Seba out.png
      `,
      inputFiles: [await File.fromFile('test/assets/helvetica.ttf')]
      // inputFiles: ['test/assets/helvetica.ttf']
      
    })
    // writeFileSync('tmp.png', result.outputFiles[0].content)
    console.log('jhshshs');
    t.deepEqual(undefined, undefined)
  // t.deepEqual(result.error, undefined)
  } catch (error) {
    console.error('err,', error);
  }

  // t.deepEqual(result.stdout, ['wizard:=>WIZARD GIF 480x640 480x640+0+0 8-bit sRGB 256c 99674B 0.000u 0:00.000'])
})
