import { File, fileUtil, protectFile, run } from 'magica'
import { array, notUndefined, randomIntBetween, serial, sleep } from 'misc-utils-of-mine-generic'
import { fieldArrayToObject, time } from '../util/misc'
import { setVideoEnable } from '../util/video'
import { change } from './change'
import { commands } from './commands'
import { Field } from './state'
import { getState, getStore } from './store'

export function dispatchCanvasMouseMove(x: number, y: number) {
  var s = getState()
  if (!s.working && s.onMouseMove) {
    change(x - s.imageBounds.x, y - s.imageBounds.y)
  }
}

export function dispatchFieldChange(f: Field) {
  getStore().setState({
    fields: { ...getState().fields, [f.id]: f }
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

export async function handleHTMLInputFileChange(e: HTMLInputElement) {
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
  await change(getState().x, getState().y, [inputFile!])
}

/**
 * called to load a new image (initially or user input / photo / cam)
 * state is passed specially and only once when the state is not yet built (hack)
 */
export async function createInputFile(fileOrUrl: File | string) {
  const state = getState()
  var f = typeof fileOrUrl === 'string' ? await File.fromUrl(fileOrUrl) : fileOrUrl
  if (!f) {
    getStore().setState({ error: 'Cannot load file ' + fileOrUrl })
    return
  }
  Object.assign(state, await calcImageAndCanvasBounds(f))
  var result = await run({
    script: `convert ${await f.sizeDepthArgs()}  ${f ? f.name : 'rose:'} -alpha set -resize ${Math.min(state.canvasBounds.width, state.imageBounds.width)} output.miff`,
    inputFiles: [f],
    verbose: true
  })
  if (!result.error && result.outputFiles.length === 0) {
    result.outputFiles.push(fileUtil.readFile('output.miff', state.FS))
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
  var size = await getState().inputFile.size()
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


export async function calcImageAndCanvasBounds(f: File) {
  var size = await f!.size()
  var canvasBounds = { x: 0, y: 0, width: window.screen.width / 2 - 30, height: window.screen.height / 1.5 }
  var imageBounds = { ...size, x: Math.max(0, (canvasBounds.width - size.width) / 2), y: Math.max(0, (canvasBounds.height - size.height) / 2) }
  return { canvasBounds, imageBounds }
}
