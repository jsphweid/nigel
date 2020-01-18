import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Board from "./board";
import * as Button from "./button";
import * as Execution from "../execution";
import * as KeyboardKeys from "./keyboard-keys";
import { generateRandomId } from "./utils";

const Container = styled.div``;

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

const tab1ID = generateRandomId();
const tab2ID = generateRandomId();

let mockButtons: Button.Button[] = [
  {
    id: tab1ID,
    type: Button.Type.Tab,
    name: "Tab 1",
    keyboardKey: "1"
  },
  {
    id: tab2ID,
    type: Button.Type.Tab,
    name: "Tab 2",
    keyboardKey: "3"
  },
  {
    id: generateRandomId(),
    type: Button.Type.Action,
    name: "Some Action 1",
    keyboardKey: "q",
    tabID: tab1ID,
    executionData: { type: Execution.Type.AppleScript, script: "" }
  },
  {
    id: generateRandomId(),
    type: Button.Type.Action,
    name: "Another action...",
    keyboardKey: "w",
    tabID: tab2ID,
    executionData: { type: Execution.Type.BashScript, script: "" }
  }
];

export const moveButton = (
  buttons: Button.Button[],
  button: Button.Button,
  destinationKey: KeyboardKeys.Key,
  destinationTabID: string
) => {
  const buttonsClone = buttons.slice();
  const sourceIndex = buttonsClone.findIndex(b => b.id === button.id);
  const destinationActionIndex = buttonsClone.findIndex(
    b =>
      Button.isAction(b) &&
      b.keyboardKey === destinationKey &&
      b.tabID === destinationTabID
  );
  const destinationTabIndex = buttonsClone.findIndex(b => {
    return Button.isTab(b) && b.keyboardKey === destinationKey;
  });
  const destinationIndex = Math.max(
    destinationActionIndex,
    destinationTabIndex
  );
  if (sourceIndex > -1) {
    if (destinationIndex > -1) {
      const destinationButton = buttonsClone[destinationIndex];
      destinationButton.keyboardKey = button.keyboardKey;
      if (Button.isAction(destinationButton) && Button.isAction(button)) {
        destinationButton.tabID = button.tabID;
      }
    }
    const sourceButton = buttonsClone[sourceIndex];
    sourceButton.keyboardKey = destinationKey;
    if (Button.isAction(sourceButton)) {
      sourceButton.tabID = destinationTabID;
    }
  }

  return buttonsClone;
};

const App = () => {
  const [buttons, setButtons] = React.useState(mockButtons);
  return (
    <div>
      <GlobalStyles />
      <Board
        buttons={buttons}
        handleButtonMoved={(button, destinationKey, destinationTabID) =>
          setButtons(
            moveButton(buttons, button, destinationKey, destinationTabID)
          )
        }
        handleActionButtonClicked={button =>
          Execution.execute(button.executionData)
        }
      />
    </div>
  );
};

export default App;
