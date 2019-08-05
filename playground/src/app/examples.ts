import { Field, State } from './state'

export const sampleImages = [
  "bluebells.png",
  "bridge.psd",
  "challenge.gif",
  "photo.tiff",
  "whale4.jpg",
  "wand.ico"
]

export enum ExampleTag {
  animation = 'animation',
  info = 'info',
  drawing = 'drawing',
  gradient = 'gradient',
  color = 'color',
  montage = 'montage',
  format = 'format',
  distort = 'distort',
  text = 'text',
  artistic = 'artistic',
  simple = 'simple'
}

export interface Example {
  tags: any[],
  script: (state: State) => string,
  name: string
  description: string;
  inputFiles: string[]
  fields?: Field[]
}

const fieldsText = [
  { id: 'text', value: 'Hello World 1234' },
  { id: 'stroke', value: 'black' },
  { id: 'strokewidth', value: '2' },
  { id: 'fill', value: 'white' },
  { id: 'pointSize', value: '68' }
]

const fieldsShadow = [
  { id: 'shadowColor', value: 'navy' },
  { id: 'shadow', value: '120x5+5+4' },
]

const fieldsTextCommand = `
  -stroke <%= get('stroke') %> -strokewidth <%= get('strokewidth') %> \\
  -fill <%= get('fill') %> -pointsize <%= get('pointSize') %> 'label:<%= get('text') %>'
  `.trim()

const fieldsShadowCommand = `-background <%= get('shadowColor') %> -shadow <%= get('shadow') %>`

