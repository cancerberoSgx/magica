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
var abstractComponent_1 = require("./abstractComponent");
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = null;
        _this.relevantProperties = ['currentBuffer'];
        _this.win = null;
        _this.canvas = null;
        _this.image = null;
        _this.canvasContainer = null;
        return _this;
    }
    Canvas.prototype.render = function () {
        var _this = this;
        this.view = gui.Scroll.create();
        this.view.setStyle({ flex: 1, flexGrow: 1, width: '100%', height: '100%', flexDirection: 'column' });
        this.view.setBackgroundColor('#ffffff');
        this.canvasContainer = gui.Container.create();
        this.canvasContainer.setBackgroundColor('#ffffff');
        // this.canvasContainer.onMouseUp
        // (this.canvasContainer.onMouseUp as gui.Signal<(self: gui.Container, event: gui.MouseEvent)=> void>).connect( (self, event) => {
        this.canvasContainer.onMouseMove.connect(function (self, event) {
            console.log('handleOnMouseMove2', _this.state.options.onMouseMove);
            if (!_this.state.options.onMouseMove) {
                return;
            }
            var command = "convert output.miff -matte -virtual-pixel white -distort Barrel '-0.4 0.7 0.2 0.5 " + event.positionInView.x + " " + event.positionInView.y + "' output.jpg";
            var result = magica_1.mainSync({
                command: command,
                inputFiles: [new magica_1.File('output.miff', _this.state.magicaBuffer)],
            });
            _this.setState({
                currentBuffer: result.outputFiles[0].content,
                working: undefined,
                time: result.times ? result.times.total : 0
            });
        });
        this.view.setContentView(this.canvasContainer);
        this.drawImage(fs_1.readFileSync(this.state.image));
        this.canvasContainer.onDraw.connect(function (self, painter, dirty) {
            painter.drawCanvasFromRect(_this.canvas, dirty, dirty);
            // painter.drawImageFromRect(this.image, dirty, dirty)
        });
        return this.view;
    };
    Canvas.prototype.drawImage = function (p) {
        if (!p) {
            return;
        }
        this.image = gui.Image.createFromBuffer(p, 1);
        var size = this.image.getSize();
        this.view.setContentSize(size);
        this.canvas = gui.Canvas.create(size, 1);
        this.canvas.getPainter().drawImage(this.image, __assign({ x: 0, y: 0 }, size));
        this.canvasContainer.schedulePaint(); // TODO: scheduleRectPaint - only scroll viewport
    };
    Canvas.prototype.stateChanged = function (names, s) {
        this.drawImage(s.currentBuffer);
    };
    return Canvas;
}(abstractComponent_1.StateComponent));
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map