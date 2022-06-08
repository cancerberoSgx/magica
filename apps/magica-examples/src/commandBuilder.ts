interface BaseConfig {
  source: string[]
  output: string
}
interface Distort extends BaseConfig {
  /** it's +distort or -distort. if false the source image(s) into an image that is the same size as the original image. if true will attempt resize the distorted image so it will contain the whole of the input image (if possible). */ 
  contains: boolean

  /** the distort method. list using `magick -list distort` */
  method: string

  virtualPixel: VirtualPixel
}

type VirtualPixel = TODO
type TODO = any