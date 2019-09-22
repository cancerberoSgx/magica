import * as gui from 'gui';
import { StateComponent, CommonProps } from "./abstractComponent";
export declare class Options extends StateComponent<CommonProps> {
    protected view: gui.Browser;
    render(): gui.Browser;
    protected handleApply(): void;
    protected handleOnMouseMove(onMouseMove: boolean): void;
    protected handleOpen(): void;
    protected handleSave(): void;
    protected renderOptions(): void;
    protected handleRotate(value?: number): void;
    protected handleResize(width: number, height: number): void;
}
