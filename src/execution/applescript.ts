// import runApplescript from "run-applescript";

import * as Execution from ".";

export interface AppleScript extends Execution.Base {
  type: Execution.Type.AppleScript;
  script: string;
}

export const isAppleScript = (data: Execution.Data): data is AppleScript =>
  data.type === Execution.Type.AppleScript;

export const run = (data: AppleScript): Promise<any> => {
  return;
}; //runApplescript(data.script);
