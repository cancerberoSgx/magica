import * as gui from 'gui';
import { StateComponent } from './abstractComponent';
import { State } from './state';
declare type RP = 'working' | 'time';
export declare class StatusBar extends StateComponent {
    protected view: gui.Container;
    protected relevantProperties: RP[];
    protected working: gui.Label;
    protected time: gui.Label;
    protected memory: gui.Label;
    render(): gui.Container;
    protected stateChanged(names: RP[], s: Partial<State>): void;
}
export {};
