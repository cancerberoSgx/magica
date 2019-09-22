import * as gui from 'gui';
import { State } from './state';
export declare abstract class AbstractComponent<AP = {}, AS = {}> {
    protected state: AS;
    protected props: AP;
    protected view: gui.View;
    constructor(p?: AP);
    protected abstract setState(s: Partial<AS>): void;
    abstract render(): gui.View;
}
export interface CommonProps {
    win: gui.Window;
}
export declare abstract class StateComponent<AP = CommonProps, AS extends State = State, RS extends keyof Partial<AS> = keyof Partial<AS>> extends AbstractComponent<AP, AS> {
    protected static stateListeners: StateComponent[];
    protected static setState(s: Partial<State>): void;
    protected relevantProperties: RS[];
    constructor(p: AP);
    protected setState(s: Partial<AS>): void;
    protected stateChanged(names: RS[], s: Pick<AS, RS>): void;
}
