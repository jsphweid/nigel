import { KeyboardKeys } from "../shared/types";

import { Coordinate } from "./types";

export const arrangement: KeyboardKeys.Key[][] = [
  ["1", "2", "3", "4", "5"],
  ["q", "w", "e", "r", "t"],
  ["a", "s", "d", "f", "g"],
  ["z", "x", "c", "v", "b"]
];

export const all = arrangement.flat();

export const numHigh = arrangement.length;
export const numWide = arrangement[0].length;

type KeyToCoordMap<T extends string> = { [key in T]: Coordinate };

class GridLookup<T extends string> {
  private originalGrid: T[][];
  private keyToCoordMap: KeyToCoordMap<T>;

  constructor(grid: T[][]) {
    this.originalGrid = grid;

    const ret = {} as KeyToCoordMap<T>;
    grid.forEach((row, y) =>
      row.forEach((item, x) => {
        ret[item] = { x, y };
      })
    );
    this.keyToCoordMap = ret;
  }

  public getCoordsFromKey = (key: T): Coordinate => this.keyToCoordMap[key];

  public getKeyFromCoords = ({ x, y }: Coordinate): T =>
    this.originalGrid[y][x];
}

export const Coordinates = new GridLookup(arrangement);

export function determineKeyboardKeyDestination(
  boardWidth: number,
  boardHeight: number,
  xy: Coordinate
) {
  const y = Math.floor((xy.y / boardHeight) * numHigh);
  const x = Math.floor((xy.x / boardWidth) * numWide);
  const position =
    x >= numWide || y >= numHigh || x < 0 || y < 0 ? null : { x, y };
  return position ? Coordinates.getKeyFromCoords(position) : null;
}

export type KeyListenerCallbackMap = { [key in KeyboardKeys.Key]: () => void };

export class Hotkeys {
  private keyCallbackMap: KeyListenerCallbackMap;
  private keyState = new Map<KeyboardKeys.Key, boolean>();

  public constructor(keyCallbackMap: KeyListenerCallbackMap) {
    this.keyCallbackMap = keyCallbackMap;
    this.activate();
  }

  private passesKeyUpValidation = (e: any): boolean =>
    this.keyState.get(e.key) !== undefined;

  private passesKeyDownValidation = (e: any): boolean =>
    // TODO: in the future, have a different system for
    // dealing with keys like Command / Control / Option / etc.
    this.keyState.get(e.key) !== undefined &&
    e.target &&
    e.target.tagName !== "INPUT" &&
    e.target.tagName !== "TEXTAREA" &&
    !e.metaKey;

  private keyDownHandler = (e: any) => {
    if (this.passesKeyDownValidation(e)) {
      e.preventDefault();
      const untriggered = !this.keyState.get(e.key);
      if (untriggered) {
        this.keyState.set(e.key, true);
        this.keyCallbackMap[e.key as KeyboardKeys.Key]();
      }
    }
  };

  private keyUpHandler = (e: any) => {
    if (this.passesKeyUpValidation(e)) {
      this.keyState.set(e.key as KeyboardKeys.Key, false);
    }
  };

  public activate = () => {
    const keysToListenFor = Object.keys(
      this.keyCallbackMap
    ) as KeyboardKeys.Key[];
    keysToListenFor.forEach(key => this.keyState.set(key, false));

    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  };

  public deactivate = () => {
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("keyup", this.keyUpHandler);
  };
}
