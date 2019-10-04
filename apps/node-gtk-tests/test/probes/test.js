const gi = require('node-gtk')
const Gtk = gi.require('Gtk', '3.0')

gi.startLoop()
Gtk.init()

const win = new Gtk.Window()
debugger
win.on('destroy', () => Gtk.mainQuit())
win.on('delete-event', () => false)

win.setDefaultSize(200, 80)
const l = new Gtk.Label({ label: 'Hello Gtk+' })
win.add(l)

const b = new Gtk.Button()
console.log(b.alwaysShowImage, b['always-show-image']);
console.log(Object.keys(b));

win.add(b)

win.showAll()
Gtk.main()