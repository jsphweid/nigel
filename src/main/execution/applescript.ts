import runApplescript from "run-applescript";

import * as Types from "../../shared/types";

export const run = (data: Types.Execution.AppleScript): Promise<string> =>
  runApplescript(data.script);
