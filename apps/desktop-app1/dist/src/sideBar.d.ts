import * as gui from 'gui';
import { StateComponent } from "./abstractComponent";
import { Options } from './options';
export declare class SideBar extends StateComponent {
    protected view: gui.Container;
    protected open: gui.Button;
    protected save: gui.Button;
    protected test: gui.Button;
    protected options: Options;
    render(): gui.Container;
}
