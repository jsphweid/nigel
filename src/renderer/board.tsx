import * as React from "react";
const resizeAware = require("react-resize-aware");
const ResizeAware = resizeAware.default || resizeAware;
import { Option, Fn, pipe } from "@grapheng/prelude";
import memoizeOne from "memoize-one";

import { Button } from "../shared/types";
import { KeyboardKeys as KeyboardKeysTypes } from "../shared/types";
import * as KeyboardKeys from "./keyboard-keys";
import * as Utilities from "../shared/utilities";
import TileBackdrop from "./components/tile-backdrop";
import DraggableButton from "./draggable-button";
import { Coordinate } from "./types";

interface Props {
  buttons: Button.Button[];
  handleButtonMoved: (
    button: Button.Button,
    destinationKey: KeyboardKeysTypes.Key,
    destinationTabID: string
  ) => void;
  handleActionButtonClicked: (button: Button.Action) => void;
  handleEditButtonClicked: (button: Button.Button) => void;
  handleDeleteButtonClicked: (button: Button.Button) => void;
}

interface ButtonsView {
  all: Button.Button[];
  byKeyboardKey: Map<KeyboardKeysTypes.Key, Button.Button>;
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

    const activeTabID = "tab1"; // props.buttons.find(b => Button.isTab(b))?.id || "";

    this.state = {
      buttonThatsBeingDragged: null,
      buttonThatsBeingHovered: null,
      boardHeight: 0,
      boardWidth: 0,
      itemHeight: 0,
      itemWidth: 0,
      activeTabID
    };

    KeyboardKeys.initKeyListeners(
      KeyboardKeys.all.reduce(
        (previous, key) => ({
          ...previous,
          [key]: () =>
            pipe(
              Option.fromNullable(
                this.makeComputedButtonsView(
                  props.buttons,
                  activeTabID
                ).byKeyboardKey.get(key)
              ),
              Option.fold(Fn.constVoid, button =>
                this.handleButtonActivated(button)
              )
            )
        }),
        {} as KeyboardKeys.KeyListenerCallbackMap
      )
    );
  }

  public componentDidUpdate(previousProps: Props, previousState: State) {
    const { buttonThatsBeingHovered, buttonThatsBeingDragged } = this.state;
    if (buttonThatsBeingHovered) {
      if (buttonThatsBeingDragged) {
        return;
      }
      const possiblyNewButtonVersion = this.props.buttons.find(
        b => b.id === buttonThatsBeingHovered.id
      );
      if (
        !Utilities.isEqual(possiblyNewButtonVersion, buttonThatsBeingHovered)
      ) {
        this.setState({
          buttonThatsBeingHovered: possiblyNewButtonVersion || null
        });
      }
    }
  }

  private makeComputedButtonsView = memoizeOne(
    (buttons: Button.Button[], activeTabID: string): ButtonsView =>
      pipe(
        buttons,
        buttons =>
          buttons.filter(
            button =>
              button.type === Button.Type.Tab || button.tabID === activeTabID
          ),
        filteredButtons => ({
          all: filteredButtons,
          byKeyboardKey: new Map(
            filteredButtons.map(button => [button.keyboardKey, button])
          )
        })
      ),
    // TODO: someday fix this... but, for whatever reason,
    // the previous and next are the same, even when there is somehow a change...
    (_newArgs, _lastArgs) => false
  );

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

  private handleButtonActivated = (button: Button.Button) => {
    if (Button.isTab(button)) {
      this.setState({ activeTabID: button.id });
    } else {
      this.props.handleActionButtonClicked(button);
    }
  };

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
        onClick={() => this.handleButtonActivated(button)}
        onEditButtonClick={() => this.props.handleEditButtonClicked(button)}
        onDeleteButtonClick={() => this.props.handleDeleteButtonClicked(button)}
      />
    );
  };

  public render() {
    const buttonsToDisplay = this.makeComputedButtonsView(
      this.props.buttons,
      this.state.activeTabID
    ).all;

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
