import { Button } from "../shared/types";
import { KeyboardKeys } from "../shared/types";
import { ButtonEditableFields } from "./forms/edit-button-form";

export const moveButton = (
  buttons: Button.Button[],
  button: Button.Button,
  destinationKey: KeyboardKeys.Key,
  destinationTabID: string
): Button.Button[] => {
  const buttonsClone = buttons.slice();
  const sourceIndex = buttonsClone.findIndex(b => b.id === button.id);
  const destinationActionIndex = buttonsClone.findIndex(
    b =>
      Button.isAction(b) &&
      b.keyboardKey === destinationKey &&
      b.tabID === destinationTabID
  );
  const destinationTabIndex = buttonsClone.findIndex(b => {
    return Button.isTab(b) && b.keyboardKey === destinationKey;
  });
  const destinationIndex = Math.max(
    destinationActionIndex,
    destinationTabIndex
  );
  if (sourceIndex > -1) {
    if (destinationIndex > -1) {
      const destinationButton = buttonsClone[destinationIndex];
      destinationButton.keyboardKey = button.keyboardKey;
      if (Button.isAction(destinationButton) && Button.isAction(button)) {
        destinationButton.tabID = button.tabID;
      }
    }
    const sourceButton = buttonsClone[sourceIndex];
    sourceButton.keyboardKey = destinationKey;
    if (Button.isAction(sourceButton)) {
      sourceButton.tabID = destinationTabID;
    }
  }

  return buttonsClone;
};

export const modifyButtonBasics = (
  buttons: Button.Button[],
  button: Button.Button,
  updates: ButtonEditableFields
): Button.Button[] => {
  const buttonsClone = buttons.slice();
  const buttonIndexBeingEdited = buttonsClone.findIndex(
    b => b.id === button.id
  );
  if (buttonIndexBeingEdited < -1) {
    console.error(
      "Could not update button basics because it apparently does not exist."
    );
  }

  buttonsClone[buttonIndexBeingEdited] = {
    ...buttons[buttonIndexBeingEdited],
    ...updates
  };

  return buttonsClone;
};
