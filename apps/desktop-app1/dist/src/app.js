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
var canvas_1 = require("./canvas");
var menu_1 = require("./menu");
var sideBar_1 = require("./sideBar");
var statusBar_1 = require("./statusBar");
var App1 = /** @class */ (function (_super) {
    __extends(App1, _super);
    function App1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.win = null;
        _this.content = null;
        _this.canvas = null;
        _this.menuPanel = null;
        _this.bodyPanel = null;
        _this.sideBar = null;
        _this.relevantProperties = ['image'];
        _this.menu = null;
        return _this;
    }
    App1.prototype.render = function () {
        this.createWindow();
        this.menu = new statusBar_1.StatusBar({ win: this.win }).render();
        this.menuPanel.addChildView(this.menu);
        this.sideBar = new sideBar_1.SideBar({ win: this.win }).render();
        this.bodyPanel.addChildView(this.sideBar);
        this.canvas = new canvas_1.Canvas({ win: this.win });
        this.bodyPanel.addChildView(this.canvas.render());
        var menubar = new menu_1.Menu();
        if (process.platform !== 'darwin') {
            this.win.setMenuBar(menubar.menu);
        }
        else {
            gui.app.setApplicationMenu(menubar.menu);
        }
        return this.content;
    };
    App1.prototype.start = function () {
        this.win.center();
        this.win.activate();
        if (!process.versions.yode) {
            try {
                gui.MessageLoop.run();
            }
            catch (error) {
                console.log('Main Error', error);
                process.exit(1);
            }
            process.exit(0);
        }
    };
    App1.prototype.createWindow = function () {
        this.content = gui.Container.create();
        this.content.setBackgroundColor('#ffffff');
        this.content.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' });
        this.menuPanel = gui.Container.create();
        this.menuPanel.setStyle({ width: '100%', flex: 0, height: 40, flexDirection: 'row' });
        this.bodyPanel = gui.Container.create();
        this.bodyPanel.setStyle({ width: '100%', flex: 1, height: '100%', flexGrow: 1, flexDirection: 'row' });
        this.bodyPanel.setBackgroundColor('#ffffff');
        this.content.addChildView(this.menuPanel);
        this.content.addChildView(this.bodyPanel);
        this.win = gui.Window.create({});
        this.win.setTitleVisible(true);
        this.win.setTitle('Hello there!');
        this.win.setContentView(this.content);
        this.win.onClose = function () { gui.MessageLoop.quit(); };
        this.win.setContentSize({ width: 600, height: 600 });
    };
    App1.prototype.stateChanged = function (names, s) {
        if (names.includes('image') && s['image']) {
            this.win.setTitle(s['image']);
        }
    };
    return App1;
}(abstractComponent_1.StateComponent));
exports.App1 = App1;
//# sourceMappingURL=app.js.map