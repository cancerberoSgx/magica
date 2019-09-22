"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gui = __importStar(require("gui"));
var Menu = /** @class */ (function () {
    function Menu() {
        var menus = [];
        menus.push({
            label: 'File',
            submenu: [
                // {
                //   label: 'Reload',
                //   accelerator: 'CmdOrCtrl+Shift+R',
                //   onClick() {
                //   },
                // },
                // { type: 'separator' },
                // {
                //   label: 'Disconnect',
                //   onClick() {
                //   }
                // },
                {
                    label: 'Collect Garbage',
                    accelerator: 'CmdOrCtrl+Shift+G',
                    onClick: function () {
                        try {
                            if (global.gc) {
                                global.gc();
                            }
                        }
                        catch (error) {
                            console.error(error);
                        }
                        // process.resourceUsage().
                    },
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    onClick: function () {
                        gui.MessageLoop.quit();
                        process.exit(0);
                    },
                },
            ],
        });
        // macOS specific app menus.
        if (process.platform === 'darwin') {
            menus[0].submenu.splice(menus[0].submenu.length - 2, 0, { type: 'separator' }, { role: 'hide' }, { role: 'hide-others' }, { type: 'separator' });
        }
        // Edit menu.
        menus.push({
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'select-all' },
            ],
        });
        menus.push({
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'New Window',
                    accelerator: 'CmdOrCtrl+Shift+N',
                    onClick: function () { }
                },
                {
                    label: 'Close Window',
                    accelerator: 'CmdOrCtrl+W',
                    onClick: function () {
                        gui.MessageLoop.quit();
                        process.exit(0);
                    }
                },
            ],
        });
        this.menu = gui.MenuBar.create(menus);
    }
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map