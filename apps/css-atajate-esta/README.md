 * [Magica Canvas](https://cancerberosgx.github.io/demos/magica/canvas/) (WIP) - Renders transformations in canvas as fast as possible to show that for images width<1000px it's instantaneous. See transformations happen on mouse move, and on streaming video.  [https://cancerberosgx.github.io/demos/magica/images/magica-canvas-demo.mp4](Demo video)

 * Currently there is no web workers
   * it would improve performance for video experience
   * not sure if improves performance on the non-video experience...

How images are processed:

 * The input image is transformed to miff (protected file - meaning is preserved between commands - it doesn't need to be written each time)
 * output images are .rgba which can be used in ctx.setImageData / HTML new ImageData directly.  (perhaps  mpc could be better?)
   * output images size is stored so there's no need to extra commands to get the sizes.

 