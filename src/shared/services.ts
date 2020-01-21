const MainElectron = typeof window === "undefined" ? require("electron") : null;

import RendererElectron from "../renderer/renderer-electron";
import { Button, KeyboardKeys } from "./types";

const generator = <A, B>(name: string) => ({
  call: (data: A): void => RendererElectron.ipcRenderer.send(name, data),
  onResponse: (fn: (error: Error, result: B) => void) =>
    RendererElectron.ipcRenderer.on(
      `${name}-complete`,
      (_: any, error: any, data: B) => fn(error, data)
    ),
  createHandler: (fn: (data: A) => Promise<B>) =>
    MainElectron &&
    MainElectron.ipcMain.on(name, (event: any, data: A) =>
      fn(data)
        .then(result => event.sender.send(`${name}-complete`, null, result))
        .catch(error => event.sender.send(`${name}-complete`, error, null))
    )
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
