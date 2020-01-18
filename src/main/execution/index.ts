import { ipcMain } from "electron";

import * as Types from "../../shared/types";
import * as Toggle from "../toggle";
import * as AppleScript from "./applescript";
import * as ShellScript from "./shell-script";

ipcMain.on("execute", async (event: any, data: Types.Execution.Data) => {
  const result = await toggleAndExecute(data);
  event.sender.send("execution-result", null, result);
});

export const executeOnly = (data: Types.Execution.Data): Promise<any> => {
  switch (data.type) {
    case Types.Execution.Type.AppleScript:
      return AppleScript.run(data);
    case Types.Execution.Type.ShellScript:
      return ShellScript.run(data);
    default:
      return Promise.resolve(null);
  }
};

export const toggleAndExecute = async (
  data: Types.Execution.Data
): Promise<any> => {
  await Toggle.awayFromNigel();
  return executeOnly(data);
};
