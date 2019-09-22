import * as gui from 'gui'
import { ImageHandler } from './imageHandler'

export class Menu {
  menu: gui.MenuBar
  handler: ImageHandler

  constructor(win: gui.Window) {
    const menus: gui.MenuItemOptions[] = []
    this.handler = new ImageHandler(win)
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

    // // macOS specific app menus.
    // if (process.platform === 'darwin') {
    //   menus[0].submenu!.splice(menus[0].submenu!.length - 2, 0,
    //     { type: 'separator' }, { role: 'hide' }, { role: 'hide-others' }, { type: 'separator' })
    // }
    
menus.push({
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          onClick: () =>  this.handler.handleOpen(),
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
          label: 'New Window',
          accelerator: 'CmdOrCtrl+Shift+N',
          onClick() { }
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
