import { randomIntBetween } from 'misc-utils-of-mine-generic'
import { State } from './state'

export const commands: Command[] = [
  {
    name: 'barrel',
    command: state => `convert ${state.inputFile.name} -matte -virtual-pixel transparent -distort Barrel '${[0.2, 0.7, .2, .5, state.x, state.y].join(' ')}' output.rgba`
  },
  {
    name: 'rotate',
    command: state => `convert  ${state.inputFile.name} -rotate ${randomIntBetween(0, 360)} output.rgba`
  }
]

export interface Command {
  name: string
  command: (state: State) => string
}
