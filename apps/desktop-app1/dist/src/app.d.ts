import * as gui from 'gui';
import { StateComponent } from './abstractComponent';
import { Canvas } from './canvas';
import { State } from './state';
declare type RP = 'image';
export declare class App1 extends StateComponent<{}> {
    protected win: gui.Window;
    protected content: gui.Container;
    protected canvas: Canvas;
    protected menuPanel: gui.Container;
    protected bodyPanel: gui.Container;
    protected sideBar: gui.Container;
    protected relevantProperties: RP[];
    protected menu: gui.Container;
    render(): gui.Container;
    start(): void;
    protected createWindow(): void;
    protected stateChanged(names: RP[], s: Partial<State>): void;
}
export {};
