import { File, protectFile, run } from 'magica'
import { array, notUndefined, randomIntBetween, serial, sleep } from 'misc-utils-of-mine-generic'
import { fieldArrayToObject } from '../misc'
import { CANVAS_WIDTH } from '../ui/canvas'
import { setVideoEnable } from '../video'
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

export async function handleInputFileChange(files: File) {
  var inputFile = await createInputFile(files)
  getStore().setState({
    inputFile
  })
  await change(getStore().getState().x, getStore().getState().y, [inputFile])
}

export async function createInputFile(f: File) {
  var s = await f.size()
  var r = await run({
    script: `convert ${f ? f.name : 'rose:'} -alpha set -resize ${s.width > CANVAS_WIDTH ? CANVAS_WIDTH : s.width} output.miff`,
    inputFiles: [f],
    verbose: true
  })
  var inputFile = File.asFile(r.outputFiles[0])
  protectFile(inputFile)
  return inputFile
}

export async function warmEngines() {
  await sleep(1)
  var size = await getStore().getState().inputFile.size()
  await serial(array(40).map(i => async () => {
    await change(randomIntBetween(0, size.width - 1), randomIntBetween(0, size.height - 1));
    await sleep(1);
  }))
}

export async function handleSetVideoEnable(enabled: boolean) {
  await setVideoEnable(enabled)
  getStore().setState({ video: enabled })
}
