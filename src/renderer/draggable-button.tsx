import * as React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
const { Textfit } = require("react-textfit");

import { Button } from "../shared/types";
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
  background: rgb(106, 106, 238);
  border-radius: 8px;
  outline: none;
  cursor: pointer;
`;

const PressedBigButton = styled(BigButton)`
  opacity: 0.2;
  cursor: default;
`;

interface DraggableButtonProps {
  button: Button.Button;
  display: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onDragStop: (coordinate: Coordinate) => void;
  onDragStart: () => void;
  onClick: () => void;
  onEditButtonClick: () => void;
  onDeleteButtonClick: () => void;
  active: boolean;
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
  const {
    button,
    onDragStop,
    onMouseEnter,
    onMouseLeave,
    onClick,
    active,
    onDragStart
  } = props;

  const buttonTextContainer = (
    <Textfit
      style={{
        height: `100%`,
        width: `100%`
      }}
      mode="multi"
      max={60}
    >
      {button.name}
    </Textfit>
  );

  const BigButtonComponent = active ? (
    <PressedBigButton>{buttonTextContainer}</PressedBigButton>
  ) : (
    <BigButton onClick={onClick}>{buttonTextContainer}</BigButton>
  );

  return (
    <Draggable
      key={`button-${x}${y}`}
      bounds="parent"
      handle=".handle"
      position={{ x: 0, y: 0 }}
      onStop={(e: any) => onDragStop({ x: e.pageX, y: e.pageY })}
      onStart={onDragStart}
    >
      <Container
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          left: `${x}px`,
          top: `${y}px`,
          background: `${button.type === Button.Type.Tab ? "black" : ""}`
        }}
      >
        <ClickableIconRow>
          <Icons.Edit onClick={props.onEditButtonClick} />
          <Icons.Hamburger className="handle" />
          <Icons.Close onClick={props.onDeleteButtonClick} />
        </ClickableIconRow>
        {BigButtonComponent}
      </Container>
    </Draggable>
  );
};

export default DraggableButton;
