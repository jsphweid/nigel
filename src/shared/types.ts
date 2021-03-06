export namespace KeyboardKeys {
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
}

export namespace Button {
  export enum Type {
    Tab = "TAB",
    Action = "ACTION"
  }

  export interface EditableFields {
    name: string;
    icon: string | null;
  }

  export interface NewButtonInitialData {
    keyboardKey: KeyboardKeys.Key;
    tabID: string;
  }

  export interface EditableFieldsUpdate extends EditableFields {
    id: string;
  }

  export interface MoveUpdate {
    button: Button;
    destinationKey: KeyboardKeys.Key;
    destinationTabID: string;
  }

  interface Base {
    id: string;
    type: Type;
    name: string;
    icon: string | null;
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

  export const isAction = (button: any): button is Action =>
    button.type === Type.Action;

  export const isTab = (button: any): button is Tab => button.type === Type.Tab;
}

export namespace Board {
  export interface Board {
    defaultTab: string | null;
    buttons: Button.Button[];
    id: string;
  }
}

export namespace Execution {
  export enum Type {
    AppleScript = "APPLESCRIPT",
    ShellScript = "SHELLSCRIPT",
    JXA = "JXA",
    KeyboardMaestro = "KEYBOARDMAESTRO"
  }

  export interface Base {
    type: Type;
  }

  // Bash Script
  export interface ShellScript extends Base {
    type: Type.ShellScript;
    content: string;
  }

  export const isShellScript = (data: Data): data is ShellScript =>
    data.type === Type.ShellScript;

  // AppleScript
  export interface AppleScript extends Base {
    type: Type.AppleScript;
    content: string;
  }

  export const isAppleScript = (data: Data): data is AppleScript =>
    data.type === Type.AppleScript;

  // JXA
  export interface JXA extends Base {
    type: Type.JXA;
    content: string;
  }

  export interface KeyboardMaestro extends Base {
    type: Type.KeyboardMaestro;
    content: string;
  }

  export const isJXA = (data: Data): data is JXA => data.type === Type.JXA;

  export type Data = AppleScript | ShellScript | JXA | KeyboardMaestro;
}
