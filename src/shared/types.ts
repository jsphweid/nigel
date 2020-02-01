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

  export interface NewButtonFields extends EditableFields {
    key: KeyboardKeys.Key;
    tabID: string;
    code: string;
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

  export const isAction = (button: Button): button is Action =>
    button.type === Type.Action;

  export const isTab = (button: Button): button is Tab =>
    button.type === Type.Tab;
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
    JXA = "JXA"
  }

  export interface Base {
    type: Type;
  }

  // Bash Script
  export interface ShellScript extends Base {
    type: Type.ShellScript;
    script: string;
  }

  export const isShellScript = (data: Data): data is ShellScript =>
    data.type === Type.ShellScript;

  // AppleScript
  export interface AppleScript extends Base {
    type: Type.AppleScript;
    script: string;
  }

  export const isAppleScript = (data: Data): data is AppleScript =>
    data.type === Type.AppleScript;

  // JXA
  export interface JXA extends Base {
    type: Type.JXA;
    script: string;
  }

  export const isJXA = (data: Data): data is JXA => data.type === Type.JXA;

  export type Data = AppleScript | ShellScript | JXA;
}
