import test from 'ava'
  const nodegtk = require('node-gtk');

test('node-gtk publics & GObject', async t => {
  const Gtk = nodegtk.require('Gtk', '3.0')
  const GObject = nodegtk.require('GObject')
  nodegtk.startLoop();
  Gtk.init()
  const win = new Gtk.Window()
  t.deepEqual(GObject.typeName(win.__gtype__), "GtkWindow")
})


test('node-gtk internals ', async t => {
const GI = nodegtk._GIRepository;
  const repo = GI.Repository_get_default();
  if (!nodegtk._isLoaded('Gtk', '3.0'))
    GI.Repository_require.call(repo, 'Gtk', '3.0', 0);
  nodegtk.startLoop();
  const nInfos = GI.Repository_get_n_infos.call(repo, 'Gtk');
  t.true(nInfos>10)
    const info = GI.Repository_get_info.call(repo, 'Gtk', 2);    
  const GObject = nodegtk.require('GObject')
    t.deepEqual(GObject.typeName(info.__gtype__), 'GIBaseInfo')

})
