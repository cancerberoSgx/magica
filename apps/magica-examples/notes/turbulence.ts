/*
http://www.fmwconcepts.com/imagemagick/turbulence/index.php


Applies Sobel edge extraction on the image
Uses the edge image as either a diplacement map or a distortion map
Applies the distortion map to the image to warp it
This is equivalent to the following IM commands for the case of channels=together

convert -quiet -regard-warnings "$infile" +repage $tmpA1
distx=`echo "$distance" | cut -d, -f1`
disty=`echo "$distance" | cut -d, -f2`
distx=-$distx
disty=-$disty
convert $tmpA1 \
\( -clone 0 -define convolve:scale='50%!' -bias 50% \
-morphology Convolve Sobel -colorspace gray -blur 0x$smooth -auto-level \) \
-virtual-pixel $vpmethod -background "$bgcolor" -define compose:args="$distx,$disty" \
-compose $method -composite "$outfile"

*/

// see http://www.fmwconcepts.com/imagemagick/ortoneffect/index.php
import { writeFileSync } from 'fs'
import { run, File } from '../../..'
interface TurbulenceConfig {
  source: string
  /** distance amount for turbulence warping; comma separate pair of integers>=0 for x and y distiance; default=20 */
  distance: number | number[];
  smooth: number
  /** method of turbulence warping; choices are: displace or distort. default=displace */
  method: 'displace' | 'distort'
  /** virtual pixel method; any valid IM virtual-pixel method may be specified; default=mirror */
  vpMethod: string
  bgColor: string
  output: string
}
const defaultConfigValues: Partial<TurbulenceConfig> = {
  method: "displace",// displace or distort
  distance: 20,	// distance of shift
  smooth: 20,		// smoothing of distortion
  // channels="together"		# process channels together or separate
  vpMethod: "mirror", // virtual pixel method
  bgColor: "black",	// virtual pixel background
  output: 'tmp.png'
}
async function turbulence(config: Partial<TurbulenceConfig> = {}) {
  config = {...defaultConfigValues, ...config}
  const distance = typeof (config.distance) === 'number' ? [config.distance] : config.distance!
  const script = `
  
# convert -quiet -regard-warnings "${config.source}" +repage tmpA1.miff

convert ${config.source} \\
( -clone 0 -define convolve:scale='50%!' -bias 50% \\
-morphology Convolve Sobel -colorspace gray -blur 0x${config.smooth} -auto-level ) \\
-virtual-pixel ${config.vpMethod} -background "${config.bgColor}" -define compose:args="${distance.join(',')}" \\
-compose ${config.method} -composite "${config.output}"

    `
  console.log(script);

  const result = await run({
    inputFiles: [await File.fromFile(config.source!)],
    script
  })
  console.log('RESULT', result);
  result.outputFiles.forEach(f => writeFileSync(f.name, f.content))
}

; (async () => {
  try {
    await turbulence({ source: 'notes/Passion_Flower.jpeg' })
  } catch (error) {
    console.log('ERROR', error);
  }
})();

/*

convert -quiet -regard-warnings notes/Passion_Flower.jpeg +repage tmp.mpc

convert tmp.mpc \
\( -clone 0 -define convolve:scale='50%!' -bias 50% \
-morphology Convolve Sobel -colorspace gray -blur 0x20 -auto-level \) \
-virtual-pixel mirror -background "black" -define compose:args="20" \
-compose displace -composite "tmp.png"

*/