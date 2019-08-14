import { File, fileUtil, magickLoaded, protectFile, run } from 'magica'
import { array, notUndefined, randomIntBetween, serial, sleep } from 'misc-utils-of-mine-generic'
import { fieldArrayToObject, time } from '../util/misc'
import { setVideoEnable } from '../util/video'
import { change } from './change'
import { commands } from './commands'
import { Field } from './state'
import { getStore } from './store'

export function dispatchCanvasMouseMove(x: number, y: number) {
  var s = getStore().getState()
  if (!s.working && s.onMouseMove) {
    change(x, y)
  }
}

export function dispatchFieldChange(f: Field) {
  getStore().setState({
    fields: { ...getStore().getState().fields, [f.id]: f }
  })
}

export function dispatchCommandSelected(f: string) {
  var command = commands.find(c => c.name === f)!
  var fields = fieldArrayToObject(command)
  getStore().setState({
    command,
    fields
  })
}

export async function handleFileInputChange(e: HTMLInputElement) {
  var files = await File.fromHtmlFileInputElement(e)
  files = files.filter(notUndefined)
  if (files.length == 0) {
    return
  }
  await handleInputFileChange(files[0])
}

export async function handleInputFileChange(file: File) {
  var inputFile = await createInputFile(file)
  getStore().setState({
    inputFile
  })
  await change(getStore().getState().x, getStore().getState().y, [inputFile!])
}

export async function createInputFile(f: File) {
  var size = await f.size()

  var result = await run({
    script: `convert ${await f.sizeDepthArgs()}  ${f ? f.name : 'rose:'} -alpha set -resize ${Math.max(size.width, getStore().getState().canvasWidth)} output.miff`,
    inputFiles: [f],
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

export async function warmUp(n: number) {
  getStore().setState({ warmUpTime: '', working: true })
  var t0 = performance.now()
  await sleep(1)
  var size = await getStore().getState().inputFile.size()
  await serial(array(n).map(i => async () => {
    await sleep(1);
    await change(randomIntBetween(0, size.width - 1), randomIntBetween(0, size.height - 1));
  }))

  getStore().setState({ warmUpTime: time((performance.now() - t0) / n), working: false })
}

export async function handleSetVideoEnable(enabled: boolean) {
  await setVideoEnable(enabled)
  getStore().setState({ video: enabled })
}

// export async function handleTakePicture( ) {
  // await setVideoEnable(enabled)
  // getStore().setState({ video: enabled })
// }
