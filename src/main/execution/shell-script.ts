import * as Process from "child_process";

import * as Types from "../../shared/types";

export const run = (data: Types.Execution.ShellScript): Promise<any> =>
  new Promise((resolve, reject) => {
    Process.exec(data.script, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
