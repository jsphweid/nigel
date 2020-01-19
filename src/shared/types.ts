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
