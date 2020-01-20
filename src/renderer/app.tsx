import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Electron from "./renderer-electron";

import Board from "./board";
import { Button } from "../shared/types";
import * as RendererExecutor from "./renderer-executor";
import * as BoardState from "./board-state";
import EditButtonForm from "./forms/edit-button-form";

const Container = styled.div``;

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

// fire off initial get button data
Electron.ipcRenderer.send("getButtons");

const App = () => {
  const [buttons, setButtons] = React.useState<Button.Button[]>([]);
  const [
    buttonBeingEdited,
    setButtonBeingEdited
  ] = React.useState<Button.Button | null>(null);

  const updateButtons = (updatedButtons: Button.Button[]): void => {
    Electron.ipcRenderer.send("saveButtons", updatedButtons);
    setButtons(updatedButtons);
    setButtonBeingEdited(null);
  };

  Electron.ipcRenderer.on(
    "getButtons-result",
    (_: any, __: any, data: Button.Button[]) => {
      console.log("got button data", data);
      setButtons(data);
    }
  );

  return (
    <div>
      <GlobalStyles />
      <EditButtonForm
        data={buttonBeingEdited}
        onSave={data => {
          if (buttonBeingEdited) {
            updateButtons(
              BoardState.modifyButtonBasics(buttons, buttonBeingEdited, data)
            );
          }
        }}
        onCancel={() => setButtonBeingEdited(null)}
      />

      <Board
        buttons={buttons}
        handleButtonMoved={(button, destinationKey, destinationTabID) =>
          updateButtons(
            BoardState.moveButton(
              buttons,
              button,
              destinationKey,
              destinationTabID
            )
          )
        }
        handleActionButtonClicked={button =>
          RendererExecutor.execute(button.executionData)
        }
        handleEditButtonClicked={setButtonBeingEdited}
        handleDeleteButtonClicked={() => console.log("delete clicked")}
      />
    </div>
  );
};

export default App;
