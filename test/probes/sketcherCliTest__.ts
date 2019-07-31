// import { doesNotThrow } from 'assert'
// import { execSync } from 'child_process'
// import { mkdirSync } from 'fs'
// interface Options {
//   /**
//    *  GAIN is the edge gain (i.e. strength or intensity). Values are floats>=0. The default=5.
//    *
//   */
//   gain?: number
//   /**
//    * color SATURATION. Values are integers>=0. The default=100 (no change). 0 is grayscale and 200 is twice
//    * the saturation
//    */
//   saturation?: number
//   /**
//    * color HUE.  Values are integers>=0. The default=100 (no change). 0 is negative 180 degree rotation (toward
//    * blue). 200 is positive 180 degree rotation (toward green).
//    */
//   hue?: number
//   /**
//    *  THICKEN amount for edges. Values are integers>=0. The default=0 (no thickening).
//    */
//   thicken?: number
//   outfile: string
//   infile: string
//   /**
//    * sketch method; choices are: grayscale, color, screen, softlight, pegtoplight, hardlight, linearlight, and
//    *                     vividlight; default=grayscale
//    */
//   method?: 'pegtoplight' | 'softlight' | 'hardlight' | 'linearlight' | 'vividlight' | 'screen' | 'color' | 'grayscale'
// }

// /**
//  * 
//  Apply a sketch-like effect to an image.
//  */
// export function sketchMain({ infile, outfile, gain = 5.0, saturation = 100, hue = 100, thicken = 0, method = 'grayscale' }: Options) {

//   if (!infile || !outfile) {
//     throw new Error('!infile||!infile')
//   }

//   let dir = 'tmp____'
//   let swapping = ''
//   let modulating = '', thickening = ''
//   let graying = '', composing = '', deleting = ''
//   mkdirSync(dir, { recursive: true })
//   // read input image into temporary memory mapped (mpc) format image
//   doesNotThrow(() => execSync(`convert -quiet "${infile}" +repage ${dir}/tmpI.mpc`))
//   // set up for swap
//   if (`${method}` === `softlight` || `${method}` === `pegtoplight`) {
//     swapping = `+swap`
//   }
//   else {
//     swapping = ''
//   }
//   // set up for grayscale
//   if (`${method}` === `grayscale`) {
//     graying = `-colorspace gray`
//   }
//   else {
//     graying = ''
//   }
//   // set up for composite
//   if (`${method}` === `grayscale` || `${method}` === `color`) {
//     composing = ``
//     deleting = `-delete 0`
//   }
//   else {
//     composing = `-compose ${method} -composite`
//     deleting = ``
//   }
//   // set up for saturation
//   if (saturation != 100 || hue != 100) {
//     modulating = `-modulate "100,${saturation},${hue}"`
//   }
//   else {
//     modulating = ""
//   }
//   // set up for thickening
//   if (thicken != 0) {
//     thickening = `-morphology dilate octagon:${thicken}`
//   }
//   else {
//     thickening = ""
//   }
//   const cmd = `convert ${dir}/tmpI.mpc ${graying} "(" -clone 0 -define convolve:scale='!' -define morphology:compose=Lighten -morphology Convolve 'Sobel:>' ${thickening} -negate -evaluate pow ${gain} ")" ${swapping} ${composing} ${deleting} ${modulating} "${outfile}"`
//   doesNotThrow(() => execSync(cmd))
// }


// sketchMain({ infile: '/Users/sebastiangurin/Downloads/603994_10201043368191227_568126254_n.jpg', method: 'hardlight', outfile: 'tmp_s09.png', gain: 5, hue: 100, saturation: 100, thicken: 49 })
