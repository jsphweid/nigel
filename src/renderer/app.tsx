import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Either, Fn } from "@grapheng/prelude";

import Electron from "./renderer-electron";
import Board from "./board";
import { Button, KeyboardKeys } from "../shared/types";
import * as RendererExecutor from "./renderer-executor";
import { UpdateButtonsOnBoard, BoardGetter } from "../shared/services";
import * as Logic from "./logic";
import EditButtonForm from "./forms/edit-button-form";
import AddButtonForm from "./forms/add-button-form";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

// fire off initial get button data
Electron.ipcRenderer.send("getButtons");

const App = () => {
  const [boardID] = React.useState<string>("board1");
  const [buttons, setButtons] = React.useState<Button.Button[]>([]);
  const [
    buttonBeingEdited,
    setButtonBeingEdited
  ] = React.useState<Button.Button | null>(null);

  const [
    addButtonInitialData,
    setAddButtonInitialData
  ] = React.useState<Button.NewButtonInitialData | null>(null);

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
      <EditButtonForm
        data={buttonBeingEdited}
        onSave={data => {
          if (buttonBeingEdited) {
            updateButtons(
              Logic.updateButton(buttons, {
                ...data,
                id: buttonBeingEdited.id
              })
            );
            setButtonBeingEdited(null);
          }
        }}
        onCancel={() => setButtonBeingEdited(null)}
      />

      <AddButtonForm
        data={addButtonInitialData}
        onSave={data => {
          updateButtons(Logic.newButton(buttons, data));
          setAddButtonInitialData(null);
        }}
        onCancel={() => setAddButtonInitialData(null)}
      />

      <Board
        active={!buttonBeingEdited && !addButtonInitialData}
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
          setAddButtonInitialData({ keyboardKey, tabID })
        }
        handleDeleteButtonClicked={button =>
          updateButtons(Logic.deleteButton(buttons, button.id))
        }
      />
    </div>
  );
};

export default App;
