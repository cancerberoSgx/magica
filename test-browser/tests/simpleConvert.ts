import { basename } from 'misc-utils-of-mine-generic'
import { main } from '../../src'
import { File } from '../../src/file/file'
import { assertEquals, assertIncludes } from '../testUtil'

export default async function() {
  let result = await main({
    command: 'convert chala.tiff -rotate 45 output.bmp',
    inputFiles: [await File.fromUrl('chala.tiff')]
  })
  assertIncludes(result.outputFiles[0].name, 'output.bmp')
  assertEquals(result.outputFiles.map(f => basename(f.name)), ['output.bmp'])
  assertEquals(result.error, undefined)
  assertEquals(result.stderr, [])
}

