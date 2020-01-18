import { ipcMain } from "electron";

import * as Types from "../../shared/types";
import * as AppleScript from "./applescript";
import * as ShellScript from "./shell-script";

ipcMain.on("execute", async (event, data: Types.Execution.Data) => {
  const result = await execute(data);
  event.sender.send("execution-result", null, result);
});

const execute = (data: Types.Execution.Data): Promise<any> => {
  switch (data.type) {
    case Types.Execution.Type.AppleScript:
      return AppleScript.run(data);
    case Types.Execution.Type.ShellScript:
      return ShellScript.run(data);
    default:
      return Promise.resolve(null);
  }
};
