import { State } from './state'

export const sampleImages = [
  "bluebells.png",
  "bridge.psd",
  "challenge.gif",
  "photo.tiff",
  "whale4.jpg",
  "wand.ico"
]

export enum ExampleTag {
  animation,
  info,
  drawing,
  gradient,
  morph,
  color,
  append,
  format,
  distort,
  text,
  virtualCommand,
  template,
  '3d',
  effect,
  artistic
}

export interface Example {
  tags: any[],
  script: (state: State) => string,
  name: string
  description: string;
  inputFiles: string[]
}

export const examples: Example[] = [

  {
    name: 'convert rose:',
    description: '',
    tags: [],
    inputFiles: [],
    script: state =>
      `convert ${state.inputFiles.length ? state.inputFiles[0].name : 'rose:'} -rotate 33 -scale 136% foo.gif`
  },

  {
    name: 'identify url image',
    description: '', tags: [],
    inputFiles: ['https://i.imgur.com/FVKBIJ7.png'],
    script: state =>
      `identify ${state.inputFiles.length ? state.inputFiles[0].name : 'rose:'}`
  },

  {
    name: 'gif wave swirl gif', tags: [],
    description: 'perform a series of complex effects over an animated gif which results in another animated transformed gif.',
    inputFiles: ['https://i.imgur.com/cfE0WWk.gif'],
    script: state => `
convert -swirl 123 -wave 14x95 -scale 74% -rotate 15 \\
   -background transparent ${state.inputFiles[0].name} foo22.gif
    `.trim()
  },

  {
    name: 'composite commands', tags: [],
    description: 'Example of how to compose several commands starting with the same input image using parenthesis and -composite',
    inputFiles: ['https://i.imgur.com/UG1hgFf.jpg'],
    script: state => `
convert ${state.inputFiles[0].name} \\
( -clone 0 -roll +1+0 -clone 0 -compose difference -composite ) \\
( -clone 0 -roll +0+1 -clone 0 -compose difference -composite ) \\
-delete 0  -compose screen -composite -negate transformEdge1_rotateOut.png
`.trim()
  },

  {
    name: 'Multiple output files', tags: [],
    description: 'Generating different output files on different stages of a single input image processing',
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
    tags: [],
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
    description: 'Generates several intermediate output files incrementing rotation and with all of them a final .gif. Uses +clone and parenthesis',
    inputFiles: ['https://cancerberosgx.github.io/demos/magica/images/parrots_orig.png']
  },

  {
    name: 'drawing-2',
    description: `https://www.imagemagick.org/Usage/scripts/generate_test`,
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
  \( -size 150x100 tile:pattern:hexagons \\
    +clone +swap -compose overlay -composite \) \\
  -compose SrcIn -composite tint_overlay_pattern.png
        `.trim(),

    inputFiles: []
  },

  {
    name: 'glitter_tiles tile',
    description: `https://www.imagemagick.org/Usage/anim_mods/#glitter_tiles`,
    tags: [ExampleTag.morph, ExampleTag.animation],
    script: state => `
<% 
var img = inputFiles[0]
var noise = '30%'
var threshold = '10%'
var color = await img.pixel(0, 0)
var size = await img.size()
%>
    
convert -size <%= size.width%>x<%= size.height%> xc: +noise Random -separate \\
  null: ( xc: +noise Random -separate -threshold <%= noise %> -negate ) \\
      -compose CopyOpacity -layers composite \\
  -set dispose background -set delay 20 -loop 0   glitter_overlay.gif

convert glitter_overlay.gif \\
  -compose Screen -bordercolor <%= color %> -border 0x0  glitter_plasma.gif

convert glitter_plasma.gif -virtual-pixel tile \\
  -set option:distort:viewport <%= size.width%>x<%= size.height%> -distort SRT 0 \\
  glitter_plasma_tiled.gif

convert '<%= img.name%>' -matte -fuzz <%= threshold %> -transparent <%= color %> logo_holed.gif

convert logo_holed.gif null: glitter_plasma_tiled.gif \\
  -compose DstOver -layers composite \\
  -loop 0 -layers Optimize logo_glittered.gif
            `.trim(),
    inputFiles: []
  },
  {
    name: 'gradient_complex_hues',
    description: `https://www.imagemagick.org/Usage/canvas/#gradient_complex_hues`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: [],
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
    name: 'gradient baricentric',
    description: `https://www.imagemagick.org/Usage/canvas/#barycentric`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: [],
    script: state => `
    convert -size 100x100 xc: -colorspace RGB \\
    -sparse-color  Barycentric '30,10 red   10,80 blue   90,90 lime' \\
    -colorspace sRGB  -fill white -stroke black \\
    -draw 'circle 30,10 30,12  circle 10,80 10,82  circle 90,90 90,92' \\
    sparse_barycentric1.png

    convert -size 100x100 xc: -colorspace RGB \\
    -sparse-color Barycentric '30,10 red   10,80 blue   90,90 lime' \\
    -colorspace sRGB  -fill white -stroke black \\
    \( -size 100x100 xc:black -draw 'polygon 30,10  10,80  90,90' \) \\
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
    name: 'gradient shepards_power',
    description: `https://www.imagemagick.org/Usage/canvas/#shepards_power`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: [],
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
    description: ``,
    tags: [ExampleTag.info, ExampleTag.color],
    inputFiles: [],
    script: state => `
    convert ${state.inputFiles.map(f => f.name).join(' ')} histogram:histogram.gif

         `.trim(),
  },

  {
    name: 'gradient sparse_fill',
    description: `https://www.imagemagick.org/Usage/canvas/#sparse_fill`,
    tags: [ExampleTag.drawing, ExampleTag.gradient],
    inputFiles: [],
    script: state => `
    convert -size 100x100 xc:none +antialias -fill none -strokewidth 0.5 \\
    -stroke Gold        -draw 'path "M 20,70  A 1,1 0 0,1 80,50"' \\
    -stroke DodgerBlue  -draw 'line 30,10  50,80' \\
    -stroke Red         -draw 'circle 80,60  82,60' \\
    sparse_source.gif

    convert sparse_source.gif \\
    \( +clone -resize 50% \) \\
    \( +clone -resize 50% \) \\
    \( +clone -resize 50% \) \\
    \( +clone -resize 50% \) \\
    \( +clone -resize 50% \) \\
    \( +clone -resize 50% \) \\
    \( +clone -resize 50% \) \\
    -layers RemoveDups -filter Gaussian -resize 100x100! -reverse \\
    -background None -flatten -alpha off    sparse_blur_pyramid.png

         `.trim(),
  },

  {
    name: 'Hourglass Distortion Map',
    description: `https://imagemagick.org/Usage/mapping/#hourglass`,
    tags: [ExampleTag.distort],
    inputFiles: [],
    script: state => `
convert -size 100x100 xc:  -channel G \\
  -fx 'sc=.15; (i/w-.5)/(1+sc*cos(j*pi*2/h)-sc)+.5' \\
  -separate  map_hourglass.png
  
convert ${state.inputFiles[0].name} -alpha set  -virtual-pixel transparent -channel RGBA \\
  map_hourglass.png  -fx 'p{ v.p{i*v.w/w,j*v.h/h}*w,  j}' \\
  distort_hourglass2.png

  `.trim(),
  },

  {
    name: 'Spherical Distortion Map',
    description: `https://imagemagick.org/Usage/mapping/#spherical`,
    tags: [ExampleTag.distort],
    inputFiles: [],
    script: state => `
<% 
var size = await inputFiles[0].size()
var wxh = size.width+'x'+size.height
%>
convert -size <%=wxh%> xc:  -channel R \
  -fx 'yy=(j+.5)/h-.5; (i/w-.5)/(sqrt(1-4*yy^2))+.5' \
  -separate  +channel  sphere_lut.png
convert -size <%=wxh%> xc:black -fill white \
  -draw 'circle <%=size.width/2%>,<%=size.height/2%> <%=size.width/2%>,0'    sphere_mask.png
convert sphere_mask.png \
  ( +clone -blur 0x90 -shade <%=size.width/2%>x<%=size.height/4%> -contrast-stretch 0% \
      +sigmoidal-contrast 6x50% -fill grey50 -colorize 10%  ) \
  -composite sphere_overlay.png
convert bluebells.png -resize <%=wxh%>! sphere_lut.png -fx 'p{ v*w, j }' \
  sphere_overlay.png -compose HardLight  -composite \
  sphere_mask.png -alpha off -compose CopyOpacity -composite \
  sphere_lena.png
  `.trim(),
  },

  {
    name: 'stars spiral and inwards',
    description: `By Polar Distorting the image we can make the comets flying or spiraling into a point!`,
    tags: [ExampleTag.drawing],
    inputFiles: [],
    script: state => `
convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  \( +clone \) -compose multiply -flatten \\
  -virtual-pixel Tile -background Black \\
  -blur 0x.6 -motion-blur 0x15-90 -normalize \\
  +distort Polar 0 +repage  star_inward.gif

convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  \( +clone \) -compose multiply -flatten \\
  -virtual-pixel Tile -background Black \\
  -blur 0x.6 -motion-blur 0x15-60 -normalize \\
  +distort Polar 0 +repage   star_spiral.gif`.trim(),
  },

  {
    name: 'falling stars',
    description: `use '-motion-blur' to create a field of falling stars`,
    inputFiles: [],
    script: state => `
convert -size 100x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  \( +clone \) -compose multiply -flatten \\
  -virtual-pixel tile -blur 0x.4 -motion-blur 0x20+45 -normalize \\
  star_fall.gif

convert -size 100x100 xc: +noise Random -channel R -threshold 5% \\
  -negate -channel RG -separate +channel \\
  -compose multiply -composite   speckles.gif

convert -size 100x100 xc: +noise Random -channel R -threshold 1% \\
  -negate -channel RG -separate +channel \\
  \( +clone \) -compose multiply -flatten \\
  -virtual-pixel tile -blur 0x.4 -contrast-stretch .8% \\
  stars.gif

convert -size 100x100 xc: +noise Random -channel R -threshold 1% \\
  -negate -channel RG -separate +channel \\
  \( xc: +noise Random \) -compose multiply -flatten \\
  -virtual-pixel tile -blur 0x.4 -contrast-stretch .8% \\
  stars_colored.gif

`.trim(),
    tags: [ExampleTag.distort],
  },

  {
    name: 'stars animation',
    description: `By combining the above with a plasma glitter animation you can make set of stars that look like christmas decorations.`,
    tags: [ExampleTag.animation],
    inputFiles: [],
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
  -set delay 30 -loop 0 -layers Optimize       .gif

`.trim(),
  },


  {
    name: 'animate_granularity',
    description: `https://imagemagick.org/Usage/canvas/#granularity`,
    tags: [ExampleTag.animation, ExampleTag.gradient],
    inputFiles: [],
    script: state => `
# Generate initial random image (also  granularity=0 image
convert -size 150x150 xc: +noise random \\
  # Ensure final image is 'tilable' makes results better too..
  -virtual-pixel tile \\
  # to speed things up - lets limit operaqtions to just the 'G' channel.
  -channel G \\
  # generate a sequence of images with varying granularity
  \( -clone 0 -blur 0x0.5 \) \( -clone 0 -blur 0x0.65 \) \( -clone 0 -blur 0x0.845 \) \( -clone 0 -blur 0x1.0985 \) \( -clone 0 -blur 0x1.42805 \) \( -clone 0 -blur 0x1.85647 \) \( -clone 0 -blur 0x2.41341 \) \( -clone 0 -blur 0x3.13743 \) \( -clone 0 -blur 0x4.07866 \) \( -clone 0 -blur 0x5.30226 \) \( -clone 0 -blur 0x6.89294 \) \( -clone 0 -blur 0x8.96082 \) \( -clone 0 -blur 0x11.6491 \) \( -clone 0 -blur 0x15.1438 \) \( -clone 0 -blur 0x19.6869 \) \( -clone 0 -blur 0x25.593 \) \\
  # normalize and separate a grayscale imag
  -normalize -separate +channel \\
  # separate black and white granules in equal divisions of black,gray,white
  -ordered-dither threshold,3 \\
  # Set intermedite frame animation delay and infinite loop cycle
  -set delay 12 \\
  # give a longer pause for the first image
  \( -clone 0 -set delay 50 \) -swap 0 +delete \\
  # give a longer pause for the last image
  \( +clone -set delay 50 \) +swap +delete \\
  # make it a patrol cycle (see Animation Modifications)
  \( -clone -2-1 \) \\
  # final image save
  -loop 0 animated_granularity.gif
`.trim(),
  },

  {
    name: 'warping local region',
    description: `https://imagemagick.org/Usage/masking/#region_warping`,
    inputFiles: [],
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
    tags: [ExampleTag.drawing],
  },

  {
    name: 'remove background color',
    description: `https://imagemagick.org/Usage/masking/#difference`,
    tags: [ExampleTag.color],
    inputFiles: [],
    script: state => `
convert ${state.inputFiles[0].name} \( +clone -fx 'p{0,0}' \) \\
  -compose Difference  -composite  \\
  -modulate 100,0  -alpha off  difference.png
convert difference.png  -threshold 15%  boolean_mask.png
convert ${state.inputFiles[0].name}  boolean_mask.png \\
  -alpha off -compose CopyOpacity -composite \\
  differenceRemoveBackground.png
    `.trim(),
  },

]


