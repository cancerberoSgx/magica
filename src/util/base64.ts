import { Base64 } from 'js-base64'

export function dataToUrl(data: string, mimeType: string, fileName?: string) {
  return base64ToUrl(dataToBase64(data), mimeType, fileName)
}

export function dataToBase64(data: string): string {
  return Base64.encode(data)
}

/**
 * Creates a DataUrl like `data:image/jpeg;name=hindenburg.jpg;base64,` using given base64 content, mimeType and fileName.
 */
export function base64ToUrl(base64: string, mimeType: string, fileName?: string): string {
  return `data:${mimeType}${fileName ? `;name=${fileName}` : ''};base64,${base64}`
}

export function urlToBase64(s: string) {
  return s.substring(s.indexOf(';base64,') + ';base64,'.length)
}

export function urlToData(s: string) {
  return Base64.atob(urlToBase64(s))
}

export function isBase64(str: string) {
  if (str === '' || str.trim() === '') { return false }
  try {
    return Base64.btoa(Base64.atob(str)) == str
  } catch (err) {
    return false
  }
}

/**
 * Extracts the name of a data url like `data:image/jpeg;name=hindenburg.jpg;base64,`..., if any.
 */
export function getDataUrlFileName(url: string) {
  let p = url && url.split(';base64,')
  const q = p.length ? p[0].split(';').find(s => s.includes('name=')) : ''
  p = q ? q.split('=') : []
  return p[p.length - 1]
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = arrayBufferToString(buffer);
  return window.btoa(binary)
}

export function arrayBufferToString(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return binary;
}

