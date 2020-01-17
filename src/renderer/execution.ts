export enum Type {
  AppleScript,
  BashScript
}

interface Base {
  type: Type;
  // run: () => any;
  // integrityHash: string
  // id: string
}

export interface AppleScript extends Base {
  type: Type.AppleScript;
  script: string;
}

export interface BashScript extends Base {
  type: Type.BashScript;
  script: string;
}

export type Data = AppleScript | BashScript;

export const isAppleScript = (data: Data): data is AppleScript =>
  data.type === Type.AppleScript;

export const isBashScript = (data: Data): data is BashScript =>
  data.type === Type.BashScript;
