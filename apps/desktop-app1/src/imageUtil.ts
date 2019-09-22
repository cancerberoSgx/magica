import { readFileSync } from 'fs'
import { Image } from 'gui'
import { File, mainSync } from 'magica'
import { basename } from 'path'

export function buildBuffers(image: string, content?: ArrayBufferView) {
  const s = {
    image,
    currentBuffer: typeof content === 'undefined' ? new Uint8ClampedArray(readFileSync(image)) : content,
    imageBuffer: typeof content === 'undefined' ? new Uint8ClampedArray(readFileSync(image)) : content,
  };
  const result = mainSync({
    command: `convert '${basename(image)}' output.miff`,
    inputFiles: [new File(basename(image), s.imageBuffer)]
  });
  const i = Image.createFromBuffer(s.imageBuffer, 1);
  return {
    ...s,
    magicaBuffer: result.outputFiles[0].content,
    working: undefined,
    imageSize: i && i.getSize() || { width: 400, height: 400 }
  };
}
