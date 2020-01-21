import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Electron from "./renderer-electron";

import Board from "./board";
import { Button } from "../shared/types";
import { ButtonUpdater, ButtonMover, ButtonsGetter } from "../shared/services";
import * as RendererExecutor from "./renderer-executor";
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

  const defaultNewButtonsHandler = (error: Error, buttons: Button.Button[]) =>
    void console.log("new buttons", buttons) || error
      ? null
      : setButtons(buttons);

  React.useEffect(() => {
    ButtonsGetter.call();

    ButtonsGetter.onResponse(defaultNewButtonsHandler);
    ButtonUpdater.onResponse(defaultNewButtonsHandler);
    ButtonMover.onResponse(defaultNewButtonsHandler);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <EditButtonForm
        data={buttonBeingEdited}
        onSave={data => {
          if (buttonBeingEdited) {
            ButtonUpdater.call({ ...data, id: buttonBeingEdited.id });
            setButtonBeingEdited(null);
          }
        }}
        onCancel={() => setButtonBeingEdited(null)}
      />

      <Board
        buttons={buttons}
        handleButtonMoved={(button, destinationKey, destinationTabID) =>
          ButtonMover.call({ button, destinationKey, destinationTabID })
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
