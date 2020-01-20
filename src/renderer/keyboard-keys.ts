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

const keyState = new Map<KeyboardKeys.Key, boolean>();

const passesKeyDownValidation = (e: any): boolean =>
  // TODO: in the future, have a different system for
  // dealing with keys like Command / Control / Option / etc.
  keyState.get(e.key) !== undefined &&
  e.target &&
  e.target.tagName !== "INPUT" &&
  e.target.tagName !== "TEXTAREA" &&
  !e.metaKey;

const passesKeyUpValidation = (e: any): boolean =>
  keyState.get(e.key) !== undefined;

export type KeyListenerCallbackMap = { [key in KeyboardKeys.Key]: () => void };

export function initKeyListeners(keyCallbackMap: KeyListenerCallbackMap) {
  if (typeof window === "undefined") {
    console.log(
      "Not initializing keyboard listeners as that requires the window."
    );
    return;
  }
  const keysToListenFor = Object.keys(keyCallbackMap) as KeyboardKeys.Key[];
  keysToListenFor.forEach(key => keyState.set(key, false));

  document.addEventListener("keydown", (e: any) => {
    // ignore if typing in an <input /> for example
    if (passesKeyDownValidation(e)) {
      e.preventDefault();
      const untriggered = !keyState.get(e.key);
      if (untriggered) {
        keyState.set(e.key, true);
        keyCallbackMap[e.key as KeyboardKeys.Key]();
      }
    }
  });
  document.addEventListener("keyup", e => {
    if (passesKeyUpValidation(e)) {
      keyState.set(e.key as KeyboardKeys.Key, false);
    }
  });
}
