import ActiveWin from "active-win";
import { BrowserWindow, globalShortcut } from "electron";
import runAppleScript from "run-applescript";

import { thisOS, OS } from "./os";

let latestWindow: ActiveWindow | null = null;

interface ActiveWindow {
  windowTitle: string;
  applicationName: string;
  processID: number;
}

export const getActiveWindow = (): Promise<ActiveWindow | null> =>
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

export const setupToggle = (win: BrowserWindow) => {
  const { toggleAway } = getFunctions();
  globalShortcut.register("`", async () => {
    console.log("latestWindow", latestWindow);
    if (win.isFocused() && latestWindow) {
      toggleAway(latestWindow);
    } else {
      latestWindow = await getActiveWindow();

      win.focus();
    }
  });
};

interface Thing {
  toggleAway(activeWindow: ActiveWindow): void;
}

const getFunctions = (): Thing => {
  switch (thisOS) {
    case OS.MAC:
      return {
        toggleAway: activeWindow =>
          runAppleScript(`
                tell application \"System Events\"
                set frontmost of the first process whose unix id is ${activeWindow.processID} to true
                end tell
              `)
      };
    default:
      return {
        toggleAway: () => console.error("Can't support this OS yet.")
      };
  }
};
