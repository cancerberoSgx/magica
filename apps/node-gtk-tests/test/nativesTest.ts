import test from 'ava'

test('node-gtk publics ', async t => {
  const nodegtk = require('node-gtk');
  const Gtk = nodegtk.require('Gtk', '3.0')
  const GObject = nodegtk.require('GObject')
  nodegtk.startLoop();
  Gtk.init()
  const win = new Gtk.Window()
  t.deepEqual(GObject.typeName(win.__gtype__), "GtkWindow")
})