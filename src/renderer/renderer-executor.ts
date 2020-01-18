import Electron from "./renderer-electron";
import * as Types from "../shared/types";

export const execute = (data: Types.Execution.Data) =>
  Electron.ipcRenderer.send("execute", data);

// Electron.ipcRenderer.on("execution-result", (event, err, data) => {
//   // implement if needed...
// });
