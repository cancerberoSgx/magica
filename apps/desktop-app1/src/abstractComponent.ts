import * as gui from 'gui'
import { State } from './state'
import { getState, setState, StateListener, addStatelistener } from "./store";


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

export abstract class StateComponent<AP = CommonProps, AS extends State = State, RS extends keyof Partial<AS> = keyof Partial<AS>> extends AbstractComponent<AP, AS> implements StateListener<AS, RS>{

  relevantProperties: RS[] = []
  
  protected setState(s: Partial<AS>) {
     setState(s)
  }

  constructor(p: AP) {
    super(p)
    this.state = getState() as any
    addStatelistener(this as any)
  }

  stateChanged(names: RS[], s: Pick<AS, RS>): void {

  }
}
