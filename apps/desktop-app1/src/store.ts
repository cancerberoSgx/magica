import { commands } from './commands'
import { State } from './state'
import { realpathSync } from 'fs';
import { join } from 'path';
import { objectKeys, arrayToObject } from 'misc-utils-of-mine-generic';
import { lightTheme } from './styles';
import { buildBuffers } from './imageUtil';
import {imList} from 'magica'

let state: State = null as any

export function getState() {
  return state;
}

export function _setState(s: State) {
  state = s;
}

export function setState(s: Partial<State>) {
  Object.assign(state, s || {});
  stateListeners.forEach(l => {
    const names = objectKeys(s).filter(n => l.relevantProperties.includes(n))
    const filtered = arrayToObject(names, a => (s as any)[a])
    l.stateChanged(names, filtered as any)
  })
}

export function addStatelistener(l: StateListener) {
  stateListeners.push(l)
}

export interface StateListener<AS extends State = State, RS extends keyof Partial<AS> = keyof Partial<AS>> {
  relevantProperties: RS[]
  stateChanged(names: RS[], s: Pick<AS, RS>): void
}

const stateListeners: StateListener[] = []

export async function getInitialState(): Promise<State> {
  return {
    ...await buildBuffers(realpathSync(join(__dirname, 'lenna.jpg')), undefined, 1),
    time: 0,
    working: 'Processing...',
    imageRotate: 0,
    command: commands[0].name,
    fields: commands[0].fields,
    commands: commands,
    onMouseMove: false,
    theme: lightTheme,
    scaleFactor: 1,
    autoApply: false,
    virtualPixel: imList.VirtualPixel.White,
    outputFormat: 'jpg',
    imageOffset: {x: 0, y: 0},
    gravity: imList.Gravity.Center,
    rotatePreserveSize: true
  };
}


