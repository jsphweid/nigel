import Store from "electron-store";
import { pipe, Option, TaskEither, Error } from "@grapheng/prelude";

import { Board } from "../shared/types";
import {
  BoardSaver,
  BoardGetter,
  UpdateButtonsOnBoard
} from "../shared/services";

const store = new Store();

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
