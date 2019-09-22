/// <reference types="gui" />
export declare function buildBuffers(image: string, content?: ArrayBufferView): {
    magicaBuffer: ArrayBufferView;
    working: undefined;
    imageSize: import("gui").SizeF;
    image: string;
    currentBuffer: ArrayBufferView;
    imageBuffer: ArrayBufferView;
};
