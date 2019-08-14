import { File } from 'magica'
import { fieldArrayToObject, getImageMagickVersion } from '../util/misc'
import { Command, commands } from './commands'
import { createInputFile } from './dispatch'

export async function getInitialState(): Promise<State> {
  var inputFile = await createInputFile(await File.fromUrl('bluebells.png') as File)
  const command = commands[0]
  const s = {
    command,
    inputFile,
    x: 0,
    y: 0,
    onMouseMove: true,
    time: '',
    warmUpTime: '', warmUpIterations: 50,
    fields: fieldArrayToObject(command),
    callCounter: 0,
    stderr: [],
    working: false,
    commandString: '',
    video: false,
    imageMagickVersion: await getImageMagickVersion(),
  canvasWidth: 600,
  canvasHeight: 600
  } as State
  s.commandString = command.command(s)
  return s
}

export interface State {
  canvasWidth: number
  canvasHeight: number
  stderr: string[];
  working: boolean;
  fields: { [s: string]: Field }
  time: string;
  warmUpIterations: number;
  warmUpTime: string;
  onMouseMove: boolean;
  inputFile: File;
  x: number
  y: number
  command: Command
  commandString: string
  video: boolean
  callCounter: number
  imageMagickVersion: string
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'integer' | 'float'
}
