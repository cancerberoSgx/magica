export interface Example {
  command: string;
  name: string
  description: string;
}

export const examples: Example[] = [

  {
    name: 'convert rose:',
    command: `
    convert rose: -rotate 33 -scale 136% foo.gif
`.trim(),
    description: '',
  },
  {
    name: 'identify rose:',
    command: `
identify rose:
`.trimLeft(),
    description: '',
  },

]
