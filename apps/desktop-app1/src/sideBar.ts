import * as gui from 'gui'
import { StateComponent } from "./abstractComponent"
import { Options } from './options'
import { darkTheme, lightTheme } from './styles';

export class SideBar extends StateComponent {
  protected view: gui.Container = null as any;
  protected open: gui.Button = null as any;
  protected save: gui.Button = null as any;
  protected test: gui.Button = null as any;
  protected options: Options = null as any;
//  protected darkTheme: gui.Button= null as any;

  render() {
    this.view = gui.Container.create()
    this.view.setStyle({
      width: '30%',minWidth: 190, height: '100%', flexDirection: 'column', alignContent: "baseline"
    })
//     this.darkTheme = gui.Button.create({type: 'checkbox', title: 'Dark Theme'})
//     this.view.addChildView(this.darkTheme )
// this.darkTheme.setStyle({flex: 1 , flexShrink: 1 ,flexDirection: 'row'  })
// this.darkTheme.onClick = e=>this.setState({theme:  this.darkTheme.isChecked() ? darkTheme : lightTheme})
    this.options = new Options({ win: this.props.win })
    this.view.addChildView(this.options.render())
    // this.view.setBackgroundColor('#ededed')
    this.view.setStyle({
      width: this.view.getPreferredSize().width
    })
    return this.view
  }
}
