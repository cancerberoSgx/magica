import { ok } from 'assert'
import fetch from 'cross-fetch'
import { existsSync, readFileSync } from 'fs'
import { basename, getFileNameFromUrl, isNode, serial } from 'misc-utils-of-mine-generic'
import {   IFile, Options } from '../types'
import { ExtractInfoResultImage, imageInfo } from '../image/imageInfo';
import { imagePixelColor } from '../image/pixel';
import { arrayBufferToBase64, urlToBase64 } from '../util/base64';

export class File implements IFile {
  public content: IFile['content']

  constructor(public name: string, content: IFile['content'] | ArrayBuffer) {
    this.content = content instanceof ArrayBuffer ? new Uint8ClampedArray(content) : content
  }

  protected _info: ExtractInfoResultImage | undefined;

  /**
   * Get image information, like geometry, important numbers, mimeType, etc. The first time it calls `identify` command, but then it will cache ths value.
   */
  public get info(): Promise<ExtractInfoResultImage> {
    return new Promise(resolve => {
      if (this._info) { resolve(this._info) } else {
        imageInfo(this).then(data => {
          this._info = data[0].image;
          resolve(this._info)
        })
      }
    })
  }

  public getPixelColor(x: number, y: number): Promise<string> {
    return imagePixelColor(this, x, y)
  }


	/** Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName. 
	 * TODO: - [ ] asDataUrl / base64 - obtain mimetype with IM if user don't give.
						- [ ] store file mimetype in property for future use.**/
	public asDataUrl(mime:String):String {
		return File.toDataUrl(this, mime);
	}

	/** Returns base64 representation of this image in an ecoded format like PNG  **/
	public asBase64(file:File) {
		return File.toBase64(file);
	}

	/** Creates a DataUrl like `data:image/png;name=f.png;base64,` using given base64 content, mimeType and fileName.   * TODO: - [ ] asDataUrl / base64 - obtain mimetype with IM if user don't give.
		- [ ] store file mimetype in property for future use.**/
	public static toDataUrl(file:File, mime:String) {
		return 'data:' + mime + ';' + file.name + ';base64,' + File.toBase64(file);
	}

	/**
	 * Given a filesystem path or a url it will first check if the file exists (if applies) , if so returning that file, or if not loading the file from url.
	 */
	public static resolve(path:String):Promise<File|null> {
    throw 'Not impl'
		// if (IOUtil.fileExists(path, true)) {
		// 	return Promise.resolve(File.fromFile(path));
		// } else {
		// 	return File.fromUrl(path);
		// }
	}


  public static async fromUrl(u: string, o: RequestInit & O = {}) {
    const r = await fetch(u, o)
    return new File(o.name || getFileNameFromUrl(u), await r.arrayBuffer())
  }

  public static async fromFile(f: string, o: O = {}) {
    if (!isNode()) {
      throw new Error('File.readFile() called in the browser.')
    }
    return new File(o.name || basename(f), readFileSync(f))
  }

  public static toString(f: IFile) {
    return String.fromCharCode.apply(null, f.content as any)
  }


	/** Returns base64 representation of this image in an ecoded format like PNG  **/
	public static  toBase64(file:File) {
		return arrayBufferToBase64(file.content.buffer);
	}

	/** Loads file from given base64 string. **/
	public static  fromBase64(base64:string, name:string) {
		return new File(name, Buffer.from(Base64.decode(base64), 'base64'));
	}

	/** Loads file from given data url string. **/
	public static  fromDataUrl(dataUrl:string, name:string) {
		return File.fromBase64(urlToBase64(dataUrl), name);
	}

	/**
	 * Loads files from files in html input element of type "file"
	 */
	public static  fromHtmlFileInputElement(el:HTMLInputElement):Promise<Array<File>> {
		return  Promise.all(Array.from(el.files!).map(file => new Promise<File>((resolve, reject) => {
				var reader = new FileReader();
				reader.addEventListener('loadend', e => resolve(new File(file.name, reader.result as ArrayBuffer)));
				reader.readAsArrayBuffer(file);
			})))
  }
  
  public static async   resolveOptions(o: Partial<Options>) {
    return await serial((o.inputFiles || []).map(f => async () => {
      if (typeof f === 'string') {
        if (isNode() && existsSync(f)) {
          return await File.fromFile(f)
        }
        else {
          return await File.fromUrl(f)
        }
      }
      else {
        ok(ArrayBuffer.isView(f.content))
        return f
      }
    }))
  }

  public static asPath(f: string | IFile) {
    return typeof f === 'string' ? f : f.name
  }
}


interface O {
  name?: string
}

