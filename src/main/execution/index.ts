import { ipcMain, dialog } from "electron";
import { Either, pipe, Fn } from "@grapheng/prelude";

import * as Types from "../../shared/types";
import * as AppleScript from "./applescript";
import * as ShellScript from "./shell-script";
import * as JXA from "./jxa";
import * as KeyboardMaestro from "./keyboard-maestro";

ipcMain.on("execute", async (event: any, data: Types.Execution.Data) => {
  const result = await execute(data);
  event.sender.send("execution-result", null, result);
});

const displayError = (error: any) =>
  pipe(
    Either.tryCatchError(() => JSON.stringify(error, null, 2)),
    Either.fold(() => error, Fn.identity),
    detail =>
      dialog.showMessageBox({
        type: "error",
        buttons: ["OK"],
        message: "Error executing script.",
        detail: detail
      })
  );

export const execute = (data: Types.Execution.Data): Promise<any> =>
  (() => {
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
        return Promise.reject(
          `Unable to execute script because ${data} doesn't have a handler.`
        );
    }
  })().catch(displayError);
