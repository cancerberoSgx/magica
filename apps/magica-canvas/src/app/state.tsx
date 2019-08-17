import { File, FS, magickLoaded, Rectangle } from 'magica'
import { fieldArrayToObject, getImageMagickVersion } from '../util/misc'
import { Command, commands } from './commands'
import { calcImageAndCanvasBounds, createInputFile } from './dispatch'
import { _setStore } from './store'

export async function setInitialState() {
  const { FS } = await magickLoaded
  const command = commands[0]

  const fakeInputFile = await File.fromUrl('bluebells.png')
  var { canvasBounds, imageBounds } = await calcImageAndCanvasBounds(fakeInputFile!)

  //Heads up! - we set the initial state in two calls, mainly because loading the input file needs the state and also is part of the state, so set state without the inputFile and then set again. Also the command needs the state to render and is part of the state.
  const s1: State = {
    command,
    FS,
    x: 0,
    y: 0,
    onMouseMove: true,
    time: '',
    warmUpTime: '',
    warmUpIterations: 50,
    fields: fieldArrayToObject(command),
    callCounter: 0,
    stderr: [],
    working: false,
    video: false,
    canvasBounds, imageBounds,
    inputFile: fakeInputFile!,
    imageMagickVersion: await getImageMagickVersion(),
    commandString: ''
  }
  _setStore(s1, true)
  var inputFile = await createInputFile('bluebells.png')
  const s2: State = { ...s1, inputFile: inputFile!, commandString: '' }
  _setStore({ ...s2, commandString: s1.command.command(s2) })
}

export interface State {
  stderr: string[];
  FS: FS,
  working: boolean;
  fields: { [s: string]: Field }
  time: string;
  warmUpIterations: number;
  warmUpTime: string;
  onMouseMove: boolean;
  inputFile: File;
  error?: string
  x: number
  y: number
  command: Command
  commandString: string
  video: boolean
  callCounter: number
  imageMagickVersion: string
  canvasBounds: Rectangle
  imageBounds: Rectangle
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'integer' | 'float'
}
