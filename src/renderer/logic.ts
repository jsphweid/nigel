import { Button } from "../shared/types";
import * as Utilities from "../shared/utilities";

export const deleteButton = (
  buttons: Button.Button[],
  id: string
): Button.Button[] =>
  Utilities.deepCopy(buttons).filter(button => button.id !== id);

export const upsertButton = (
  buttons: Button.Button[],
  newButton: { id: string } & Partial<Button.Button>
): Button.Button[] => {
  const buttonsCopy = Utilities.deepCopy(buttons);
  const existingIndex = buttonsCopy.findIndex(b => b.id === newButton.id);

  if (existingIndex > -1) {
    buttonsCopy[existingIndex] = {
      ...(buttonsCopy[existingIndex] as Button.Button),
      ...(newButton as any)
    };
    return buttonsCopy;
  }

  return [...buttonsCopy, newButton as Button.Button];
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
