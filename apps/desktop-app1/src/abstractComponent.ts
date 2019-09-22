import * as gui from 'gui'
import { arrayToObject, objectKeys } from 'misc-utils-of-mine-generic'
import { State } from './state'
import { getState, setState } from "./store";


export abstract class AbstractComponent<AP = {}, AS = {}> {
  protected state: AS;
  protected props: AP;
  protected view: gui.View;

  constructor(p?: AP) {
    this.props = p || {} as AP
    this.state = { ...p as any }
    this.view = null as any
  }

  protected abstract setState(s: Partial<AS>): void
  abstract render(): gui.View
}

export interface CommonProps {
  win: gui.Window;
}

export abstract class StateComponent<AP = CommonProps, AS extends State = State, RS extends keyof Partial<AS> = keyof Partial<AS>> extends AbstractComponent<AP, AS>{

  protected static stateListeners: StateComponent[] = []

  protected static setState(s: Partial<State>) {
    StateComponent.stateListeners.forEach(l => {
      const names = objectKeys(s).filter(n => l.relevantProperties.includes(n))
      const filtered = arrayToObject(names, a => (s as any)[a])
      l.stateChanged(names, filtered as any)
    })
    setState(s)
  }

  protected relevantProperties: RS[] = []

  constructor(p: AP) {
    super(p)
    this.state = getState() as any
    StateComponent.stateListeners.push(this as any)
  }

  protected setState(s: Partial<AS>) {
    StateComponent.setState(s)
  }

  protected stateChanged(names: RS[], s: Pick<AS, RS>): void {

  }

}
