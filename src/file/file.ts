import { ok } from 'assert'
import fetch from 'cross-fetch'
import { existsSync, readFileSync } from 'fs'
import { asArray, basename, getFileNameFromUrl, isNode, notUndefined, serial } from 'misc-utils-of-mine-generic'
import { toDataUrl } from '../image/html'
import { imageCompare } from '../image/imageCompare'
import { ExtractInfoResultImage, imageInfo } from '../image/imageInfo'
import { coordsToIndex, getPixels, imagePixelColor, rgbaToString } from '../image/imageUtil'
import { getFS, magickLoaded } from '../imageMagick/magickLoaded'
import { run } from '../main/run'
import { getOption } from '../options'
import { IFile, Rgba, Size } from '../types'
import { arrayBufferToBase64, urlToBase64 } from '../util/base64'
import { isDir, isFile, readFile } from '../util/fileUtil'
import { protectFile } from './protected'

/**
 * Default File implementation with utilities for creating from file system or urls. 
 * 
 * Also instances have utilities to cache and get image information like size, mimeType, image comparison, 
 * interacting with HTML DOM, etc.
 */
export class File implements IFile {

  // protected isProtected: boolean
  public readonly url?: string
  /**
   * Stores size for those image formats that don't store size information such as RGBA
   */
  public width?: number
  /**
   * Stores size for those image formats that don't store size information such as RGBA
   */
  public height?: number
  protected _info: ExtractInfoResultImage[] | undefined
  protected _pixels?: Rgba[];

  constructor(public readonly name: string, public readonly content: IFile['content'],
    isProtected: boolean = false, url?: string, width?: number, height?: number) {
    this.url = url
    this.width = width
    this.height = height
    if (isProtected) {
      protectFile(name)
    }
  }

  /**
   * Same as [info] but returning only the first image's data.
   */
  public async infoOne(): Promise<ExtractInfoResultImage> {
    var i = await this.info()
    if (!i || !i.length) {
      throw new Error('Expected image info extract to work')
    }
    return i[0]
  }

  /**
   * Get image information, like geometry, important numbers, mimeType, etc. 
   * The first time it calls `identify` command, but then it will cache ths value. 
   */
  public info(): Promise<ExtractInfoResultImage[]> {
    return new Promise(resolve => {
      if (this._info) {
        resolve(this._info)
      } else {
        imageInfo(this).then(data => {
          this._info = (data || []).map(i => i.image)
          resolve(this._info)
        })
      }
    })
  }

  public async size(): Promise<Size> {
    if (this.width && this.height) {
      return { width: this.width, height: this.height }
    }
    var i = await this.infoOne()
    this.width = i.geometry ? i.geometry.width : this.width
    this.height = i.geometry ? i.geometry.height : this.height
    return { width: this.width || 0, height: this.height || 0 }
  }

  public async widthXHeight(): Promise<string> {
    if (this.width && this.height) {
      return `${this.width}x${this.height}`
    }
    var s = await this.size()
    return `${s.width}x${s.height}`
  }

  public async mimeType(): Promise<string> {
    var i = await this.infoOne()
    return i.mimeType!
  }

  public async pixel(x: number, y: number): Promise<string | undefined> {
    if (this._pixels) {
      return rgbaToString(this._pixels[coordsToIndex(this.width!, x, y)])
    }
    return await imagePixelColor(this, x, y)
  }

  public async rgba(x: number, y: number): Promise<Rgba | undefined> {
    await this.pixelCalculate()
    return this._pixels![coordsToIndex(this.width!, x, y)]
  }

  /**
   * it will compute all pixel colors so following [pixel] and [rgba] calls will be fast
   */
  public async pixelCalculate() {
    this._pixels = await getPixels(this)
  }

	/** 
   * Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName. 
   */
  public async asDataUrl(mime?: string) {
    return File.toDataUrl(this, mime)
  }

  /** 
   * Returns base64 representation of this image in an encoded format like PNG  
   */
  public asBase64(file: File) {
    return File.toBase64(file)
  }

  /** 
   * Returns base64 representation of this image in an encoded format like PNG  
   */
  public async equals(file?: File) {
    return await imageCompare(this, file)
  }

  /** 
  * Returns base64 representation of this image in an encoded format like PNG  
  */
  public async asArrayBuffer() {
    return this.content.buffer
  }

  public static equals: ((a: string | IFile, b: string | IFile) => boolean) = (a, b) => File.asPath(a) !== File.asPath(b)

  public async asHTMLImageData(): Promise<ImageData> {
    var d = await this.asRGBAImageData()
    return new ImageData(d.data, d.width, d.height)
  }

  public async asRGBAImageData(): Promise<RGBAImageData> {
    var size = await this.size()
    var { outputFiles } = this.name.endsWith('.rgba') && this.width && this.height ?
      { outputFiles: [this] } :
      await run({
        script: `convert ${await this.sizeDepthArgs()} '${this.name}[0]' ${await this.sizeDepthArgs(false)} output.rgba`,
        inputFiles: [this]
      })
    return {
      data: new Uint8ClampedArray(outputFiles[0].content.buffer),
      width: size.width,
      height: size.height
    }
  }

