// some nice working examples
// TODO: make sure everything here is moved to magica-examples

import { fieldsShadowCommand } from "magica-examples";
import { fieldsTextCommand } from "magica-examples";
import { ExampleTag, Example, fieldsText, fieldsShadow } from "magica-examples";
import { enumKeys } from "misc-utils-of-mine-generic";
import {imList} from 'magica'

export const playgroundExamples: Example[] = [

  {
    name: 'Rotate & Translate',
    description: 'Simple example of rotate and translate transformations',
    tags: [ExampleTag.simple],
    inputFiles: ['bluebells.png'],
    fields: [
      { id: 'angle', value: '23', type: 'float', description: 'Angle in degrees to rotate' },
      { id: 'scale', value: '123%', description: 'Scale percentage, less than 100% will decrease and more than 100% will increase image size' },
    ],
    script: `
      convert <%= inputFiles[0].name %> -rotate <%= get('angle') %> -scale <%= get('scale') %> foo.gif
      `.trim()
  },

  {
    name: 'Orton effect',
    description: `Applies an Orton (sandwich) effect to an image. References: 
    <a href="http://www.bernskiold.com/2011/06/06/applying-orton-effect-photos/">applying-orton-effect-photos/</a>, 
    <a href="http://peterh111.wordpress.com/2010/12/11/the-easy-guide-to-creating-the-orton-effect/">the-easy-guide-to-creating-the-orton-effect</a>, 
    <a href="http://pcin.net/update/2006/11/01/the-orton-effect-digital-photography-tip-of-the-week/">the-orton-effect-digital-photography-tip-of-the-week</a>`,
    tags: [ExampleTag.artistic],
    inputFiles: ['bluebells.png'],
    fields: [
      { id: 'blur', value: 10, type: 'integer', description: 'Amount of blur. Values are floats>=0. The default=10' },
      { id: 'opacity', value: 100, type: 'integer', description: 'Opacity percent. Values are integers between 0 and 100. The default=100' },
    ],
    script: ` 
convert <%= inputFiles[0].name %> ( -clone 0 -clone 0 -compose screen -composite -alpha set ) \\
( -clone 1 -blur 0x<%= get('blur') %> -alpha set -channel a -evaluate set <%= get('opacity') %>% +channel ) \\
-delete 0 -compose multiply -composite \\
out.png
  `.trim(),
  },

  {
    name: 'Text with shadow',
    tags: [ExampleTag.text],
    description: 'Using -shadow on text to add shadow',
    inputFiles: ['PoetsenOne-Regular.otf'],
    fields: [
      ...fieldsText,
      ...fieldsShadow
    ],
    script: `
convert -font PoetsenOne-Regular.otf -background none \\
  ${fieldsTextCommand} \\
  -trim ( +clone ${fieldsShadowCommand} ) +swap \\
  -background none -layers merge +repage shadow_a.png
`.trim()
  },



  {
    name: 'Color quantization',
    description: `Reduce the total number of colors. https://legacy.imagemagick.org/Usage/quantize/#handling`,
    tags: [ExampleTag.color],
    inputFiles: ['bluebells.png'],
    //TODO: add -posterize levels https://legacy.imagemagick.org/script/command-line-options.php#posterize
    fields: [
      { id: 'colors', value: 16, type: 'integer', description: 'the number of colors' },
      { id: 'quantize', value: 'none', type: 'select', options: ['none', ...enumKeys(imList.Colorspace)], description: 'defines the colorspace used to sort out and reduce the number of colors' },
      // TODO: for dither use -define last paragraph https://legacy.imagemagick.org/script/command-line-options.php#dither
      { id: 'dither', value: 'none', type: 'select', options: [...enumKeys(imList.Dither)], description: 'Apply a Riemersma or Floyd-Steinberg error diffusion dither to images when general color reduction' },
    ],
    script: ` 
    <% 
let quantize = get('quantize') != 'none' ? '-quantize '+ get('quantize') : ''
let dither = get('dither') != 'none' ? '-dither '+ get('dither') : '+dither'
%>
!js: c=>c.log('<%= quantize %>')
convert <%= inputFiles[0].name %> <%= quantize %> <%= dither %> -colors  <%= get('colors') %> \
  tmp_tile_out.png
  `.trim(),
  },
  

  /*
  color quantization tool https://legacy.imagemagick.org/Usage/quantize/#handling

  -quantize RGB CMY sRGB GRAY \
              XYZ LAB LUV  \
              HSL HSB HWB  \
              YIQ YUV OHTA ; do \
     convert colorwheel.png   -quantize $S 

     you can do that by using the special "-quantize" color space setting of 'transparent'.


     convert -list dither
None
FloydSteinberg
Riemersma

-colors  integer


 -colors 2 
 
 -colorspace gray
 convert -list colorspace, 
 CIELab CMY CMYK Gray HCL HCLp HSB HSI HSL HSV HWB Lab LCH LCHab LCHuv LinearGray LMS Log Luv OHTA Rec601YCbCr Rec709YCbCr RGB scRGB sRGB Transparent xyY XYZ YCbCr YDbDr YCC YIQ YPbPr YUV

  */


 
  
//   {
//     name: 'Animated gif transformation',
//     tags: [ExampleTag.animation],
//     description: 'Multiple transformations on animated gif (loaded from url) which results in another animated transformed gif.',
//     inputFiles: ['challenge.gif'],
//     fields: [
//       { id: 'swirl', value: '123' },
//       { id: 'wave', value: '14x95' },
//       { id: 'scale', value: '74%' },
//       { id: 'rotate', value: '15' },
//       { id: 'background', value: 'transparent' },
//       { id: 'delay', value: '12' },
//     ],
//     script: `
// convert -swirl <%= get('swirl') %> -wave <%= get('wave') %> -scale <%= get('scale') %> -rotate <%= get('rotate') %> \\
//    -background <%= get('background') %> -set delay <%= get('delay') %> <%= inputFiles[0].name%> foo22.gif
//     `.trim()
//   },

//   {
//     name: 'Text with shadow',
//     tags: [ExampleTag.text],
//     description: 'Using -shadow on text to add shadow',
//     inputFiles: ['PoetsenOne-Regular.otf'],
//     fields: [
//       ...fieldsText,
//       ...fieldsShadow
//     ],
//     script: `
// convert -font PoetsenOne-Regular.otf -background none \\
//   ${fieldsTextCommand} \\
//   -trim ( +clone ${fieldsShadowCommand} ) +swap \\
//   -background none -layers merge +repage shadow_a.png
// `.trim()
//   },

]


export function getExamples(): Example[] {
  return playgroundExamples
}
