import * as KeyboardKeys from "./keyboard-keys";
import * as Execution from "./execution";

export enum Type {
  Tab,
  Action
}

interface Base {
  id: string;
  type: Type;
  name: string;
  keyboardKey: KeyboardKeys.Key;
}

export interface Action extends Base {
  type: Type.Action;
  executionData: Execution.Data;
  tabID: string;
}

export interface Tab extends Base {
  type: Type.Tab;
  id: string;
}

export type Button = Action | Tab;

export const isAction = (button: Button): button is Action =>
  button.type === Type.Action;

export const isTab = (button: Button): button is Tab =>
  button.type === Type.Tab;
