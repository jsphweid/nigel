import { Menu, MenuItem, MenuItemConstructorOptions } from "electron";

import * as Toggle from "./toggle";

const menuTemplate: Array<MenuItemConstructorOptions | MenuItem> = [
  {
    label: "App",
    submenu: [
      {
        label: "Forget Last Remembered Window",
        click: () => Toggle.resetLastActiveWindow()
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate);

export default menu;
