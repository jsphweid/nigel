import * as React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import * as Button from "./button";
import * as Icons from "./icons";
import { Coordinate } from "./types";

const ClickableIconRow = styled.div`
  width: calc(100% - 16px);
  height: 16%;
  margin: 8px 8px 0 8px;
  display: inline-block;
  border-radius: 24px;
  background: rgb(249, 249, 255);
`;

const Container = styled.div`
  background: rgb(184, 143, 112);
  height: 100%;
  width: 100%;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const BigButton = styled.button`
  width: calc(100% - 16px);
  flex: 1;
  height: 100%;
  margin: 8px;
  text-align: center;
  font-size: 4vh;
  background: rgb(106, 106, 238);
  border-radius: 8px;
  outline: none;
  cursor: pointer;
`;

interface DraggableProps {
  style?: any;
  className?: string;
  onTouchEnd?: any;
  onTouchStart?: any;
  onMouseUp?: any;
  onMouseDown?: any;
  onClick?: any;
  selected?: boolean;
}

interface DraggableButtonProps extends DraggableProps {
  button: Button.Button;
  display: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  onMouseEnter: () => void;
  onDragStop: (coordinate: Coordinate) => void;
}

const defaultDisplayProps = {
  height: 300,
  width: 300,
  x: 0,
  y: 0
};

// TODO: maybe we never need default?
const DraggableButton: React.SFC<DraggableButtonProps> = props => {
  const { height, width, x, y } = props.display || defaultDisplayProps;
  const { button } = props;

  return (
    <Draggable
      key={`button-${x}${y}`}
      bounds="parent"
      handle=".handle"
      position={{ x: 0, y: 0 }}
      onStop={(e: any) => props.onDragStop({ x: e.pageX, y: e.pageY })}
    >
      <Container
        onMouseEnter={props.onMouseEnter}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          left: `${x}px`,
          top: `${y}px`,
          background: `${button.type === Button.Type.Tab ? "black" : ""}`
        }}
      >
        <ClickableIconRow>
          <Icons.Edit onClick={() => console.log("edit clicked")} />
          <Icons.Hamburger className="handle" />
          <Icons.Close onClick={() => console.log("click")} />
        </ClickableIconRow>
        <BigButton onClick={() => console.log("big button clicked")}>
          {button.name}
        </BigButton>
      </Container>
    </Draggable>
  );
};

export default DraggableButton;
