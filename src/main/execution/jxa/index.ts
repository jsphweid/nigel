import runJxa from "run-jxa";
import * as FS from "fs";
import * as Path from "path";

import * as Types from "../../../shared/types";

const HelpersV1 = FS.readFileSync(
  Path.resolve(__dirname, "..", "execution/jxa", "HelpersV1.js")
).toString();

export const run = (data: Types.Execution.JXA): Promise<string> =>
  runJxa(`
    ${HelpersV1}
    ${data.script}
  `);
