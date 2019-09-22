"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gui_1 = require("gui");
function showModal(o) {
    var p = gui_1.Container.create();
    p.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' });
    // p.setStyle({flex: 1})
    var body = typeof o.body === 'string' ? gui_1.Label.create(o.body) : o.body;
    body.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' });
    p.addChildView(body);
    var w = gui_1.Window.create({ frame: true, showTrafficLights: true });
    w.setContentView(p);
    w.setTitle(o.title || 'Modal');
    body.onKeyUp = function (self, event) {
        console.log(event.key, event);
        // event.key==='ESC'
    };
    p.onKeyUp = function (self, event) {
        console.log(event.key, event);
        // event.key==='ESC'
    };
    w.getContentView().onKeyDown = function (s, e) {
        console.log(e.key, e);
    };
    //  const w = gui.Window.create({frame: true, showTrafficLights: true})
    w.setAlwaysOnTop(true);
    w.setContentSize({ width: 400, height: 200 });
    w.setTitle(o.title || 'Modal');
    // this.props.win.addChildWindow(w)
    var b = gui_1.Button.create('Close');
    p.addChildView(b);
    b.onClick = function () { w.close(); };
    // p.addChildView(l)
    // w.setContentView(p)
    w.setVisible(true);
    w.center();
    w.activate();
}
exports.showModal = showModal;
//# sourceMappingURL=guiUtil.js.map