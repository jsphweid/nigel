import * as Types from "../../shared/types";
import * as AppleScript from "./applescript";

export const run = (data: Types.Execution.KeyboardMaestro): Promise<any> =>
  AppleScript.run({
    type: Types.Execution.Type.AppleScript,
    content: `
tell application "Keyboard Maestro Engine"
  do script "${data.content}"
end tell  
  `
  });
