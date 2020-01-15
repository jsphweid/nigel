import * as React from "react";
const resizeAware = require("react-resize-aware");
const ResizeAware = resizeAware.default || resizeAware;

import * as KeyboardKeys from "./keyboard-keys";
import TileBackdrop from "./components/tile-backdrop";

interface Props {}

interface State {
  boardHeight: number;
  boardWidth: number;
  itemHeight: number;
  itemWidth: number;
}

class Board extends React.Component<Props, State> {
  private els: { board: any } = { board: null };

  constructor(props: Props) {
    super(props);
    this.state = {
      boardHeight: 0,
      boardWidth: 0,
      itemHeight: 0,
      itemWidth: 0
    };
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

  public render() {
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
      </ResizeAware>
    );
  }
}

export default Board;
