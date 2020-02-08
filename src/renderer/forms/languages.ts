import { Execution } from "../../shared/types";

export type Language = typeof all[0];

export const all = [
  {
    type: Execution.Type.AppleScript,
    name: "AppleScript",
    prism: "applescript",
    sample: `display dialog "Hello World"`
  },
  {
    type: Execution.Type.ShellScript,
    name: "Shell Script",
    prism: "bash",
    sample: `touch ~/Desktop/thing.txt`
  },
  {
    type: Execution.Type.JXA,
    name: "JXA",
    prism: "js",
    sample: `HelperV1()
.activate("Finale")
.clickMenuItems([
  "Tools",
  "Smart Shape",
  "Decrescendo"
]);`
  }
];
