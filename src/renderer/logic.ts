import { Button } from "../shared/types";
import * as Utilities from "../shared/utilities";

export const deleteButton = (
  buttons: Button.Button[],
  id: string
): Button.Button[] =>
  Utilities.deepCopy(buttons).filter(button => button.id !== id);

export const newButton = (
  buttons: Button.Button[],
  newButton: Button.Button
): Button.Button[] => [...buttons, newButton];

export const updateButton = (
  buttons: Button.Button[],
  update: Button.EditableFieldsUpdate
): Button.Button[] => {
  const buttonsCopy = Utilities.deepCopy(buttons);
  const indexOfButton = buttonsCopy.findIndex(
    button => button.id === update.id
  );
  buttonsCopy[indexOfButton] = { ...buttonsCopy[indexOfButton], ...update };
  return buttonsCopy;
};

export const moveButton = (
  buttons: Button.Button[],
  update: Button.MoveUpdate
) => {
  const buttonsCopy = Utilities.deepCopy(buttons);
  const { button, destinationKey, destinationTabID } = update;

  const sourceIndex = buttonsCopy.findIndex(b => b.id === button.id);
  const destinationActionIndex = buttonsCopy.findIndex(
    b =>
      Button.isAction(b) &&
      b.keyboardKey === destinationKey &&
      b.tabID === destinationTabID
  );
  const destinationTabIndex = buttonsCopy.findIndex(b => {
    return Button.isTab(b) && b.keyboardKey === destinationKey;
  });
  const destinationIndex = Math.max(
    destinationActionIndex,
    destinationTabIndex
  );
  if (sourceIndex > -1) {
    if (destinationIndex > -1) {
      const destinationButton = buttonsCopy[destinationIndex];
      destinationButton.keyboardKey = button.keyboardKey;
      if (Button.isAction(destinationButton) && Button.isAction(button)) {
        destinationButton.tabID = button.tabID;
      }
    }
    const sourceButton = buttonsCopy[sourceIndex];
    sourceButton.keyboardKey = destinationKey;
    if (Button.isAction(sourceButton)) {
      sourceButton.tabID = destinationTabID;
    }
  }
  return buttonsCopy;
};
