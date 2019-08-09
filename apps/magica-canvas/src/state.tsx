import { File, protectFile } from 'magica'
import { run } from '../../../dist/src/main/run'
import { Command, commands } from './commands'

export async function getInitialState(): Promise<State> {
  var r = await run({
    script: 'convert bluebells.png output.miff',
    inputFiles: [await File.fromUrl('bluebells.png')],
  })
  var inputFile = r.outputFiles[0]
  protectFile(inputFile)
  const command = commands[0]
  const s = {
    command,
    ctx: document.querySelector<HTMLCanvasElement>('#canvas')!.getContext('2d')!,
    inputFile,
    x: 0,
    y: 0,
    onMouseMove: false,
    time: ''
  } as State
  s.commandString = command.command(s)
  return s
}
export interface State {
  working: boolean;
  time: string;
  onMouseMove: boolean;
  inputFile: File;
  ctx: CanvasRenderingContext2D;
  x: number
  y: number
  command: Command
  commandString: string
}
