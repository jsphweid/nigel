// import { remote } from "electron";

import * as AppleScript from "./applescript";
import * as BashScript from "./bash-script";

export enum Type {
  AppleScript,
  BashScript
}

export interface Base {
  type: Type;
  // run: () => any;
  // integrityHash: string
  // id: string
}

export type Data = AppleScript.AppleScript | BashScript.BashScript;

export const execute = (data: Data): void => {
  // console.log("executing", remote);
  switch (data.type) {
    case Type.AppleScript:
      AppleScript.run(data);
  }
};

export { AppleScript };