export const examples: Example[] = [

  {
    name: 'Hello world',
    description: 'Simple example that transform built in rose: image',
    tags: [ExampleTag.simple],
    inputFiles: ['bluebells.png'],
    fields: [
      { id: 'angle', value: '23' },
      { id: 'scale', value: '123%' },
    ],
    script: state =>
      `
      convert ${state.inputFiles[0].name} -rotate <%= get('angle') %> -scale <%= get('scale') %> foo.gif
      `.trim()
  },

  {
    name: 'Image information extraction',
    description: 'Simple example of using identify command to get image information to stdout and a second time as json file',
    tags: [ExampleTag.simple, ExampleTag.info],
    inputFiles: ['photo.tiff'],
    script: state =>
      `
identify ${ state.inputFiles[0].name}
convert photo.tiff photo_info.json
      `.trim()
  },

  {
    name: 'Animated gif transformation',
    tags: [ExampleTag.simple, ExampleTag.animation],
    description: 'Multiple transformations on animated gif (loaded from url) which results in another animated transformed gif.',
    inputFiles: ['challenge.gif'],
    fields: [
      { id: 'swirl', value: '123' },
      { id: 'wave', value: '14x95' },
      { id: 'scale', value: '74%' },
      { id: 'rotate', value: '15' },
      { id: 'background', value: 'transparent' },
      { id: 'delay', value: '12' },
    ],
    script: state => `
convert -swirl <%= get('swirl') %> -wave <%= get('wave') %> -scale <%= get('scale') %> -rotate <%= get('rotate') %> \\
   -background <%= get('background') %> -set delay <%= get('delay') %> challenge.gif foo22.gif
    `.trim()
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
    script: state => `
convert -font PoetsenOne-Regular.otf -background none \\
  ${fieldsTextCommand} \\
  -trim ( +clone ${fieldsShadowCommand} ) +swap \\
  -background none -layers merge +repage shadow_a.png
`.trim()
  },

  {
    name: 'render text file',
    tags: [ExampleTag.text],
    description: 'Render txt file to bitmap',
    inputFiles: ['PoetsenOne-Regular.otf', 'LICENSE.txt'],
    fields: [
      ...fieldsText
    ],
    script: state => `
    convert -font PoetsenOne-Regular.otf ${fieldsTextCommand} TEXT:LICENSE.txt LICENSE.jpg
`.trim()
  },


  {
    name: 'Remove background and add shadow',
    tags: [ExampleTag.color],
    description: 'Removing background color and adding shadow with -shadow',
    inputFiles: ['https://i.imgur.com/JACCXT5.png'],
    fields: [
      ...fieldsShadow,
      { id: 'threshold', value: '5%' },
      { id: 'point', value: '10,10' },
    ],
    script: state => `
convert ${state.inputFiles[0].name} ( +clone -fx 'p{<%= get('point') %>}' ) \\
  -compose Difference -composite -modulate 100,0 -alpha off difference.miff

convert difference.miff -threshold <%= get('threshold') %> boolean_mask.miff

convert ${state.inputFiles[0].name} boolean_mask.miff \\
  -alpha off -compose CopyOpacity -composite differenceRemoveBackground.miff

convert differenceRemoveBackground.miff  \\
  ( +clone ${fieldsShadowCommand} ) +swap \\
  -background none -layers merge +repage shadow_b.png
    `.trim()
  },

  {
    name: 'Poligonize photo artistic',
    description: `With some parameters a WIP effect that kind of poligonize an image. The size the initial image before polar distorting, basically sets the number of rays that will be produced`,
    inputFiles: ['bluebells.png'],
    tags: [ExampleTag.artistic, ExampleTag.color],
    fields: [
      { id: 'speed', value: '2' },
      { id: 'intensity', value: '9' },
      { id: 'width', value: '14' },
      { id: 'height', value: '21' },
    ],
    script: state => `
convert <%=inputFiles[0].name %> original.png
convert <%=inputFiles[0].name %> \\
  -resize <%= 100/get('speed') %>% -blur 0x1 -colorspace YIQ -monitor \\
  -mean-shift <%= get('width') %>x<%= get('height') %>+<%= get('intensity') %>% +monitor \\
  -set colorspace YIQ -colorspace sRGB \\
  -resize <%= 100*get('speed') %>% lindo.png
`.trim()
  },

  {
    name: 'Spherical Distortion Map',
    description: `<a href="https://imagemagick.org/Usage/mapping/#spherical">See ImageMagick examples page mapping/#spherical</a>`,
    tags: [ExampleTag.distort, ExampleTag.artistic,],
    inputFiles: ['bluebells.png'],
    script: state => `
<% 
  var size = await inputFiles[0].size()
%>

convert -size <%=size.width+'x'+size.height%> xc:  -channel R \\
  -fx 'yy=(j+.5)/h-.5; (i/w-.5)/(sqrt(1-4*yy^2))+.5' \\
  -separate  +channel  sphere_lut.miff

convert -size <%=size.width+'x'+size.height%> xc:black -fill white \\
  -draw 'circle <%=size.width/2%>,<%=size.height/2%> <%=size.width/2%>,0'    sphere_mask.miff

convert sphere_mask.miff \\
  ( +clone -blur 0x90 -shade <%=size.width/2%>x<%=size.height/4%> -contrast-stretch 0% \\
      +sigmoidal-contrast 6x50% -fill grey50 -colorize 10%  ) \\
  -composite sphere_overlay.miff

convert <%=inputFiles[0].name %> -resize <%=size.width+'x'+size.height%>! sphere_lut.miff -fx 'p{ v*w, j }' \\
  sphere_overlay.miff -compose HardLight  -composite \\
  sphere_mask.miff -alpha off -compose CopyOpacity -composite \\
  sphere_lena.png
`.trim(),
  },

  {
    name: 'animate_granularity',
    description: `<a href="https://imagemagick.org/Usage/canvas/#granularity">See ImageMagick examples page canvas/#granularity</a>`,
    tags: [ExampleTag.animation, ExampleTag.gradient],
    inputFiles: ['bluebells.png'],
    script: state => `
# Generate initial random image (also  granularity=0 image
convert -size 150x150 xc: +noise random \\
  # Ensure final image is 'tilable' makes results better too..
  -virtual-pixel tile \\
  # to speed things up - lets limit operaqtions to just the 'G' channel.
  -channel G \\
  # generate a sequence of images with varying granularity
  ( -clone 0 -blur 0x0.5 ) ( -clone 0 -blur 0x0.65 ) ( -clone 0 -blur 0x0.845 ) ( -clone 0 -blur 0x1.0985 ) ( -clone 0 -blur 0x1.42805 ) ( -clone 0 -blur 0x1.85647 ) ( -clone 0 -blur 0x2.41341 ) ( -clone 0 -blur 0x3.13743 ) ( -clone 0 -blur 0x4.07866 ) ( -clone 0 -blur 0x5.30226 ) ( -clone 0 -blur 0x6.89294 ) ( -clone 0 -blur 0x8.96082 ) ( -clone 0 -blur 0x11.6491 ) ( -clone 0 -blur 0x15.1438 ) ( -clone 0 -blur 0x19.6869 ) ( -clone 0 -blur 0x25.593 ) \\
  # normalize and separate a grayscale imag
  -normalize -separate +channel \\
  # separate black and white granules in equal divisions of black,gray,white
  -ordered-dither threshold,3 \\
  # Set intermedite frame animation delay and infinite loop cycle
  -set delay 12 \\
  # give a longer pause for the first image
  ( -clone 0 -set delay 50 ) -swap 0 +delete \\
  # give a longer pause for the last image
  ( +clone -set delay 50 ) +swap +delete \\
  # make it a patrol cycle (see Animation Modifications)
  ( -clone -2-1 ) \\
  # final image save
  -loop 0 animated_granularity.gif
`.trim(),
  },


  {
    name: 'glitter_tiles tile',
    description: `<a href="https://www.imagemagick.org/Usage/anim_mods/#glitter_tiles">See ImageMagick examples page anim_mods/#glitter_tiles</a>`,
    tags: [ExampleTag.animation, ExampleTag.artistic],
    fields: [
      { id: 'point', value: '30,30' },
      { id: 'noise', value: '30%' },
      { id: 'threshold', value: '10%' },
      { id: 'delay', value: '12' },
    ],
    script: state => `
<% 
  var img = inputFiles[0]
  var color = await img.pixel(parseInt(get('point').split(',')[0]), parseInt(get('point').split(',')[1]))
  var size = await img.size()
%>

convert -size <%= size.width%>x<%= size.height%> xc: +noise Random -separate \\
  null: ( xc: +noise Random -separate -threshold <%= get('noise') %> -negate ) \\
  -compose CopyOpacity -layers composite \\
  -set dispose background -set delay <%= get('delay')%> -loop 0 glitter_overlay.miff

convert glitter_overlay.miff \\
  -compose Screen -bordercolor <%= color %> -border 0x0 glitter_plasma.miff

convert glitter_plasma.miff -virtual-pixel tile \\
  -set option:distort:viewport <%= size.width%>x<%= size.height%> -distort SRT 0 \\
  glitter_plasma_tiled.miff

convert '<%= img.name %>' -matte -fuzz <%= get('threshold') %> -transparent <%= color %> logo_holed.miff

convert logo_holed.miff null: glitter_plasma_tiled.miff \\
  -compose DstOver -layers composite \\
  -loop 0 -layers Optimize logo_glittered.gif
          `.trim(),
    inputFiles: ['bluebells.png']
  },

  {
    name: 'Composite commands',
    tags: [ExampleTag.simple],
    description: 'Example of how to compose several commands starting with the same input image using parenthesis and -composite',
    inputFiles: ['bluebells.png'],
    script: state => `
convert ${state.inputFiles[0].name} \\
  ( -clone 0 -roll +1+0 -clone 0 -compose difference -composite ) \\
  ( -clone 0 -roll +0+1 -clone 0 -compose difference -composite ) \\
  -delete 0  -compose screen -composite -negate transformEdge1_rotateOut.png
`.trim()
  },

  {
    name: 'Multiple output files',
    tags: [ExampleTag.simple],
    description: 'Generating multiple output files using a single command',
    inputFiles: ['https://cancerberosgx.github.io/demos/magica/images/parrots_orig.png'],
    script: state => `
convert ${state.inputFiles[0].name} \\
  ( +clone -resize x128  -write  parrots_lrg.jpg +delete ) \\
  ( +clone -resize x96   -write  parrots_big.jpg +delete ) \\
  ( +clone -resize x64   -write  parrots_med.jpg +delete ) \\
  -resize x32 parrots_sml.jpg
  `.trim()
  },

  {
    name: 'Animation in one command',
    description: 'Generates several intermediate output files incrementing rotation and with all of them a final .gif. Uses +clone and parenthesis',
    inputFiles: ['https://cancerberosgx.github.io/demos/magica/images/parrots_orig.png'],
    tags: [ExampleTag.simple, ExampleTag.animation],
    script: state => `
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
  },

  {
    name: 'Write pdf',
    description: `append a couple of images and then all images and output a pdf`,
    tags: [ExampleTag.format, ExampleTag.montage],
    inputFiles: ['helvetica.ttf'],
    script: state => `
montage \\
  null: \\
  ( rose: -rotate -90 -resize 66% ) \\
  null: \\
  ( logo: -rotate -90 -resize 66% ) \\
  <%= inputFiles.map(i=>i.name).join(' ') %> \\
  -font helvetica.ttf -page A4 -tile 2x3 -geometry +10+10 -shadow -frame 8   \\
  out_pdf.pdf
  `.trim(),
  },

  {
    name: 'Flux anim',
    description: `<a href="https://imagemagick.org/Usage/canvas/#random_flux">See ImageMagick examples page canvas/#random_flux</a>`,
    tags: [ExampleTag.animation],
    inputFiles: ['bluebells.png'],
    script: state => `
<% 
function sequence(start, step, end){
  var a = []
  for(var i = start; i<=end; i+=step){
    a.push(i)
  }
  return a
} 
var size = '100x100'
var delay = 12
var list = sequence(0, 20, 359)
%>
# first generate a random noise image. We use miff format which is faster
convert -size <%= size %> xc: +noise Random random.miff
# copy it just to see it in the browser
convert random.miff random.gif 

# Now generate sequence of variations of it with function Sinusoid
<% list.forEach(i=>{ %>
  convert random.miff -channel G -function Sinusoid 1,<%=i%> \\
    -virtual-pixel tile -blur 0x8 -auto-level \\
    -separate flux_<%=i%>.miff
<%})%>
# And append them all in an anim gif:
convert -set delay <%= delay %> <%= list.map(i=>\`flux_\${i}.miff\`).join(' ') %> flux_anim.gif

# a threshold variation of previous:
convert flux_anim.gif -threshold 70% flux_thres_anim.gif

# Another "filaments" variation:
convert flux_anim.gif  \\
  -sigmoidal-contrast 30x50% -solarize 50% -auto-level \\
  -set delay <%= delay %> filaments_anim.gif

# generate another list this time "ripples"
<% list.forEach(i=>{ %>
  convert random.miff -channel G \\
    -function Sinusoid 1,<%=i%> \\
    -virtual-pixel tile -blur 0x8 -auto-level \\
    -function Sinusoid 2.5,<%=i*5%> \\
    -separate +channel flux_ripples_<%=i%>.miff
<%})%>
convert -set delay <%= delay %> <%= list.map(i=>\`flux_ripples_\${i}.miff\`).join(' ') %> flux_ripples_anim.gif
  `.trim(),
  },

  {
    name: 'Drawing example 2',
    description: `Drawing of shapes and, patterns and gradients, example taken from <a href="https://imagemagick.org/Usage/scripts/generate_test">scripts/generate_test</a>`,
    tags: [ExampleTag.drawing],
    script: state => `
convert -size 100x150 gradient: -rotate 90 \\
  -sigmoidal-contrast 7x50% test_gradient.png

# Create a semi-transparent rectangle of the gradient and flop it left-right
convert -size 150x100 xc:black \\
  -draw 'fill grey50  rectangle  8,8  142,92' +matte \\
  test_gradient.png +swap -compose CopyOpacity -composite \\
  -flop test_bgnd.png

# Draw two overlaping circles and fill then with same (non-flopped) gradient.
convert -size 150x100 xc:black \\
  -draw 'fill white circle    40,50  40,12' \\
  -draw 'fill white circle   110,50 110,12' +matte \\
  test_gradient.png +swap -compose CopyOpacity -composite \\
  test_fgnd.png

# Create a rainbow gradient
convert -size 12x100 xc:Lime -colorspace HSB \\
  gradient:gray66 -compose CopyRed -composite \\
  -colorspace sRGB -rotate 90  -compose Over \\
  -bordercolor black -border 0x1 test_hue.png

# Overlay the images and add some extra colors to result.
convert test_bgnd.png  test_fgnd.png  -composite \\
  -draw 'fill red   circle    25,80  25,98' \\
  -draw 'fill green circle    75,80  75,98' \\
  -draw 'fill blue  circle   125,80 125,98' \\
  test_hue.png -geometry +25+80 -composite \\
  test.png

convert test.png \\
  ( -size 150x100 tile:pattern:hexagons \\
    +clone +swap -compose overlay -composite ) \\
  -compose SrcIn -composite tint_overlay_pattern.png
        `.trim(),

    inputFiles: ['bluebells.png']
  },

  {
    name: 'Gradient complex hues',
    description: `<a href="https://imagemagick.org/Usage/canvas/#gradient_complex_hues">See ImageMagick examples page canvas/#gradient_complex_hues</a>`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 100x100 xc: +size xc:red xc:blue xc:lime -colorspace HSB \\
  -fx 'ar=1/max(1,  (i-50)*(i-50)+(j-10)*(j-10)  ); br=1/max(1,  (i-10)*(i-10)+(j-70)*(j-70)  );  cr=1/max(1,  (i-90)*(i-90)+(j-90)*(j-90)  );  ( u[1]*ar + u[2]*br + u[3]*cr )/( ar+br+cr )' \\
  -colorspace sRGB   gradient_shepards_HSB.gif

convert -size 100x100 xc: +size xc:red xc:blue xc:lime \\
  -colorspace HSB -channel R \\
  -fx 'aa=u[1]*2*pi; ba=u[2]*2*pi; ca=u[3]*2*pi; ar=1/max(1, hypot(i-50,j-10) ); br=1/max(1, hypot(i-10,j-70) ); cr=1/max(1, hypot(i-90,j-90) );nr=ar+br+cr;   mod(atan2( ( sin(aa)*ar + sin(ba)*br + sin(ca)*cr )/nr,  ( cos(aa)*ar + cos(ba)*br + cos(ca)*cr )/nr )/(2*pi)+1, 1)' \\
  -separate -background white -combine +channel \\
  -set colorspace HSB -colorspace sRGB  gradient_circular_mean_hue.gif

convert -size 100x100 xc: -colorspace RGB \\
  -sparse-color  Inverse '50,10 red  10,70 blue  90,90 lime' \\
    -colorspace sRGB gradient_inverse_RGB.png

convert gradient_inverse_RGB.png -colorspace HSB \\
  -channel GB -evaluate set 100% +channel \\
  -colorspace sRGB gradient_inverse_RGB_Hue.gif
         `.trim(),
  },


  {
    name: 'Gradient baricentric',
    description: `<a href="https://imagemagick.org/Usage/canvas/#barycentric">See ImageMagick examples page canvas/#barycentric</a>`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 100x100 xc: -colorspace RGB \\
  -sparse-color  Barycentric '30,10 red   10,80 blue   90,90 lime' \\
  -colorspace sRGB  -fill white -stroke black \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82  circle 90,90 90,92' \\
  sparse_barycentric1.png

convert -size 100x100 xc: -colorspace RGB \\
  -sparse-color Barycentric '30,10 red   10,80 blue   90,90 lime' \\
  -colorspace sRGB  -fill white -stroke black \\
  ( -size 100x100 xc:black -draw 'polygon 30,10  10,80  90,90' ) \\
  +matte -compose CopyOpacity -composite \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82  circle 90,90 90,92' \\
  sparse_bary_triangle2.png

convert -size 100x100 xc:none -draw 'polygon 30,10  10,80  90,90' \\
  -colorspace RGB \\
  -sparse-color Barycentric '30,10 red   10,80 blue   90,90 lime' \\
  -colorspace sRGB   sparse_bary_triangle_3.png
         `.trim(),
  },

  {
    name: 'Gradient Shepard\'s power',
    description: `<a href="https://imagemagick.org/Usage/canvas/#shepards_power">See ImageMagick examples page canvas/#shepards_power</a>`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 100x100 xc: -colorspace RGB -define shepards:power=0.5 \\
  -sparse-color Shepards '30,10 red  10,80 blue  70,60 lime  80,20 yellow' \\
  -colorspace sRGB -fill white -stroke black \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82' \\
  -draw 'circle 70,60 70,62  circle 80,20 80,22' \\
  sparse_shepards_pow0.5.png
 convert -size 100x100 xc: -colorspace RGB -define shepards:power=1 \\
  -sparse-color Shepards '30,10 red  10,80 blue  70,60 lime  80,20 yellow' \\
  -colorspace sRGB -fill white -stroke black \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82' \\
  -draw 'circle 70,60 70,62  circle 80,20 80,22' \\
  sparse_shepards_pow1.png
 convert -size 100x100 xc: -colorspace RGB -define shepards:power=2 \\
  -sparse-color Shepards '30,10 red  10,80 blue  70,60 lime  80,20 yellow' \\
  -colorspace sRGB -fill white -stroke black \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82' \\
  -draw 'circle 70,60 70,62  circle 80,20 80,22' \\
  sparse_shepards_pow2.png
 convert -size 100x100 xc: -colorspace RGB -define shepards:power=3 \\
  -sparse-color Shepards '30,10 red  10,80 blue  70,60 lime  80,20 yellow' \\
  -colorspace sRGB -fill white -stroke black \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82' \\
  -draw 'circle 70,60 70,62  circle 80,20 80,22' \\
  sparse_shepards_pow3.png
convert -size 100x100 xc: -colorspace RGB -define shepards:power=8 \\
  -sparse-color Shepards '30,10 red  10,80 blue  70,60 lime  80,20 yellow' \\
  -colorspace sRGB -fill white -stroke black \\
  -draw 'circle 30,10 30,12  circle 10,80 10,82' \\
  -draw 'circle 70,60 70,62  circle 80,20 80,22' \\
  sparse_shepards_pow8.png
         `.trim(),
  },

  {
    name: 'histogram',
    description: `Generate combined histogram representation of all current input images`,
    tags: [ExampleTag.info, ExampleTag.color],
    inputFiles: ['bluebells.png'],
    script: state => `
convert ${state.inputFiles.map(f => f.name).join(' ')} histogram:histogram.gif
         `.trim(),
  },

  {
    name: 'Film Strip Animation',
    description: `Drawing, distorting and composing to archive a nice "film strip" like animation`,
    tags: [ExampleTag.animation, ExampleTag.distort],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 12x12 xc: -draw 'circle 6,6 6,2' -negate \\
  -duplicate 5 +append +duplicate \\
  rose: +swap -background black -append \\
  -duplicate 3 +append \\
  -virtual-pixel HorizontalTile -background SkyBlue \\
  -duplicate 19  -distort SRT '%[fx:72*t/n],0 1 0 0,0' \\
  -distort Plane2cylinder 115 \\
  -bordercolor Skyblue -border 0x3 -set delay 5 \\
  film_strip_anim.gif
         `.trim(),
  },



  {
    name: 'gradient sparse_fill',
    description: `<a href="https://imagemagick.org/Usage/canvas/#sparse_fill">See ImageMagick examples page canvas/#sparse_fill</a>`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 100x100 xc:none +antialias -fill none -strokewidth 0.5 \\
  -stroke Gold        -draw 'path "M 20,70  A 1,1 0 0,1 80,50"' \\
  -stroke DodgerBlue  -draw 'line 30,10  50,80' \\
  -stroke Red         -draw 'circle 80,60  82,60' \\
  sparse_source.gif

convert sparse_source.gif \\
  ( +clone -resize 50% ) \\
  ( +clone -resize 50% ) \\
  ( +clone -resize 50% ) \\
  ( +clone -resize 50% ) \\
  ( +clone -resize 50% ) \\
  ( +clone -resize 50% ) \\
  ( +clone -resize 50% ) \\
  -layers RemoveDups -filter Gaussian -resize 100x100! -reverse \\
  -background None -flatten -alpha off    sparse_blur_pyramid.png
         `.trim(),
  },

  {
    name: 'Hourglass Distortion Map',
    description: `<a href="https://imagemagick.org/Usage/mapping/#hourglass">See ImageMagick examples page mapping/#hourglass</a>`,
    tags: [ExampleTag.distort],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 100x100 xc:  -channel G \\
  -fx 'sc=.15; (i/w-.5)/(1+sc*cos(j*pi*2/h)-sc)+.5' \\
  -separate  map_hourglass.png
  
convert ${state.inputFiles[0].name} \\
  map_hourglass.png  -fx 'p{ v.p{i*v.w/w,j*v.h/h}*w,  j}' \\
  distort_hourglass2.png

  `.trim(),
  },

  {
    name: 'Stars spiral and inwards',
    description: `By Polar Distorting the image we can make the comets flying or spiraling into a point!`,
    tags: [ExampleTag.drawing, ExampleTag.distort],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  ( +clone ) -compose multiply -flatten \\
  -virtual-pixel Tile -background Black \\
  -blur 0x.6 -motion-blur 0x15-90 -normalize \\
  +distort Polar 0 +repage  star_inward.gif

convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  ( +clone ) -compose multiply -flatten \\
  -virtual-pixel Tile -background Black \\
  -blur 0x.6 -motion-blur 0x15-60 -normalize \\
  +distort Polar 0 +repage   star_spiral.gif
  `.trim(),
  },

  {
    name: 'Falling stars',
    description: `use '-motion-blur' to create a field of falling stars`,
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 100x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  ( +clone ) -compose multiply -flatten \\
  -virtual-pixel tile -blur 0x.4 -motion-blur 0x20+45 -normalize \\
  star_fall.gif

convert -size 100x100 xc: +noise Random -channel R -threshold 5% \\
  -negate -channel RG -separate +channel \\
  -compose multiply -composite   speckles.gif

convert -size 100x100 xc: +noise Random -channel R -threshold 1% \\
  -negate -channel RG -separate +channel \\
  ( +clone ) -compose multiply -flatten \\
  -virtual-pixel tile -blur 0x.4 -contrast-stretch .8% \\
  stars.gif

convert -size 100x100 xc: +noise Random -channel R -threshold 1% \\
  -negate -channel RG -separate +channel \\
  ( xc: +noise Random ) -compose multiply -flatten \\
  -virtual-pixel tile -blur 0x.4 -contrast-stretch .8% \\
  stars_colored.gif

`.trim(),
    tags: [ExampleTag.distort],
  },

  {
    name: 'Montage polaroid',
    tags: [ExampleTag.montage],
    description: `Example of the command montage: <a href="https://imagemagick.org/Usage/montage/#overlap">See ImageMagick examples page montage/#overlap</a>`,
    inputFiles: ['helvetica.ttf', 'whale4.jpg', 'photo.tiff', 'bridge.psd'],
    script: state => `
montage -size 400x400 null: \\
  <%= inputFiles.map(i=>i.name).join(' ') %> null: \\
  -font helvetica.ttf \\
  -auto-orient  -thumbnail 200x200 \\
  -bordercolor Lavender -background black +polaroid -resize 30% \\
  -gravity center -background none -extent 80x80 \\
  -background SkyBlue -geometry -10+22  -tile x1  out_polaroid_overlap.jpg
  `.trim(),
  },

  {
    name: 'Stars animation',
    description: `By combining the above with a plasma glitter animation you can make set of stars that look like christmas decorations.`,
    tags: [ExampleTag.animation],
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 200x200 xc: +noise Random -separate \\
  null: \\
    ( xc: +noise Random -separate -threshold 50% -negate ) \\
    -compose CopyOpacity -layers composite \\
  null: \\
    plasma:red-firebrick plasma:red-firebrick plasma:red-firebrick plasma:red-firebrick plasma:red-firebrick \\
    -compose Screen -layers composite \\
  null:  \\
    ( xc: +noise Random -channel R -threshold 1% \\
      -negate -channel RG -separate +channel \\
      ( +clone ) -compose multiply -flatten \\
      -virtual-pixel tile  -blur 1x1 \\
      ( -clone 0  -motion-blur 111x135+90  -motion-blur 110x35-90 ) \\
      ( -clone 0  -motion-blur 10x15+30  -motion-blur 10x15-50 ) \\
      ( -clone 0  -motion-blur 10x15-30  -motion-blur 10x15+150 ) \\
      -compose screen -background black -flatten  -normalize ) \\
    -compose multiply -layers composite \\
  -set delay 30 -loop 0 -layers Optimize out.gif

`.trim(),
  },

  {
    name: 'Warping local region',
    description: `<a href="https://imagemagick.org/Usage/masking/#region_warping">See ImageMagick examples page masking/#region_warping</a>`,
    inputFiles: ['bluebells.png'],
    script: state => `
convert -size 600x70 xc:darkred \\
  -fill white -draw 'roundrectangle 5,5  595,65 5,5' \\
  -fill black -draw 'rectangle 5,25 595,31' \\
  -fill red -draw 'rectangle 5,39 595,45' \\
  lines.gif
convert lines.gif \\
  -region 90x70+10+0    -swirl  400  \\
  -region 90x70+100+0   -swirl  400 \\
  -region 90x70+190+0   -swirl -400 \\
  -region 120x70+280+0  -implode 1.5 \\
  -region 100x70+380+0  -implode -7  \\
  -region 101x70+480+0  -wave 10x50 -crop 0x70+0+10! \\
  +region warping_regions.gif
  `.trim(),
    tags: [ExampleTag.drawing, ExampleTag.distort],
  },

  {
    name: 'Remove background color',
    description: `<a href="https://imagemagick.org/Usage/masking/#difference">See ImageMagick examples page masking/#difference</a>`,
    tags: [ExampleTag.color],
    inputFiles: ['bluebells.png'],
    fields: [
      { id: 'threshold', value: '15%' },
      { id: 'point', value: '10,10' },
    ],
    script: state => `
convert ${state.inputFiles[0].name} original.png
convert ${state.inputFiles[0].name} ( +clone -fx 'p{<%= get('point') %>}' ) \\
  -compose Difference -composite \\
  -modulate 100,0 -alpha off difference.miff
convert difference.miff -threshold <%= get('threshold') %> boolean_mask.miff
convert ${state.inputFiles[0].name}  boolean_mask.miff \\
  -alpha off -compose CopyOpacity -composite \\
  differenceRemoveBackground.png
    `.trim(),
  },


]
