import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Board from "./board";

const Container = styled.div``;

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

const App = () => (
  <div>
    <GlobalStyles />
    <Board />
  </div>
);

export default App;
