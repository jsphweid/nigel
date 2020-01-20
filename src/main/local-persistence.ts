import Store from "electron-store";
import { ipcMain } from "electron";

import { Button } from "../shared/types";

const store = new Store();
const buttonsStorageKey = "buttons";

export const saveNewButtons = (buttons: Button.Button[]) =>
  store.set(buttonsStorageKey, buttons);

export const getPersistedButtons = (): Button.Button[] =>
  store.get(buttonsStorageKey);

export const setup = () => {
  ipcMain.on("saveButtons", async (event: any, data: Button.Button[]) => {
    event.sender.send("saveButtons-result", null, saveNewButtons(data));
  });

  ipcMain.on("getButtons", async (event: any, _: any) => {
    event.sender.send("getButtons-result", null, getPersistedButtons() || []);
  });
};
