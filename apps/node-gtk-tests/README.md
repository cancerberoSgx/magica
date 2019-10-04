## TODO

- [ ] callbacks type names issue :   'Gtk.callback.set_action_name - type',
- [ ] member visibility  ? there's no info it seems. 
- [ ] Support  multiple constructor signatures!
- [ ] complete apps/node-gtk-tests/src/gobjectTypes.ts and add descriptions
- [ ] https://bazaar.launchpad.net/~smoke-gobject-devs/smoke-gobject/trunk/view/head:/tools/gsmokegen/cppgenerator.cpp
 
NOTES / questions: 

### fields and field.callback

 + (it seems ) fields with callbacks - like callback.sync_action_properties' (https://developer.gnome.org/pygtk/stable/class-gtkactivatable.html#method-gtkactivatable--sync-action-properties) are meant to be overriden (with inheritance and/or perhaps dynamically (monkey-patch)   to be notified for events ...:

```
class MyButton extends Gtk.Button {
  sync_action_properties(action){
    super(action)
    log('hello '+action)
  }
}
```
Is not clear for me if monkey-patching like the following should be supported: 

```
 aButton.sync_action_properties = action => log('hello '+action)
 ```