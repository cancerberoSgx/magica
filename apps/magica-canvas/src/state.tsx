import { File, protectFile } from 'magica'
import { Command, commands } from './commands'
import { fieldArrayToObject } from './misc';
import { createInputFile } from './dispatch';

export async function getInitialState(): Promise<State> {
  var inputFile = await createInputFile(await File.fromUrl('bluebells.png') as File);
  const command = commands[0]
  const s = {
    command,
    inputFile,
    x: 0,
    y: 0,
    onMouseMove: false,
    time: '',
    fields: fieldArrayToObject(command),
    stderr: [],
    working:false,
    commandString: '',
    video: false
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
  x: number
  y: number
  command: Command
  commandString: string
  video:boolean
}

export interface Field {
  id: string
  value: string
  type?: 'string'|'integer'|'float'
}
