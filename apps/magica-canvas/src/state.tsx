import { File, protectFile } from 'magica'
import { run } from '../../../dist/src/main/run'
import { Command, commands } from './commands'
import { fieldArrayToObject } from './misc';

export async function getInitialState(): Promise<State> {
  var r = await run({
    script: 'convert bluebells.png output.miff',
    inputFiles: [await File.fromUrl('bluebells.png')],
    verbose: true
  })
  var inputFile = File.asFile(r.outputFiles[0])
  protectFile(inputFile)
  const command = commands[0]
  const s = {
    command,
    // ctx: document.querySelector<HTMLCanvasElement>('#canvas')!.getContext('2d')!,
    inputFile,
    x: 0,
    y: 0,
    onMouseMove: false,
    time: '',
    fields: fieldArrayToObject(command),
    stderr: [],
    working:false,commandString: ''
  } as State
  s.commandString = command.command(s)
  return s
}

export interface State {
  stderr: string[];
  working: boolean;
  fields: {[s:string]:Field}
  time: string;
  onMouseMove: boolean;
  inputFile: File;
  // ctx: CanvasRenderingContext2D;
  x: number
  y: number
  command: Command
  commandString: string
}

export interface Field {
  id: string
  value: string
  type?: 'string'|'integer'|'float'
}