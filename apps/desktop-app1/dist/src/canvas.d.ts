import * as gui from 'gui';
import { StateComponent } from "./abstractComponent";
import { State } from './state';
interface CP {
    win: gui.Window;
}
declare type RP = 'currentBuffer';
export declare class Canvas extends StateComponent<CP> {
    protected view: gui.Scroll;
    protected relevantProperties: RP[];
    protected win: gui.Window;
    protected canvas: gui.Canvas;
    protected image: gui.Image;
    protected canvasContainer: gui.Container;
    render(): gui.Scroll<false>;
    drawImage(p: ArrayBuffer | ArrayBufferView): void;
    protected stateChanged(names: RP[], s: Partial<State>): void;
}
export {};
