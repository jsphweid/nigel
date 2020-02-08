import * as React from "react";
import { createGlobalStyle } from "styled-components";
import { Either, Fn } from "@grapheng/prelude";

import Electron from "./renderer-electron";
import Board from "./board";
import { Button, KeyboardKeys } from "../shared/types";
import * as RendererExecutor from "./renderer-executor";
import { UpdateButtonsOnBoard, BoardGetter } from "../shared/services";
import * as Logic from "./logic";
import AddEditModal from "./forms/add-edit-modal";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

// fire off initial get button data
Electron.ipcRenderer.send("getButtons");

const App = () => {
  const [boardID] = React.useState<string>("board1");
  const [buttons, setButtons] = React.useState<Button.Button[]>([]);
  const [buttonBeingEdited, setButtonBeingEdited] = React.useState<
    Button.NewButtonInitialData | Button.Button | null
  >(null);

  React.useEffect(() => {
    BoardGetter.call(boardID);
    BoardGetter.onResponse(
      Either.fold(console.error, board => setButtons(board.buttons))
    );

    // TODO: display some sort of toast on error
    UpdateButtonsOnBoard.onResponse(Either.fold(console.error, Fn.constVoid));
  }, []);

  const updateButtons = (newButtons: Button.Button[]) => {
    // optimistically update buttons UI
    setButtons(newButtons);

    // persist changes
    UpdateButtonsOnBoard.call({
      boardID,
      newButtons
    });
  };

  return (
    <div>
      <GlobalStyles />
      <AddEditModal
        data={buttonBeingEdited}
        onSave={newButton => {
          updateButtons(Logic.upsertButton(buttons, newButton));
          setButtonBeingEdited(null);
        }}
        onCancel={() => setButtonBeingEdited(null)}
      />

      <Board
        active={!buttonBeingEdited}
        buttons={buttons}
        handleButtonMoved={(button, destinationKey, destinationTabID) =>
          updateButtons(
            Logic.moveButton(buttons, {
              button,
              destinationKey,
              destinationTabID
            })
          )
        }
        handleActionButtonClicked={button =>
          RendererExecutor.execute(button.executionData)
        }
        handleEditButtonClicked={setButtonBeingEdited}
        handleOnDoubleClick={(keyboardKey, tabID) =>
          setButtonBeingEdited({ keyboardKey, tabID })
        }
        handleDeleteButtonClicked={button =>
          updateButtons(Logic.deleteButton(buttons, button.id))
        }
      />
    </div>
  );
};

export default App;
