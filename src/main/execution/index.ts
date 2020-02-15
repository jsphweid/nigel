import { ipcMain } from "electron";

import * as Types from "../../shared/types";
import * as AppleScript from "./applescript";
import * as ShellScript from "./shell-script";
import * as JXA from "./jxa";
import * as KeyboardMaestro from "./keyboard-maestro";

ipcMain.on("execute", async (event: any, data: Types.Execution.Data) => {
  const result = await execute(data);
  event.sender.send("execution-result", null, result);
});

export const execute = (data: Types.Execution.Data): Promise<any> => {
  switch (data.type) {
    case Types.Execution.Type.AppleScript:
      return AppleScript.run(data);
    case Types.Execution.Type.ShellScript:
      return ShellScript.run(data);
    case Types.Execution.Type.JXA:
      return JXA.run(data);
    case Types.Execution.Type.KeyboardMaestro:
      return KeyboardMaestro.run(data);
    default:
      console.error(
        `Unable to execute script because ${data} doesn't have a handler.`
      );
      return Promise.resolve(null);
  }
};
