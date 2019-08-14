import { File, Options, RunResult } from 'magica'
import { RemoveProperties } from 'misc-utils-of-mine-generic'
import { ChangeResult } from './types'

export interface P extends Partial<Options> {
  width?: number;
  height?: number;
  onMouseMove?: MouseMoveListener;
  onClick?: ClickListener;
  onMouseMoveScript?: (e: MouseMoveScriptEvent) => Promise<string>;
  onMouseMoveScriptResult?: (e?: ChangeResult) => Promise<void>;
  onClickScript?: (e: ClickScriptEvent) => Promise<string>;
  onClickScriptResult?: (e?: ChangeResult) => Promise<void>;
  ref?: (el: HTMLElement) => void;
}

export type MouseMoveListener = (e: MouseMoveEvent) => void

export type ClickListener = (e: ClickEvent) => void

export interface ClickEvent extends MouseEvent {
}

export interface MouseMoveEvent extends MouseEvent {
}

export interface ClickScriptEvent extends ClickEvent {
  inputFiles: File[];
}

export interface MouseMoveScriptEvent extends MouseMoveEvent {
  inputFiles: File[];
}

export interface MouseEvent {
  x: number;
  y: number;
}

export interface ChangeOptions {
  x: number
  y: number
  inputFiles: File[]
  script: (c: ScriptContext) => Promise<string>
  ctx: CanvasRenderingContext2D
}

export interface ScriptContext extends RemoveProperties<RemoveProperties<ChangeOptions, 'script'>, 'ctx'> {

}

export interface ChangeResult extends RunResult { script: string }

export enum Action {
  mouseMove, click
}
export interface Point {
  x: number
  y: number
}
