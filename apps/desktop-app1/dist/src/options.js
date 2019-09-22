"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var gui = __importStar(require("gui"));
var magica_1 = require("magica");
var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");
var path_1 = require("path");
var abstractComponent_1 = require("./abstractComponent");
var imageUtil_1 = require("./imageUtil");
var guiUtil_1 = require("./guiUtil");
var Options = /** @class */ (function (_super) {
    __extends(Options, _super);
    function Options() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = null;
        return _this;
    }
    Options.prototype.render = function () {
        var _this = this;
        this.view = gui.Browser.create({});
        this.view.setStyle({ width: '100%', height: '100%', flex: 1 });
        this.view.setBindingName('app1');
        this.view.addBinding('handleRotate', function (value) { return _this.handleRotate(value); });
        this.view.addBinding('handleOpen', function () { return _this.handleOpen(); });
        this.view.addBinding('handleSave', function () { return _this.handleSave(); });
        this.view.addBinding('handleApply', function () { return _this.handleApply(); });
        this.view.addBinding('handleResize', function (width, height) { return _this.handleResize(width, height); });
        this.view.addBinding('handleOnMouseMove', function (value) { return _this.handleOnMouseMove(value); });
        this.renderOptions();
        return this.view;
    };
    Options.prototype.handleApply = function () {
        // const result = mainSync({
        //   command: `convert output.jpg output.miff`,
        //   inputFiles: [new File('output.jpg', this.state.currentBuffer)],
        // })
        // const i = gui.Image.createFromBuffer(this.state.currentBuffer, 1)
        this.setState(imageUtil_1.buildBuffers('output.jpg', this.state.currentBuffer));
        // ...buildBuffers('output.jpg', this.state.currentBuffer)
        // imageBuffer: this.state.currentBuffer,
        // currentBuffer: this.state.currentBuffer,
        // working: undefined,
        // imageSize: i.getSize(),
        // time: result.times ? result.times.total : 0,
        // magicaBuffer: result.outputFiles[0].content
        // })
    };
    Options.prototype.handleOnMouseMove = function (onMouseMove) {
        // console.log('handleOnMouseMove', onMouseMove)
        this.setState({ options: __assign(__assign({}, this.state.options), { onMouseMove: onMouseMove }) });
    };
    Options.prototype.handleOpen = function () {
        var dialog = gui.FileOpenDialog.create();
        dialog.setOptions(gui.FileDialog.optionShowHidden);
        dialog.setFilters([
            { description: 'Images', extensions: magica_1.knownSupportedReadWriteImageFormats },
        ]);
        if (dialog.runForWindow(this.props.win)) {
            this.setState(imageUtil_1.buildBuffers(dialog.getResult()));
        }
    };
    Options.prototype.handleSave = function () {
        var dialog = gui.FileSaveDialog.create();
        dialog.setOptions(gui.FileDialog.optionShowHidden);
        dialog.setFilters([
            { description: 'Images', extensions: magica_1.knownSupportedReadWriteImageFormats },
        ]);
        if (dialog.runForWindow(this.props.win)) {
            var result = magica_1.mainSync({
                command: "convert output.miff '" + path_1.basename(dialog.getResult()) + "'",
                inputFiles: [new magica_1.File('output.miff', this.state.magicaBuffer)],
            });
            if (result.outputFiles.length) {
                fs_1.writeFileSync(dialog.getResult(), result.outputFiles[0].content);
                // this.setState({
                //   working: undefined,
                //   time: result.times ? result.times.total : 0
                // })
                guiUtil_1.showModal({ title: 'File Saved', body: 'File successfully saved at \n' + dialog.getResult() });
            }
            else {
                //  this.setState({
                //   working: undefined,
                // })
                guiUtil_1.showModal({ title: 'Error', body: 'An error occurred while trying to save file \n' + dialog.getResult() + ': \n' + result.error + '\n' + result.stderr.join(', ') });
            }
        }
    };
    Options.prototype.renderOptions = function () {
        var _this = this;
        var html = "\n<button onClick=\"app1.handleOpen()\">Open</button><br/>\n<button onClick=\"app1.handleSave()\">Save</button><br/>\n<button onClick=\"app1.handleApply()\">Apply</button><br/>\nRotate:<br>\n<input type=\"range\" value=\"0\" onchange=\"app1.handleRotate(this.value)\" min=\"0\" max=\"360\">\nWidth:<br>\n<input step=\"20\" type=\"number\" value=\"" + this.state.imageSize.width + "\" onchange=\"app1.handleResize(this.value, undefined)\">\nHeight:<br/>\n<input step=\"10\" type=\"number\" value=\"" + this.state.imageSize.height + "\" onchange=\"app1.handleResize(undefined, this.value)\">\n<label>Commands: <select>" + this.state.options.commands.map(function (c) { return "<option selected=\"" + (_this.state.options.command === c.name) + "\" value=\"" + c.name + "\">" + c.name + "</option>"; }).join('\n    ') + "\n</select></label>\n<label><input type=\"checkbox\" " + (this.state.options.onMouseMove ? 'checked' : '') + " onchange=\"app1.handleOnMouseMove(this.checked)\">On Mouse Move</label>\n";
        this.view.loadHTML(html, 'http://localhost');
    };
    Options.prototype.handleRotate = function (value) {
        if (value === void 0) { value = misc_utils_of_mine_generic_1.int(0, 360); }
        var result = magica_1.mainSync({
            command: "convert output.miff -virtual-pixel white -rotate " + value + " output.jpg",
            inputFiles: [new magica_1.File('output.miff', this.state.magicaBuffer)],
        });
        var i = gui.Image.createFromBuffer(result.outputFiles[0].content, 1);
        this.setState({
            currentBuffer: result.outputFiles[0].content,
            working: undefined,
            time: result.times ? result.times.total : 0,
            imageSize: i && i.getSize() || this.state.imageSize
        });
    };
    Options.prototype.handleResize = function (width, height) {
        var result = magica_1.mainSync({
            command: "convert output.miff -virtual-pixel white -scale !" + (width || this.state.imageSize.width) + "x" + (height || this.state.imageSize.height) + " output.jpg",
            inputFiles: [new magica_1.File('output.miff', this.state.magicaBuffer)],
        });
        this.setState({
            currentBuffer: result.outputFiles[0].content,
            working: undefined,
            time: result.times ? result.times.total : 0,
            imageSize: {
                width: width || this.state.imageSize.width,
                height: height || this.state.imageSize.height
            }
        });
    };
    return Options;
}(abstractComponent_1.StateComponent));
exports.Options = Options;
//# sourceMappingURL=options.js.map