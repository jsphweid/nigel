import * as React from "react";
const resizeAware = require("react-resize-aware");
const ResizeAware = resizeAware.default || resizeAware;

import * as Button from "./button";

import * as KeyboardKeys from "./keyboard-keys";
import TileBackdrop from "./components/tile-backdrop";
import DraggableButton from "./draggable-button";
import { Coordinate } from "./types";

interface Props {
  buttons: Button.Button[];
  handleButtonMoved: (
    button: Button.Button,
    destinationKey: KeyboardKeys.Key,
    destinationTabID: string
  ) => void;
  handleActionButtonClicked: (button: Button.Action) => void;
}

interface State {
  boardHeight: number;
  boardWidth: number;
  itemHeight: number;
  itemWidth: number;
  activeTabID: string;
  buttonThatsBeingDragged: Button.Button | null;
  buttonThatsBeingHovered: Button.Button | null;
}

class Board extends React.Component<Props, State> {
  private els: { board: any } = { board: null };

  constructor(props: Props) {
    super(props);
    this.state = {
      buttonThatsBeingDragged: null,
      buttonThatsBeingHovered: null,
      boardHeight: 0,
      boardWidth: 0,
      itemHeight: 0,
      itemWidth: 0,
      activeTabID: props.buttons.find(b => Button.isTab(b))?.id || ""
    };
  }

  public componentDidUpdate() {
    const { buttonThatsBeingHovered, buttonThatsBeingDragged } = this.state;
    if (buttonThatsBeingHovered) {
      if (buttonThatsBeingDragged) {
        return;
      }
      const { id } = buttonThatsBeingHovered;
      const possiblyNewButtonVersion = this.props.buttons.find(
        b => b.id === id
      );
      if (
        JSON.stringify(possiblyNewButtonVersion) !==
        JSON.stringify(buttonThatsBeingHovered)
      ) {
        this.setState({
          buttonThatsBeingHovered: possiblyNewButtonVersion || null
        });
      }
    }
  }

  private handleResize = (size: { width: number; height: number }) => {
    if (!size.width) return;

    this.setState({
      boardWidth: size.width,
      boardHeight: size.height,
      itemWidth: size.width / KeyboardKeys.numWide,
      itemHeight: size.height / KeyboardKeys.numHigh
    });
  };

  private handleButtonDragStop = (coordinate: Coordinate) => {
    const { buttonThatsBeingHovered } = this.state;
    const { boardHeight, boardWidth } = this.state;
    const keyboardKeyDestination = KeyboardKeys.determineKeyboardKeyDestination(
      boardWidth,
      boardHeight,
      coordinate
    );

    if (buttonThatsBeingHovered && keyboardKeyDestination) {
      this.props.handleButtonMoved(
        buttonThatsBeingHovered,
        keyboardKeyDestination,
        this.state.activeTabID
      );
    }
    this.setState({ buttonThatsBeingDragged: null });
  };

  // This should really only be ran when the props change
  private getStaticButtonsDisplaying = () =>
    this.props.buttons.filter(
      button =>
        button.type === Button.Type.Tab ||
        button.tabID === this.state.activeTabID
      // (!this.state.buttonThatsBeingHovered ||
      //   button.id !== this.state.buttonThatsBeingHovered.id)
    );

  private renderButton = (button: Button.Button) => {
    const { itemHeight, itemWidth } = this.state;
    const coords = KeyboardKeys.Coordinates.getCoordsFromKey(
      button.keyboardKey
    );
    const x = coords.x * itemWidth;
    const y = coords.y * itemHeight;
    return (
      <DraggableButton
        key={button.id}
        button={button}
        display={{ x, y, height: itemHeight, width: itemWidth }}
        active={button.id === this.state.activeTabID}
        onDragStop={this.handleButtonDragStop}
        onMouseEnter={() => this.setState({ buttonThatsBeingHovered: button })}
        onClick={() => {
          if (Button.isTab(button)) {
            this.setState({ activeTabID: button.id });
          } else {
            this.props.handleActionButtonClicked(button);
          }
        }}
      />
    );
  };

  // private renderPossibleHoveredButton = () =>
  //   pipe(
  //     this.state.buttonThatsBeingHovered,
  //     Option.fromNullable,
  //     Option.fold(Fn.constNull, this.renderButton)
  //   );

  public render() {
    const buttonsToDisplay = this.getStaticButtonsDisplaying();

    return (
      <ResizeAware
        ref={(el: any) => (this.els.board = el)}
        onlyEvent={true}
        onResize={this.handleResize}
        id="sb-board"
        style={{
          position: "relative",
          width: "100vw",
          height: `100vh`
        }}
      >
        <TileBackdrop
          keyWidth={this.state.itemWidth}
          keyHeight={this.state.itemHeight}
        />
        {buttonsToDisplay.map(this.renderButton)}
      </ResizeAware>
    );
  }
}

export default Board;
