import runApplescript from "run-applescript";
import * as FS from "fs";
import * as Path from "path";

import * as Types from "../../../shared/types";

const AppleScriptHelpers = FS.readFileSync(
  Path.resolve(__dirname, "..", "execution/applescript", "AppleScriptHelpers")
).toString();

export const run = (data: Types.Execution.AppleScript): Promise<string> =>
  runApplescript(`
${AppleScriptHelpers}
${data.content}
`);
