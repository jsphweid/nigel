export type Key =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "q"
  | "w"
  | "e"
  | "r"
  | "t"
  | "a"
  | "s"
  | "d"
  | "f"
  | "g"
  | "z"
  | "x"
  | "c"
  | "v"
  | "b";

export const arrangement: Key[][] = [
  ["1", "2", "3", "4", "5"],
  ["q", "w", "e", "r", "t"],
  ["a", "s", "d", "f", "g"],
  ["z", "x", "c", "v", "b"]
];

export const numHigh = arrangement.length;
export const numWide = arrangement[0].length;
