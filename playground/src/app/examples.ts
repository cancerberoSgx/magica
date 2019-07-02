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
    command: `
convert -swirl 123 -wave 14x95 -scale 74% -rotate 15 -background transparent cfE0WWk.gif foo22.gif 
`.trim(),
    description: 'perform a series of complex effects over an animated gif which results in another animated transformed gif.',
  inputFiles: ['https://i.imgur.com/cfE0WWk.gif']
  },
  


]
