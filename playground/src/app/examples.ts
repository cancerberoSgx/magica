import { State } from './state';

export const sampleImages = [
  "bluebells.png",
  "bridge.psd",
  "challenge.gif",
  "photo.tiff",
  "whale4.jpg",
  "wand.ico"
]

export interface Example {
  // command: string;
  script: (state:State)=>string,
  name: string
  description: string;
  inputFiles: string[]
}

export const examples: Example[] = [

  {
    name: 'convert rose:',
    // command: `
    // convert rose: -rotate 33 -scale 136% foo.gif
// `.trim(),
    description: '',
    inputFiles: [],
    script: state=>
// import { callMain } from './workerAccess'
    `convert ${state.inputFiles.length ? state.inputFiles[0].name : 'rose:'} -rotate 33 -scale 136% foo.gif`
  },

  {
    name: 'identify url image',
    description: '',
    inputFiles: ['https://i.imgur.com/FVKBIJ7.png'],
    script: state=>
    `identify ${state.inputFiles.length ? state.inputFiles[0].name : 'rose:'}`
  },

  {
    name: 'gif wave swirl gif',
    description: 'perform a series of complex effects over an animated gif which results in another animated transformed gif.',
    inputFiles: ['https://i.imgur.com/cfE0WWk.gif'],
    script: state=>  `
convert -swirl 123 -wave 14x95 -scale 74% -rotate 15 \\
   -background transparent ${state.inputFiles[0].name} foo22.gif
    `.trim()
  },

  {
    name: 'composite commands',
    description: 'Example of how to compose several commands starting with the same input image using parenthesis and -composite',
    inputFiles: ['https://i.imgur.com/UG1hgFf.jpg'],
    script: state=>    `
convert ${state.inputFiles[0].name} \\
( -clone 0 -roll +1+0 -clone 0 -compose difference -composite ) \\
( -clone 0 -roll +0+1 -clone 0 -compose difference -composite ) \\
-delete 0  -compose screen -composite -negate transformEdge1_rotateOut.png
`.trim()
  },

  {
    name: 'Multiple output files',
    description: 'Generating different output files on different stages of a single input image processing',
    inputFiles: ['https://cancerberosgx.github.io/demos/magica/images/parrots_orig.png'],
    script: state=>    `
convert ${state.inputFiles[0].name} \\
  ( +clone -resize x128  -write  parrots_lrg.jpg +delete ) \\
  ( +clone -resize x96   -write  parrots_big.jpg +delete ) \\
  ( +clone -resize x64   -write  parrots_med.jpg +delete ) \\
  -resize x32 parrots_sml.jpg
  `.trim()
  },

  {
    name: 'Animation in one command',
    script: state=>    `
  convert ${state.inputFiles[0].name} -scale 50% -virtual-pixel mirror \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) \\
    ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) rotate_norma2l.gif
    `.trim(),
    description: 'Generates several intermediate output files incrementing rotation and with all of them a final .gif. Uses +clone and parenthesis',
    inputFiles: ['https://cancerberosgx.github.io/demos/magica/images/parrots_orig.png']
  },


]


// convert rose: -virtual-pixel black ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) rotate_normal.gif


// convert rose:  -virtual-pixel black -distort SRT '20'  rotate_normal.png

// convert parrots_orig.png  -resize 40% ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage )  ppp.gif

// convert parrots_orig.png  -resize 40% ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 )  ppp.gif
