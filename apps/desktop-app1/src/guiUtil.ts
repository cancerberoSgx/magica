import { View, Label, Window, Container, Button } from 'gui';
import { gunzip } from 'zlib';

interface ShowModalOptions {
  body: View|string
  title?: string
}
export function showModal(o:ShowModalOptions) {
      const p = Container.create()
      p.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' })
      // p.setStyle({flex: 1})
  const body = typeof o.body==='string' ? Label.create(o.body) : o.body
  body.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' })
  p.addChildView(body)
  const w = Window.create({frame: true, showTrafficLights: true})
  w.setContentView(p)
  w.setTitle(o.title||'Modal')
  body.onKeyUp = (self, event)=>{
    console.log(event.key, event);
    // event.key==='ESC'
  }
  p.onKeyUp = (self, event)=>{
    console.log(event.key, event);
    // event.key==='ESC'
  }
  w.getContentView().onKeyDown = (s,e)=>{
     console.log(e.key, e);
  }
    //  const w = gui.Window.create({frame: true, showTrafficLights: true})
      w.setAlwaysOnTop(true)
      w.setContentSize({width: 400, height: 200})
      w.setTitle(o.title||'Modal')
      // this.props.win.addChildWindow(w)
      const b = Button.create('Close')
      p.addChildView(b)
      b.onClick=()=>{ w.close()}
      // p.addChildView(l)
      // w.setContentView(p)
      w.setVisible(true)
      w.center()
      w.activate() 


}