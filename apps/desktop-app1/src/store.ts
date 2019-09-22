import { commands } from './commands'
import { State } from './state'
import { buildBuffers } from './imageUtil'
import { realpathSync } from 'fs';
import { join } from 'path';
import { objectKeys, arrayToObject } from 'misc-utils-of-mine-generic';

let state: State = null as any

export function getState() {
  return state;
}

export function _setState(s: State) {
  state = s;
}

export function setState(s: Partial<State>) {
  stateListeners.forEach(l => {
      const names = objectKeys(s).filter(n => l.relevantProperties.includes(n))
      const filtered = arrayToObject(names, a => (s as any)[a])
      l.stateChanged(names, filtered as any)
    })
  Object.assign(state, s || {});
}
export function addStatelistener(l:StateListener){
  stateListeners.push(l)
}
export interface StateListener< AS extends State = State, RS extends keyof Partial<AS> = keyof Partial<AS> > {
  relevantProperties: RS[]
  stateChanged(names: RS[], s: Pick<AS, RS>): void 
}
const stateListeners: StateListener[] = []

export function getInitialState(): State {
  return { 
    ...buildBuffers(realpathSync(join(__dirname, 'lenna.jpg')) ),
    time: 0,
    working: 'Processing...',
    options: {
      command: commands[0].name,
      onMouseMove: false,
      fields: [],
      commands: commands
    }
  };
}


