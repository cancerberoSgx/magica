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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gui = __importStar(require("gui"));
var misc_utils_of_mine_generic_1 = require("misc-utils-of-mine-generic");
var abstractComponent_1 = require("./abstractComponent");
var StatusBar = /** @class */ (function (_super) {
    __extends(StatusBar, _super);
    function StatusBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = null;
        _this.relevantProperties = ['working', 'time'];
        _this.working = null;
        _this.time = null;
        _this.memory = null;
        return _this;
    }
    StatusBar.prototype.render = function () {
        this.view = gui.Container.create();
        this.view.setStyle({ width: '100%', minHeight: 44, flex: 1, alignContent: 'baseline', flexDirection: 'row' });
        this.working = gui.Label.create(this.state.working || '');
        this.working.setStyle({ flexDirection: 'column' });
        this.view.addChildView(this.working);
        this.time = gui.Label.create(misc_utils_of_mine_generic_1.printMs(this.state.time) || '');
        this.time.setStyle({ flexDirection: 'column' });
        this.view.addChildView(this.time);
        this.memory = gui.Label.create((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' mb');
        this.memory.setStyle({ flexDirection: 'column' });
        this.view.addChildView(this.memory);
        this.stateChanged([], {});
        return this.view;
    };
    StatusBar.prototype.stateChanged = function (names, s) {
        s.working && this.working.setBackgroundColor('#ed2266');
        !s.working && this.working.setBackgroundColor('#ededed');
        this.working.setText(s.working || 'Idle');
        this.working.setText(misc_utils_of_mine_generic_1.printMs(this.state.time) || '');
        this.memory.setText((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' mb');
    };
    return StatusBar;
}(abstractComponent_1.StateComponent));
exports.StatusBar = StatusBar;
//# sourceMappingURL=statusBar.js.map