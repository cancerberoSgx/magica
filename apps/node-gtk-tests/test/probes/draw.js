/*
 * drawing-area.js
 */

const gi = require('node-gtk')
const Gtk = gi.require('Gtk', '3.0')
// const Gtk = gi.require('Gtk', '3.0')
const Gdk = gi.require('Gdk', '3.0')
const Cairo = gi.require('cairo')

Gtk.init()

// Main program window
const window = new Gtk.Window({
  type : Gtk.WindowType.TOPLEVEL
})

// Draw area
const drawingArea = new Gtk.DrawingArea()
drawingArea.setSizeRequest(500,500)
// gtk_widget_set_size_request

// drawingArea
//  g_signal_connect (G_OBJECT (canvas), "expose-event",
//                     G_CALLBACK (paint),
//                     NULL  /*< here we can pass a pointer to a custom data structure */
//                   );
// debugger

drawingArea.on("draw", () => {
debugger
  const width = drawingArea.getAllocatedWidth()
  const height = drawingArea.getAllocatedHeight()

  const context = Gdk.cairoCreate(window.getWindow())

debugger

  // cr = gdk_cairo_create (widget->window);
// Gdk.gdk_cairo_create

  console.log({ width, height })
  console.log(context.__proto__)
  console.log(context.__proto__.prototype)


  console.log(['draw', context])
  if(context){
    debugger
  // Cairo in GJS uses camelCase function names
  context.setSourceRGB(1.0, 0.0, 0.0);
  context.setOperator(Cairo.Operator.DEST_OVER);
  context.arc(16, 16, 16, 0, 2*Math.PI);
  context.fill();

  }

  return true
})

// configure main window
window.setDefaultSize(1200, 720)
window.setResizable(true)
window.add(drawingArea)

// window show event
window.on('show', () => {
  Gtk.main()
})

// window after-close event
window.on('destroy', () => Gtk.mainQuit())

// window close event: returning true has the semantic of preventing the default behavior:
// in this case, it would prevent the user from closing the window if we would return `true`
window.on('delete-event', () => false)
window.showAll()