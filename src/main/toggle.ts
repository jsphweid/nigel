import ActiveWin from "active-win";
import { BrowserWindow, globalShortcut } from "electron";

import * as Execution from "./execution";
import * as Types from "../shared/types";
import { thisOS, OS } from "./os";

interface ActiveWindow {
  windowTitle: string;
  applicationName: string;
  processID: number;
}

let lastActiveWindow: ActiveWindow | null = null;
let nigelWindow: BrowserWindow | null = null;

const getActiveWindow = (): Promise<ActiveWindow | null> =>
  // TODO: Figure out a way to make this go faster...
  // idea: stick an application and only unstick when the uses says so
  ActiveWin().then(result =>
    result
      ? {
          windowTitle: result.title,
          applicationName: result.owner.name,
          processID: result.owner.processId
        }
      : null
  );

export const setup = (win: BrowserWindow) => {
  nigelWindow = win;

  globalShortcut.register("F13", async () => {
    if (win.isFocused()) {
      awayFromNigel();
    } else {
      lastActiveWindow = await getActiveWindow();
      toNigel();
    }
  });
};

export const toNigel = () =>
  nigelWindow
    ? nigelWindow.focus()
    : console.error(
        "Can't focus Nigel because it hasn't been initialized yet."
      );

export const awayFromNigel = (): Promise<any> => {
  if (lastActiveWindow) {
    switch (thisOS) {
      case OS.MAC:
        return Execution.execute({
          type: Types.Execution.Type.AppleScript,
          script: `
            tell application \"System Events\"
            set frontmost of the first process whose unix id is ${lastActiveWindow.processID} to true
            end tell
          `
        });
      default:
        return Promise.reject(
          "Can't toggle away because this OS doesn't support that."
        );
    }
  }

  return Promise.reject(
    "Can't toggle away from Nigel because there was no last active window."
  );
};
