import { format } from "url";
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
const { resolve } = require("app-root-path");

import * as Toggle from "./toggle";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  await Toggle.setup(mainWindow);

  const devPath = "http://localhost:1124";
  const prodPath = format({
    pathname: resolve("src/renderer/.parcel/production/index.html"),
    protocol: "file:",
    slashes: true
  });
  const url = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on("window-all-closed", app.quit);
