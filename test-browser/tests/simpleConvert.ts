import { basename } from 'misc-utils-of-mine-generic'
import { File, main } from '../../src'
import { assertEquals, assertIncludes } from '../testUtil'

export default async function() {
  let result = await main({
    command: 'convert chala.tiff -rotate 45 output.webp',
    inputFiles: [await File.fromUrl('chala.tiff')]
  })
  assertIncludes(result.outputFiles[0].name, 'output.webp')
  assertEquals(result.outputFiles.map(f => basename(f.name)), ['output.webp'])
  assertEquals(result.error, undefined)
  assertEquals(result.stderr.filter(e => !e.includes('.xml\' @ warning')), [])
}

