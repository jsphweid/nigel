import { Button } from "../shared/types";
import * as Logic from "./logic";

describe("logic", () => {
  const withID = (id: string) => (button: Button.Button) => button.id === id;
  let buttons: Button.Button[] = [];

  beforeEach(() => {
    buttons = [
      {
        id: "tab1",
        keyboardKey: "1",
        name: "Tab 123",
        type: "TAB"
      },
      {
        id: "tab2",
        keyboardKey: "2",
        name: "Tab lolzzz",
        type: "TAB"
      },
      {
        id: "412da46d-78b3-4235-9546-dd9237883340",
        keyboardKey: "r",
        name: "Hello World",
        tabID: "tab2",
        type: "ACTION"
      },
      {
        id: "9feb0ced-019a-49d3-b200-aa7312d15a6b",
        keyboardKey: "w",
        name: "make text file on desktop",
        tabID: "tab1",
        type: "ACTION"
      },
      {
        id: "9feb0zzz200-aa7312d15a6b",
        keyboardKey: "e",
        name: "ma desktop",
        tabID: "tab1",
        type: "ACTION"
      }
    ] as Button.Button[];
  });

  describe("moveButton", () => {
    test("move button works for a tab button", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[1],
        destinationKey: "3",
        destinationTabID: "does not matter"
      });

      const expected = buttons;
      expected[1].keyboardKey = "3";

      expect(result).toEqual(expected);
    });

    test("move button works for an action button", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[3],
        destinationKey: "z",
        destinationTabID: "tab1"
      });

      const expected = buttons;
      expected[3].keyboardKey = "z";

      expect(result).toEqual(expected);
    });

    test("move button works for an action button across tabs", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[2],
        destinationKey: "z",
        destinationTabID: "tab1"
      });

      const expected = buttons;
      expected[2].keyboardKey = "z";
      (expected[2] as Button.Action).tabID = "tab1";

      expect(result).toEqual(expected);
    });

    test("two action buttons can switch", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[3],
        destinationKey: "e",
        destinationTabID: "tab1"
      });

      const expected = buttons;
      expected[3].keyboardKey = "e";
      expected[4].keyboardKey = "w";

      expect(result).toEqual(expected);
    });

    test("two tab buttons can switch", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[1],
        destinationKey: "1",
        destinationTabID: "wat"
      });

      const expected = buttons;
      expected[0].keyboardKey = "2";
      expected[1].keyboardKey = "1";

      expect(result).toEqual(expected);
    });

    test("two action buttons can switch across", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[2],
        destinationKey: "w",
        destinationTabID: "tab1"
      });

      const expected = buttons;
      expected[2].keyboardKey = "w";
      (expected[2] as Button.Action).tabID = "tab1";
      expected[3].keyboardKey = "r";
      (expected[3] as Button.Action).tabID = "tab2";

      expect(result).toEqual(expected);
    });

    test("an action button can be switched with a tab button", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[2],
        destinationKey: "2",
        destinationTabID: "tab2"
      });

      const expected = buttons;
      expected[1].keyboardKey = "r";
      expected[2].keyboardKey = "2";

      expect(result).toEqual(expected);
    });

    test("a tab button can be switched with an action button", () => {
      const result = Logic.moveButton(buttons, {
        button: buttons[1],
        destinationKey: "r",
        destinationTabID: "tab2"
      });

      const expected = buttons;
      expected[1].keyboardKey = "r";
      expected[2].keyboardKey = "2";

      expect(result).toEqual(expected);
    });
  });

  describe("updateButton", () => {
    test("updates a tab", () => {
      const id = "tab1";
      expect(
        Logic.updateButton(buttons, {
          id: id,
          name: "jojo",
          icon: "eee"
        }).find(withID(id))
      ).toEqual({
        icon: "eee",
        id: id,
        keyboardKey: "1",
        name: "jojo",
        type: "TAB"
      });
    });

    test("updates a button", () => {
      const id = "412da46d-78b3-4235-9546-dd9237883340";
      expect(
        Logic.updateButton(buttons, {
          id: id,
          name: "jojo",
          icon: "eee"
        }).find(withID(id))
      ).toEqual({
        icon: "eee",
        id: id,
        keyboardKey: "r",
        name: "jojo",
        tabID: "tab2",
        type: "ACTION"
      });
    });
  });

  describe("deleteButton", () => {
    test("deletes a tab button", () => {
      const id = "tab1";
      const newButtons = Logic.deleteButton(buttons, id);
      expect(newButtons.find(withID(id))).toEqual(undefined);
    });

    test("deletes an action button", () => {
      const id = "412da46d-78b3-4235-9546-dd9237883340";
      const newButtons = Logic.deleteButton(buttons, id);
      expect(newButtons.find(withID(id))).toEqual(undefined);
    });
  });

  describe("newButton", () => {
    test("adds a new tab button", () => {
      const id = "newTab";
      const newButtons = Logic.newButton(buttons, {
        ...buttons[0],
        id
      });
      expect(newButtons.find(withID(id))).toEqual({
        id,
        keyboardKey: "1",
        name: "Tab 123",
        type: "TAB"
      });
    });

    test("adds a new action button", () => {
      const id = "newAction";
      const newButtons = Logic.newButton(buttons, {
        ...buttons[2],
        id
      });
      expect(newButtons.find(withID(id))).toEqual({
        id,
        keyboardKey: "r",
        name: "Hello World",
        tabID: "tab2",
        type: "ACTION"
      });
    });
  });
});
