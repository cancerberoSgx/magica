export interface Example {
  command: string;
  name: string
  description: string;
  inputFiles: string[]
}

export const examples: Example[] = [

  {
    name: 'convert rose:',
    command: `
    convert rose: -rotate 33 -scale 136% foo.gif
`.trim(),
    description: '',
    inputFiles: []
  },

  {
    name: 'identify url image',
    command: `
identify FVKBIJ7.png
`.trim(),
    description: '',
    inputFiles: ['https://i.imgur.com/FVKBIJ7.png']
  },

  {
    name: 'gif wave swirl gif',
    command: `convert -swirl 123 -wave 14x95 -scale 74% -rotate 15 -background transparent cfE0WWk.gif foo22.gif`,
    description: 'perform a series of complex effects over an animated gif which results in another animated transformed gif.',
    inputFiles: ['https://i.imgur.com/cfE0WWk.gif']
  },

  {
    name: 'composite commands',
    command: `convert UG1hgFf.jpg ( -clone 0 -roll +1+0 -clone 0 -compose difference -composite ) ( -clone 0 -roll +0+1 -clone 0 -compose difference -composite ) -delete 0  -compose screen -composite -negate transformEdge1_rotateOut.png`,
    description: 'Example of how to compose several commands starting with the same input image using parenthesis and -composite',
    inputFiles: ['https://i.imgur.com/UG1hgFf.jpg']
  },

  {
    name: 'Multiple output files',
    command: `convert parrots_orig.png ( +clone -resize x128  -write  parrots_lrg.jpg +delete ) ( +clone -resize x96   -write  parrots_big.jpg +delete ) ( +clone -resize x64   -write  parrots_med.jpg +delete ) -resize x32 parrots_sml.jpg`,
    description: 'Generating different output files on different stages of a single input image processing',
    inputFiles: ['https://cancerberosgx.github.io/demos/magica/images/parrots_orig.png']
  },

]
