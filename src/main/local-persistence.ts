import Store from "electron-store";
import { pipe, Option, TaskEither, Error } from "@grapheng/prelude";

import { Board } from "../shared/types";
import {
  BoardSaver,
  BoardGetter,
  UpdateButtonsOnBoard
} from "../shared/services";

const store = new Store({
  defaults: {
    board1: {
      defaultTab: null,
      id: "board1",
      buttons: [
        {
          executionData: {
            content: 'display dialog "Hello World"',
            type: "APPLESCRIPT"
          },
          icon: null,
          id: "a326b9a3-b61f-49f8-81ab-bf9e1e1100bf",
          keyboardKey: "q",
          name: "Example AppleScript Action",
          tabID: "tab1",
          type: "ACTION"
        },
        {
          icon: null,
          id: "53de5067-44f0-4d45-9bd3-811b1980cc13",
          keyboardKey: "1",
          name: "Example Tab 1",
          tabID: "tab1",
          type: "TAB"
        },
        {
          icon: null,
          id: "1df211e5-eba3-4699-949e-463b928d5e96",
          keyboardKey: "2",
          name: "Example Tab 2",
          tabID: "tab1",
          type: "TAB"
        },
        {
          executionData: {
            content:
              'HelperV1()\n.activate("Chrome")\n.clickMenuItems([\n  "Chrome",\n  "About Google Chrome"\n]);',
            type: "JXA"
          },
          icon: null,
          id: "cf36a694-870f-401e-98c9-ce764324cd4c",
          keyboardKey: "e",
          name: "Example JXA Action",
          tabID: "1df211e5-eba3-4699-949e-463b928d5e96",
          type: "ACTION"
        },
        {
          executionData: {
            content: 'display dialog "Hello World"',
            type: "APPLESCRIPT"
          },
          icon: null,
          id: "b6b679bb-f4cb-4cee-9b19-1ad8a6092117",
          keyboardKey: "q",
          name: "Example AppleScript Action",
          tabID: "53de5067-44f0-4d45-9bd3-811b1980cc13",
          type: "ACTION"
        },
        {
          executionData: {
            content:
              "<array>\n  <dict>\n    <key>Action</key>\n    <string>DisplayBriefly</string>\n    <key>MacroActionType</key>\n    <string>InsertText</string>\n    <key>Text</key>\n    <string>Hello WRLD</string>\n  </dict>\n</array>",
            type: "KEYBOARDMAESTRO"
          },
          icon: null,
          id: "98f653f6-1419-4a6e-b3cb-f80ead84b0bf",
          keyboardKey: "d",
          name: "Example KeyboardMaestro XML",
          tabID: "1df211e5-eba3-4699-949e-463b928d5e96",
          type: "ACTION"
        }
      ]
    }
  }
});

export const getStorageFilePath = () => store.path;

export const saveBoard = (
  board: Board.Board
): TaskEither.TaskEither<Error, Board.Board> =>
  pipe(
    TaskEither.tryCatchError(() => {
      store.set(board.id, board);
      return Promise.resolve(board);
    })
  );

export const getBoard = (
  id: string
): TaskEither.TaskEither<Error, Board.Board> =>
  pipe(
    Option.fromNullable(store.get(id)),
    TaskEither.fromOption(Error.fromL("Board does not exist."))
  );

// TODO: consider returning the previous state on failure?

export const setup = () => {
  BoardSaver.createHandler(saveBoard);
  BoardGetter.createHandler(getBoard);
  UpdateButtonsOnBoard.createHandler(({ boardID, newButtons }) =>
    pipe(
      getBoard(boardID),
      TaskEither.chain(board => saveBoard({ ...board, buttons: newButtons })),
      TaskEither.map(board => board.buttons)
    )
  );
};