  public async sizeDepthArgs(onlyIfRGBA = true) {
    return File.getSizeDepthArgs(this, onlyIfRGBA)
  }
  public static async  getSizeDepthArgs(f: File, onlyIfRGBA = true) {
    return (!onlyIfRGBA || f.name.endsWith('.rgba')) ? `-size ${await f.widthXHeight()} -depth 8` : ''
  }

	/** 
   * Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.   
    */
  public static async toDataUrl(file: File, mime?: string) {
    return await toDataUrl(file, mime)
  }

  /**
   * Creates a File from given url. In Node.js urls must be absolute!. 
   */
  public static async fromUrl(url: string, o: RequestInit & ResolveOptions = {}) {
    try {
      const response = await fetch(url, o)
      return new File(o.name || getFileNameFromUrl(url), new Uint8ClampedArray(await response.arrayBuffer()), o.protected, url)
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  /**
   * Creates a File from given ArrayBuffer.
   */
  public static async fromArrayBuffer(b: ArrayBuffer, o: ResolveOptions = {}) {
    const f = new File(o.name || 'unknown', new Uint8ClampedArray(b), o.protected)
    if (!o.name) {
      const info = await f.infoOne()
      return new File(info.format ? 'unammed.' + info.format.toLowerCase() : 'unknown', f.content, o.protected)
    }
    return f
  }

  /**
   * Creates a File from given file system path. Only Node.js. 
   */
  public static fromFile(f: string, o: ResolveOptions = {}) {
    if (!isNode()) {
      throw new Error('File.readFile() called in the browser.')
    }
    try {
      return new File(o.name || basename(f), new Uint8ClampedArray(readFileSync(f)), o.protected)
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  /**
   * Returns the file content as plain string. This is useful to read the content of a .json or .txt file 
   * but not for images or other binary file content. 
   */
  public static asString(f: IFile) {
    return String.fromCharCode.apply(null, f.content as any)
  }

  /** 
   * Returns base64 representation of this image in an encoded format like PNG 
   */
  public static toBase64(file: File) {
    return arrayBufferToBase64(file.content.buffer)
  }

  /** 
   * Loads file from given base64 string.  
  */
  public static fromBase64(base64: string, name: string) {
    return new File(name, Buffer.from(Base64.decode(base64), 'base64'))
  }

  /** 
   * Loads file from given data url string. 
  */
  public static fromDataUrl(dataUrl: string, name: string) {
    return File.fromBase64(urlToBase64(dataUrl), name)
  }

	/**
	 * Loads files from files in html input element of type "file".
	 */
  public static fromHtmlFileInputElement(el: HTMLInputElement): Promise<Array<File>> {
    return Promise.all(Array.from(el.files!).map(file => new Promise<File>((resolve, reject) => {
      var reader = new FileReader()
      reader.addEventListener('loadend', e => resolve(new File(file.name, new Uint8ClampedArray(reader.result as ArrayBuffer))))
      reader.readAsArrayBuffer(file)
    })))
  }

  /**
   * Shortcut for [resolve] that returns the first result.
   */
  public static async resolveOne(files: string | IFile | undefined | (string | IFile | undefined)[], options: ResolveOptions = { protected: false }) {
    var a = await File.resolve(files, options)
    return a.length > 0 ? a[0] : undefined
  }

  /**
   * Given paths, urls or files it will try to load them all and return a list of File for those succeed.
   */
  public static async resolve(files: string | IFile | undefined | (string | IFile | undefined)[], options: ResolveOptions = { protected: false }) {
    var fs = (asArray<undefined | string | IFile>(files || [])).filter(notUndefined)
    var result = await serial(fs.map(f => async () => {
      if (typeof f === 'string') {
        if (isNode() && existsSync(f)) {
          return await File.fromFile(f, options)
        }
        else {
          return await File.fromUrl(f, options)
        }
      }
      else {
        ok(ArrayBuffer.isView(f.content))
        return f
      }
    }))
    return result.filter(notUndefined).map(File.asFile)
  }

  public static isFile(f: any): f is File {
    return !!f && !!f.name && !!f.content && typeof f.constructor !== 'undefined' && !!(f as File).size && !!(f as File).infoOne
  }

  public static asFile(f: string | IFile) {
    return File.isFile(f) ? f : typeof f === 'string' ? readFile(f, getFS()) : new File(f.name, f.content)
  }

  public static asPath(f: string | IFile) {
    return typeof f === 'string' ? f : f.name
  }

  public static fromRGBAImageData(d: RGBAImageData, name = 'img.rgba') {
    return new File(name, d.data, undefined, undefined, d.width, d.height)
  }

  public static fromHTMLImageData(d: ImageData, name = 'img.rgba') {
    return File.fromRGBAImageData(d, name)
  }

  public static async fileExists(f: string | IFile) {
    const { FS } = await magickLoaded
    FS.chdir(getOption('emscriptenNodeFsRoot'))
    return isDir(File.asPath(f), FS) || isFile(File.asPath(f), FS)
  }
}

export interface ResolveOptions {
  protected?: boolean
  name?: string
}

interface RGBAImageData {
  width: number,
  height: number,
  data: Uint8ClampedArray
}
