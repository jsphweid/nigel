import { Menu, App, dialog } from "electron";

import * as Toggle from "./toggle";
import * as LocalPersistence from "./local-persistence";

export const generate = (app: App) =>
  Menu.buildFromTemplate([
    {
      label: "Application",
      submenu: [
        {
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:"
        },
        {
          label: "Display Local Storage Path",
          click: () =>
            dialog.showMessageBox({
              type: "info",
              buttons: ["OK"],
              message: LocalPersistence.getStorageFilePath()
            })
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => app.quit()
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        },
        {
          label: "Forget Last Remembered Window",
          click: () => Toggle.resetLastActiveWindow()
        }
      ]
    }
  ]);
