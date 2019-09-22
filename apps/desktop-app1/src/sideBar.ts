import * as gui from 'gui'
import { StateComponent } from "./abstractComponent"
import { Options } from './options'

export class SideBar extends StateComponent {
  protected view: gui.Container = null as any;
  protected open: gui.Button = null as any;
  protected save: gui.Button = null as any;
  protected test: gui.Button = null as any;
  protected options: Options = null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({
      width: 160, height: '100%', flexDirection: 'column', alignContent: "baseline"
    })
    this.options = new Options({ win: this.props.win })
    this.view.addChildView(this.options.render())
    this.view.setBackgroundColor('#ededed')
    this.view.setStyle({
      width: this.view.getPreferredSize().width
    })
    return this.view
  }
}
