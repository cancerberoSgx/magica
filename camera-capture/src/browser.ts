/**
 * @param mime A DOMString indicating the image format. The default type is image/png.
 * @param quality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
 */
export function canvasToArrayBuffer(canvas: HTMLCanvasElement, mime: string = 'image/png', quality = 1): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => canvas.toBlob(async (d) => {
    if (d) {
      const r = new FileReader();
      r.addEventListener('loadend', e => {
        const ab = r.result;
        if (ab) {
          resolve(ab as ArrayBuffer);
        }
        else {
          reject(new Error('Expected FileReader result'));
        }
      }); r.addEventListener('error', e => {
        reject(e)
      });
      r.readAsArrayBuffer(d);
    }
    else {
      reject(new Error('Expected toBlob() to be defined'));
    }
  }, mime, quality));
}
