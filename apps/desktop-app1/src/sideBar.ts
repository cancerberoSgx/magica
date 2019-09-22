import * as gui from 'gui'
import { StateComponent } from "./abstractComponent"
import { Options } from './options'
import { darkTheme, lightTheme } from './styles';

export class SideBar extends StateComponent {
  protected view: gui.Container = null as any;
  protected options: Options = null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({
      width: '30%',minWidth: 140, maxWidth: '30%', height: '100%', 
      flexDirection: 'column', alignContent: "baseline", flex: 1, flexGrow: 1,
    })  
    this.options = new Options({ win: this.props.win })
    this.view.addChildView(this.options.render())
    return this.view
  }
}
