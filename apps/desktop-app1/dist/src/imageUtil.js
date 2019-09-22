"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var gui_1 = require("gui");
var magica_1 = require("magica");
var path_1 = require("path");
function buildBuffers(image, content) {
    var s = {
        image: image,
        currentBuffer: typeof content === 'undefined' ? new Uint8ClampedArray(fs_1.readFileSync(image)) : content,
        imageBuffer: typeof content === 'undefined' ? new Uint8ClampedArray(fs_1.readFileSync(image)) : content,
    };
    var result = magica_1.mainSync({
        command: "convert '" + path_1.basename(image) + "' output.miff",
        inputFiles: [new magica_1.File(path_1.basename(image), s.imageBuffer)]
    });
    var i = gui_1.Image.createFromBuffer(s.imageBuffer, 1);
    return __assign(__assign({}, s), { magicaBuffer: result.outputFiles[0].content, working: undefined, imageSize: i && i.getSize() || { width: 400, height: 400 } });
}
exports.buildBuffers = buildBuffers;
//# sourceMappingURL=imageUtil.js.map