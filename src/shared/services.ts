const MainElectron = typeof window === "undefined" ? require("electron") : null;

import RendererElectron from "../renderer/renderer-electron";
import { Button, KeyboardKeys } from "./types";

const generator = <A, B>(name: string) => ({
  call: (data: A): Promise<B> =>
    RendererElectron.ipcRenderer.invoke(name, data),
  handle: (fn: (data: A) => Promise<B>) =>
    MainElectron &&
    MainElectron.ipcMain.handle(name, (_: any, data: A) => fn(data))
});

export const ButtonUpdater = generator<
  Button.EditableFields & { id: string },
  Button.Button[]
>("button-updater");

export const ButtonMover = generator<
  {
    button: Button.Button;
    destinationKey: KeyboardKeys.Key;
    destinationTabID: string;
  },
  Button.Button[]
>("button-mover");

export const ButtonsGetter = generator<void, Button.Button[]>("button-getter");
