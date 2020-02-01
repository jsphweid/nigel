import * as React from "react";
import styled from "styled-components";

import * as KeyboardKeys from "../keyboard-keys";
import { KeyboardKeys as Keys } from "../../shared/types";

interface TileBackdropProps {
  keyHeight: number;
  keyWidth: number;
  onDoubleClick: (key: Keys.Key) => void;
}

const Container = styled.div`
  float: left;
  position: relative;
`;

const Num = styled.div`
  text-align: center;
  font-size: 12vw;
  line-height: 19vh;
  opacity: 0.1;
  border: 0.5px solid black;
  height: 100%;
  width: 100%;
`;

const TileBackdrop: React.SFC<TileBackdropProps> = ({
  keyHeight,
  keyWidth,
  onDoubleClick
}) => (
  <div>
    {KeyboardKeys.arrangement
      .map(row =>
        row.map(key => (
          <Container
            key={`tile-${key}`}
            style={{
              height: keyHeight,
              width: keyWidth
            }}
            onDoubleClick={() => onDoubleClick(key)}
          >
            <Num>{key}</Num>
          </Container>
        ))
      )
      .flat()}
  </div>
);

export default TileBackdrop;
