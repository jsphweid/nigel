import * as Execution from ".";

export interface BashScript extends Execution.Base {
  type: Execution.Type.BashScript;
  script: string;
}

export const isBashScript = (data: Execution.Data): data is BashScript =>
  data.type === Execution.Type.BashScript;