// convert rose: -virtual-pixel black ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) ( +clone -distort SRT 22.5 ) rotate_normal.gif


// convert rose:  -virtual-pixel black -distort SRT '20'  rotate_normal.png

// convert parrots_orig.png  -resize 40% ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage ) ( +clone -virtual-pixel white +distort SRT 30 +repage )  ppp.gif

// convert parrots_orig.png  -resize 40% ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 ) ( +clone -rotate 22.5 )  ppp.gif


// var a = `
// var a = []
// <% for (let o = 0; o < 300; o+=20) { %>
//   convert random.png -channel G \
//     -function Sinusoid 1,<%=i%> \
//     -virtual-pixel tile -blur 0x8 -auto-level \
//     -function Sinusoid 2.5,<%=j/5%> \
//     -separate +channel <%= i%>.miff
//   a.push(i)
// <% }%>
// convert <%= a.map(i=>i+'.miff%> -set delay 15 -loop 0 ripples_flux_anim.gif
// `

// for i in `seq 0 10 359`; do
//     j=`expr $i \* 5`
//     convert random.png -channel G \
//             -function Sinusoid 1,${i} \
//             -virtual-pixel tile -blur 0x8 -auto-level \
//             -function Sinusoid 2.5,${j} \
//             -separate +channel miff:-
//   done |
//     convert miff:- -set delay 15 -loop 0 ripples_flux_anim.gif
