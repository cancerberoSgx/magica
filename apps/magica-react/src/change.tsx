import { File, fileUtil, loadHtmlCanvasElement, magickLoaded, protectFile, run } from 'magica'
import { ChangeOptions, ChangeResult } from './types'

export async function change(o: ChangeOptions): Promise<ChangeResult> {
  let script = await o.script(o)
  script = script.endsWith('output.rgba') ? script : script + '  output.rgba'
  var result = await run({
    script,
    inputFiles: o.inputFiles,
    verbose: true
  })
  if (!result.error && result.outputFiles.length === 0) {
    const { FS } = await magickLoaded
    result.outputFiles.push(fileUtil.readFile('output.miff', FS))
  }

  await loadHtmlCanvasElement(result.outputFiles[0] as any, o.ctx)
  return { ...result, script }
}

interface O2 {
  file: File
  canvasWidth: number
  canvasHeight: number
}
/**
 * to load a new image in the canvas must be init with this 
 */
export async function createInputFile(o: O2) {
  var size = await o.file.size()
  var result = await run({
    script: `convert ${await o.file.sizeDepthArgs()}  ${o.file ? o.file.name : 'rose:'} -alpha set -resize ${Math.max(o.canvasWidth, size.width)} output.miff`,
    inputFiles: [o.file],
    verbose: true
  })
  if (!result.error && result.outputFiles.length === 0) {
    const { FS } = await magickLoaded
    result.outputFiles.push(fileUtil.readFile('output.miff', FS))
  }
  if (result.error || result.outputFiles.length === 0) {
    console.error('Error executing run()', result.stderr, result.error)
  } else {
    var inputFile = File.asFile(result.outputFiles[0])
    protectFile(inputFile)
    return inputFile!
  }
}


