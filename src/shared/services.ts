import { Either, TaskEither } from "@grapheng/prelude";

import RendererElectron from "../renderer/renderer-electron";
import { Button, Board } from "./types";

const MainElectron = typeof window === "undefined" ? require("electron") : null;

const generator = <A, B>(name: string) => ({
  call: (data: A): void => RendererElectron.ipcRenderer.send(name, data),
  onResponse: (fn: (result: Either.ErrorOr<B>) => void) =>
    RendererElectron.ipcRenderer.on(
      `${name}-complete`,
      (_: any, error: any, data: B) =>
        fn(error ? Either.left(error) : Either.right(data))
    ),
  createHandler: (fn: (data: A) => TaskEither.TaskEither<Error, B>) =>
    MainElectron &&
    MainElectron.ipcMain.on(name, (event: any, data: A) =>
      fn(data)().then(
        Either.fold(
          error => event.sender.send(`${name}-complete`, error, null),
          result => event.sender.send(`${name}-complete`, null, result)
        )
      )
    )
});

export const BoardSaver = generator<Board.Board, Board.Board>("board-saver");

export const UpdateButtonsOnBoard = generator<
  {
    boardID: string;
    newButtons: Button.Button[];
  },
  Button.Button[]
>("board-button-saver");

export const BoardGetter = generator<string, Board.Board>("board-getter");
