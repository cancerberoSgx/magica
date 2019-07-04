import { randomIntBetween } from 'misc-utils-of-mine-generic'
import { File, main } from '../../src'
import { imageInfo } from '../../src/image/imageInfo'

interface Options {
  outfile: string
  input: File
  /**number of randomly placed crystals; integer>0; default=500 */
  number?: number
  /**  SEED to randomize the placement of the crystal. Values are integers>=0.  The default is totally random placement such that the resulting image will not duplicate.*/
  seed?: number
}

/**
 *  Creates random crystal-like regions in an image. Each  
 *  crystal will have a constant color found from the input image at random coordinates. 
 *  The number of crystals can be adjusted.
 */
export async function crystallize(o: Options) {
  // set default values
  // let number=500//      # number of crystals
  // let seed=0     //    # random number seeds for coverage and color
  const { number = 500, seed = 0 } = o
  // set directory for temporary files


  // setup temporary images
  let tmpA1 = `crystallize_1_$$.mpc`
  // let tmpB1=`${dir}/crystallize_1_$$.cache`
  // let trap "rm -f $tmpA1 $tmpB1; exit 0" 0
  // trap "rm -f $tmpA1 $tmpB1; exit 1" 1 2 3 15

  // read the input image into the temporary cached image and test if valid
  const infile = o.input.name
  // mkdirSync(dir, { recursive: true });
  // read input image into temporary memory mapped (mpc) format image
  // doesNotThrow(() => execSync(`convert -quiet "${infile}" +repage ${dir}/tmpI.mpc`));

  // let cmd ) 
  const r1 = await main({ inputFiles: [o.input], command: `convert -quiet "${infile}" +repage tmpI.mpc` })
  // let cmd = 

  const r2 = await main({ inputFiles: [o.input], command: `convert -quiet -regard-warnings "${infile}" +repage -alpha off "${tmpA1}"` })
  // let WxH=`convert -ping $tmpA1 -format "%wx%h" info:`
  // get image width and height
  const info = await imageInfo(r2.outputFiles[0])
  // let ww=`echo $WxH | cut -dx -f1`
  const ww = info[0].image!.geometry!.width!
  // let hh=`echo $WxH | cut -dx -f2`
  const hh = info[0].image!.geometry!.height!
  const wwm1 = ww - 1
  const hhm1 = hh - 1
  let j = 0

  // get list of random coordinates for x and y
  // Using bash $RANDOM is dramatically faster than Imagemagick random() via fx calc.
  // For 500 random pts, RANDOM is less than 1 sec and random() is about 17 sec.
  // Reference for $RANDOM and seeding --- http://www.ing.iac.es/~docs/external/bash/abs-guide/randomvar.html
  let list = ""
  // xseed=$((seed % 32767))
  let xseed = seed % 32767
  // yseed=$((seed+1 % 32767))
  let yseed = (seed + 1) % 32767

  let RANDOM = randomIntBetween(0, 32767)
  // for ((i=0; i<number; i++)); do
  for (let i = 0;i < number;i++) {
    let x, y
    // if [ "$seed" = "" ]; then
    // else
    if (seed === 0) {
      // x=$((RANDOM % wwm1))
      x = RANDOM % wwm1
      // y=$((RANDOM % hhm1))
      y = RANDOM % hhm1
    }
    else {
      RANDOM = xseed % 32767
      // x=$(($RANDOM % wwm1))
      x = RANDOM % wwm1
      // RANDOM=$((yseed % 32767))
      RANDOM = yseed % 32767
      // y=$(($RANDOM % hhm1))
      y = RANDOM % hhm1
    }

    list = `${list} point ${x},${y}`

    j = i + 1
    xseed = xseed + i * i
    // yseed=$((yseed+j*j))
    yseed = yseed + j * j
  }
  // fi
  // done

  // echo $list
  // console.log(list);

  // process input
  // create black image with random points in white
  // put that image into the alpha channel
  // use sparse-color:- to get list of coordinates and colors for opaque pixels
  // use -sparse-color voronoi to fill in transparency with colors from nearest opaque color

  //TODO: 
  const cmd1 = `convert ${tmpA1} ( -clone 0 -fill black -colorize 100 -fill white -draw "${list}" )-alpha off -compose copy_opacity -composite sparse-color:- | \
// convert -size ${ww}x${hh} xc: -sparse-color Voronoi @- "${o.outfile}"`

  // exit 0

}
