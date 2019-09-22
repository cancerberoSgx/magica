import { Field } from './state';
interface Context {
    inputFile: {
        name: string;
    };
    fields: {
        [n: string]: Field;
    };
    x: number;
    y: number;
}
export interface Command {
    name: string;
    command: (state: Context) => string;
    fields: Field[];
}
export declare const commands: Command[];
export {};
