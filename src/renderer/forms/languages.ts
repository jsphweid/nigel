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
    type: Execution.Type.KeyboardMaestro,
    name: "KeyboardMaestro XML",
    prism: "xml",
    sample: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
  <dict>
    <key>Activate</key>
    <string>Normal</string>
    <key>CreationDate</key>
    <real>601169692.50686896</real>
    <key>Macros</key>
    <array>
      <dict>
        <key>Actions</key>
        <array>
          <dict>
            <key>Action</key>
            <string>DisplayBriefly</string>
            <key>MacroActionType</key>
            <string>InsertText</string>
            <key>Text</key>
            <string>Hello WRLD</string>
          </dict>
        </array>
        <key>CreationDate</key>
        <real>602877923.05752003</real>
        <key>ModificationDate</key>
        <real>602877959.09492302</real>
        <key>Name</key>
        <string>Hello World</string>
        <key>Triggers</key>
        <array/>
        <key>UID</key>
        <string>E1C6AD35-4511-4F89-8E28-899982CCDF97</string>
      </dict>
    </array>
    <key>Name</key>
    <string>Global Macro Group</string>
    <key>ToggleMacroUID</key>
    <string>722FD11F-6F2B-4952-A41A-71A4C9FC1110</string>
    <key>UID</key>
    <string>7016FE8C-CC1C-4700-A1BC-3CB278132A7E</string>
  </dict>
</array>
</plist>`
  },
  {
    type: Execution.Type.JXA,
    name: "JXA",
    prism: "js",
    sample: `HelperV1()
.activate("Chrome")
.clickMenuItems([
  "Chrome",
  "About Google Chrome"
]);`
  }
];
