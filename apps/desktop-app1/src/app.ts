import * as gui from 'gui'
import { StateComponent } from './abstractComponent'
import { Canvas } from './canvas'
import { Menu } from './menu'
import { SideBar } from './sideBar'
import { State } from './state'
import { StatusBar } from './statusBar'

type RP = 'image'|'theme'

export class App1 extends StateComponent<{}> {
  protected win: gui.Window = null as any
  protected content: gui.Container = null as any
  protected canvas: Canvas = null as any
  protected menuPanel: gui.Container = null as any
  protected bodyPanel: gui.Container = null as any
  protected sideBar: gui.Container = null as any
  relevantProperties: RP[] = ['image', 'theme']
  protected menu: gui.Container = null as any

  render() {
    this.createWindow()
    this.menu = new StatusBar({ win: this.win}).render()
    this.menuPanel.addChildView(this.menu)
    this.sideBar = new SideBar({ win: this.win }).render()
    this.bodyPanel.addChildView(this.sideBar)
    this.canvas = new Canvas({ win: this.win })
    this.bodyPanel.addChildView(this.canvas.render())
    const menubar = new Menu(this.win)
    if (process.platform !== 'darwin') {
      this.win.setMenuBar(menubar.menu)
    }
    else {
      gui.app.setApplicationMenu(menubar.menu)
    }
    return this.content
  }

  start() {
    this.win.center()
    this.win.activate()
    if (!process.versions.yode) {
      gui.MessageLoop.run()
      // process.exit(0)
       this.win.close()
    }
  }

  protected createWindow() {
    this.content = gui.Container.create()
       this.content.setMouseDownCanMoveWindow(false)
    this.content.setBackgroundColor(this.state.theme.bg)
    this.content.setColor(this.state.theme.fg)
    this.content.setStyle({ flexGrow: 1, flex: 1, flexDirection: 'column' })
    this.menuPanel = gui.Container.create()
    this.menuPanel.setStyle({ width: '100%', flex: 0, height: 40, flexDirection: 'row' })
    this.bodyPanel = gui.Container.create()
    this.bodyPanel.setStyle({ width: '100%', flex: 1, height: '100%', flexGrow: 1, flexDirection: 'row' })
    // this.bodyPanel.setBackgroundColor('#ffffff')
    this.content.addChildView(this.menuPanel)
    this.content.addChildView(this.bodyPanel)
    this.win = gui.Window.create({frame: true, transparent: false, showTrafficLights: true})
    // process.platform !== 'darwin' && this.win.setTitleVisible(true)
    this.win.setTitle('Magica')
    // this.win.setBackgroundColor('#ffffff')
    this.win.setContentView(this.content)
    this.win.onClose = function() { gui.MessageLoop.quit(); process.exit(0) }
    this.win.setContentSize({ width: 600, height: 600 })
    // this.win.maximize()
  }

  stateChanged(names: RP[], s: Partial<State>) {
    if (names.includes('image') && s['image']) {
      this.win.setTitle(s['image'])
    }
    if(names.includes('theme')){    
      this.content.setBackgroundColor(this.state.theme.bg)
      this.content.setColor(this.state.theme.fg)
    }
  }
}
