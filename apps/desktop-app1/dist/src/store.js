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
var commands_1 = require("./commands");
var imageUtil_1 = require("./imageUtil");
var fs_1 = require("fs");
var path_1 = require("path");
var state = null;
function getState() {
    return state;
}
exports.getState = getState;
function _setState(s) {
    state = s;
}
exports._setState = _setState;
function setState(s) {
    Object.assign(state, s || {});
}
exports.setState = setState;
function getInitialState() {
    return __assign(__assign({}, imageUtil_1.buildBuffers(fs_1.realpathSync(path_1.join(__dirname, 'lenna.jpg')))), { time: 0, working: 'Processing...', options: {
            command: commands_1.commands[0].name,
            onMouseMove: false,
            fields: [],
            commands: commands_1.commands
        } });
}
exports.getInitialState = getInitialState;
//# sourceMappingURL=store.js.map