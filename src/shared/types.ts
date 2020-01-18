export namespace Execution {
  export enum Type {
    AppleScript,
    ShellScript
  }

  export interface Base {
    type: Type;
    // run: () => any;
    // integrityHash: string
    // id: string
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

  export type Data = AppleScript | ShellScript;
}
