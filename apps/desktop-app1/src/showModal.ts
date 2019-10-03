import { View, Label, Window, Container, Button } from 'gui';
import { State } from './state';
export function showModal(o: ShowModalOptions) {
  const p = Container.create();
  p.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' });
  if (o.state) {
    p.setBackgroundColor(o.state.theme.bg);
    p.setColor(o.state.theme.fg);
  }
  const body = typeof o.body === 'string' ? Label.create(o.body) : o.body;
  body.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' });
  p.addChildView(body);
  const w = Window.create({ frame: true, showTrafficLights: true });
  w.setContentView(p);
  w.setTitle(o.title || 'Modal');
  w.setAlwaysOnTop(true);
  w.setContentSize({ width: 400, height: 200 });
  w.setTitle(o.title || 'Modal');
  const b = Button.create('Close');
  p.addChildView(b);
  b.onClick = () => { w.close(); };
  w.setVisible(true);
  w.center();
  w.activate();
  o.closeIn && setTimeout(() => w.close(), o.closeIn);
}
interface ShowModalOptions {
  body: View | string;
  title: string;
  closeIn?: number;
  state: State;
}
