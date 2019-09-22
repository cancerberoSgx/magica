import * as gui from 'gui'

export class Menu {
  menu: gui.MenuBar

  constructor() {
    const menus: gui.MenuItemOptions[] = []
    menus.push({
      label: 'File',
      submenu: [
        // {
        //   label: 'Reload',
        //   accelerator: 'CmdOrCtrl+Shift+R',
        //   onClick() {
        //   },
        // },
        // { type: 'separator' },
        // {
        //   label: 'Disconnect',
        //   onClick() {
        //   }
        // },
        {
          label: 'Collect Garbage',
          accelerator: 'CmdOrCtrl+Shift+G',
          onClick() {
            try {              
  if (global.gc) {global.gc();}
            } catch (error) {
              console.error(error);
            }
            // process.resourceUsage().
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
