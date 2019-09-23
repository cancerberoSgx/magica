import * as gui from 'gui'
import { ImageHandler } from './imageHandler'
import { setState, getState } from './store'
import { App1 } from './app'
import { darkTheme, lightTheme } from './styles'
import { State } from './state'

export class Menu {
  menu: gui.MenuBar
  handler: ImageHandler
  state: State

  constructor(win: gui.Window) {
    const menus: gui.MenuItemOptions[] = []
    this.handler = new ImageHandler(win)
    this.state = getState()
    menus.push({
      // label: 'File',
      submenu: [
        {
          label: 'Collect Garbage',
          accelerator: 'CmdOrCtrl+Shift+G',
          onClick() {
            try {
              if (global.gc) { global.gc(); }
            } catch (error) {
              console.error(error);
            }
          },
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          onClick() {
            gui.MessageLoop.quit()
            process.exit(0)
          },
        },
      ],
    })

    // macOS specific app menus.
    if (process.platform === 'darwin') {
      menus[0].submenu!.splice(menus[0].submenu!.length - 2, 0,
        { type: 'separator' }, { role: 'hide' }, { role: 'hide-others' }, { type: 'separator' })
    }
    
menus.push({
      label: 'File',
      submenu: [
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          onClick: () =>  this.handler.handleOpen(),
        },
                {
          label: 'Capture camera...',
          onClick: () =>  this.handler.captureCamera(),
        },
        { type: 'separator' },
        {
          label: 'Save as...',
          accelerator: 'CmdOrCtrl+S',
            onClick: () =>  this.handler.handleSave(),
        },
      ],
    })

    // Edit menu.
    menus.push({
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'select-all' },
      ],
    })

    menus.push({
      label: 'Window',
      role: 'window',
      submenu: [
           {
          label: 'Dark Theme',
          type: 'checkbox',
          checked: this.state.theme===darkTheme,
          onClick(self) { 
            setState({ theme: self.isChecked() ? darkTheme : lightTheme})
          }
        },
        { type: 'separator' },
        {
          label: 'New Window',
          accelerator: 'CmdOrCtrl+Shift+N',
          onClick() { 
            const app = new App1({})
            app.render()
            app.start()
          }
        },
        
        {
          label: 'Close Window',
          accelerator: 'CmdOrCtrl+W',
          onClick: () => {
            gui.MessageLoop.quit()
            process.exit(0)
          }
        },
      ],
    })

    this.menu = gui.MenuBar.create(menus)
  }
 
}
