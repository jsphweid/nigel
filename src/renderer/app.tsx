import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Board from "./board";
import * as Button from "./button";
import * as RendererExecutor from "./renderer-executor";
import * as BoardState from "./board-state";
import mockFinaleBoard from "./finale-board.json";

const Container = styled.div``;

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  const [buttons, setButtons] = React.useState(
    mockFinaleBoard as Button.Button[]
  );
  return (
    <div>
      <GlobalStyles />
      <Board
        buttons={buttons}
        handleButtonMoved={(button, destinationKey, destinationTabID) =>
          setButtons(
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
      />
    </div>
  );
};

export default App;
