import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  color: blue;
  height: 100px;
`;

ReactDOM.render(
  <div>
    Hi
    <Button>lol</Button>
  </div>,
  document.getElementById("root")
);
