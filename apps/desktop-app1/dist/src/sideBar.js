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
var abstractComponent_1 = require("./abstractComponent");
var options_1 = require("./options");
var SideBar = /** @class */ (function (_super) {
    __extends(SideBar, _super);
    function SideBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = null;
        _this.open = null;
        _this.save = null;
        _this.test = null;
        _this.options = null;
        return _this;
    }
    SideBar.prototype.render = function () {
        this.view = gui.Container.create();
        this.view.setStyle({
            width: 160, height: '100%', flexDirection: 'column', alignContent: "baseline"
        });
        this.options = new options_1.Options({ win: this.props.win });
        this.view.addChildView(this.options.render());
        this.view.setBackgroundColor('#ededed');
        this.view.setStyle({
            width: this.view.getPreferredSize().width
        });
        return this.view;
    };
    return SideBar;
}(abstractComponent_1.StateComponent));
exports.SideBar = SideBar;
//# sourceMappingURL=sideBar.js.map