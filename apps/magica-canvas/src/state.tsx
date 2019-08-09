import { File } from 'magica';
import { Command } from './commands';

export const state: State = {} as any as State;

export interface State {
  time: Element;
  // time: number;
  inputFile: File;
  ctx: CanvasRenderingContext2D;
  x:number
  y:number
  command:Command 
}
